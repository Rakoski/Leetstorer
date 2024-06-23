import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import RegistrationPage from '../components/auth/Registration/Registration';
import { createMockEnvironment } from './test_utils/mockEnvirionment';

beforeEach(() => {
    environment = createMockEnvironment();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
});

function renderWithRelay(ui: React.ReactElement, env: any) {
    return render(
        <RelayEnvironmentProvider environment={env}>
            {ui}
        </RelayEnvironmentProvider>
    );
}

let environment: any;

test('renders RegistrationPage component correctly and handles registration', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, environment);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    }, { timeout: 5000 });
});

test('handles registration error state', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, environment);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'existinguser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'existinguser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    await act(() => {
        fireEvent.click(screen.getByText('Register'));
        return new Promise(resolve => setImmediate(resolve));
    });

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith("Email already in use!");
    });
});

test('handles missing input fields', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, environment);

    // Test with missing username
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).not.toHaveBeenCalled();
    });

    // Reset fields
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });

    // Test with missing email
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).not.toHaveBeenCalled();
    });

    // Reset fields
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });

    // Test with missing password
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).not.toHaveBeenCalled();
    });
});
