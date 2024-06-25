import { beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { startMongoMemoryServer, stopMongoMemoryServer, getMongoClient } from './test_utils/mongoMemoryServer';
import RegistrationPage from '../components/auth/Registration/Registration';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { createMockEnvironment } from './test_utils/mockEnvirionment';
import React from 'react';
import { MongoClient } from 'mongodb';

let client: MongoClient;
let environment: any;

beforeAll(async () => {
    await startMongoMemoryServer();
});

afterAll(async () => {
    await stopMongoMemoryServer();
});

beforeEach(async () => {
    environment = createMockEnvironment();
    client = getMongoClient();
    const db = client.db('test');
    await db.collection('users').insertOne({
        username: 'existinguser',
        email: 'existinguser@example.com',
        password: 'password',
    });
});

afterEach(async () => {
    const db = client.db('test');
    await db.collection('users').deleteMany({});
});

function renderWithRelay(ui: React.ReactElement, env: any) {
    return render(
        <RelayEnvironmentProvider environment={env}>
            {ui}
        </RelayEnvironmentProvider>
    );
}

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
        expect(window.alert).toHaveBeenCalledWith("Error in logging in or in registration");
    });
});

test('handles missing input fields', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, environment);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).not.toHaveBeenCalled();
    });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'newpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).not.toHaveBeenCalled();
    });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '' } });

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).not.toHaveBeenCalled();
    });
});