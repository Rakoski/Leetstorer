import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import LoginPage from '../components/auth/Login/Login';
import { createMockEnvironment } from './test_utils/mockEnvirionment';

// Login doesn't actually need a local mongodb because it is a single mutation and I actually need to know
// if my user is actually being set up
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

test('renders LoginPage component correctly and handles login', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<LoginPage setIsLoggedIn={setIsLoggedIn} />, environment);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'existinguser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    }, { timeout: 5000 });
});

test('handles login error state', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<LoginPage setIsLoggedIn={setIsLoggedIn} />, environment);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong-password' } });

    await act(() => {
        fireEvent.click(screen.getByText('Login'));
        return new Promise(resolve => setImmediate(resolve));
    });

    expect(setIsLoggedIn).not.toHaveBeenCalledWith(true);
});