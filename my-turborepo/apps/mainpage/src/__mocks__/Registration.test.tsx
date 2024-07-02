import { beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { startMongoMemoryServer, stopMongoMemoryServer, getMongoClient } from './test_utils/mongoMemoryServer';
import RegistrationPage from '../components/auth/Registration/Registration';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { testEnvironment } from "./test_utils/testEnvironment";
import React from 'react';
import { MongoClient } from 'mongodb';

let client: MongoClient;

beforeAll(async () => {
    await startMongoMemoryServer();
});

afterAll(async () => {
    await stopMongoMemoryServer();
});

beforeEach(async () => {
    client = getMongoClient();
    const db = client.db('test');
    await db.collection('users').insertOne({
        username: 'existinguser',
        email: 'existinguser@example.com',
        password: 'password',
    });
    vi.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(async () => {
    const db = client.db('test');
    await db.collection('users').deleteMany({});
    vi.restoreAllMocks();
});

function renderWithRelay(ui: React.ReactElement, env: any) {
    return render(
        <RelayEnvironmentProvider environment={env}>
            {ui}
        </RelayEnvironmentProvider>
    );
}

test('validates all fields are required', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, testEnvironment);

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('All fields are required.');
    });
});

test('validates email format', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, testEnvironment);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Invalid email address.');
    });
});

test('validates password length', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, testEnvironment);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'valid@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '1' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Invalid Password. Password must be at least 6 characters long.');
    });
});

test('allows registration with valid input', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<RegistrationPage setIsLoggedIn={setIsLoggedIn} />, testEnvironment);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'newuser' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'valid@email.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'validpassword' } });

    await act(async () => {
        fireEvent.click(screen.getByText('Register'));
    });

    await waitFor(() => {
        expect(window.alert).not.toHaveBeenCalled();
    });
});
