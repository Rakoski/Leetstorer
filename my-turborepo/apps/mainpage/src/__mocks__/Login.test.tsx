import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import LoginPage from '../components/auth/Login/Login';

// Mock Relay Environment
function createMockEnvironment() {
    const source = new RecordSource();
    const store = new Store(source);

    const network = Network.create(async (operation, variables) => {
        console.log(`Operation requested: ${operation.name}`, variables);

        if (operation.name === 'LoginMutation') {
            if (variables.email === 'test@example.com' && variables.password === 'password') {
                return {
                    data: {
                        login: {
                            userId: '1',
                            token: 'fake-token',
                            tokenExpiration: 3600,
                        },
                    },
                };
            } else {
                throw new Error('Invalid email or password');
            }
        }

        throw new Error(`Unhandled operation: ${operation.name}`);
    });

    return new Environment({ network, store });
}

function renderWithRelay(ui: React.ReactElement, env: any) {
    return render(
        <RelayEnvironmentProvider environment={env}>
            {ui}
        </RelayEnvironmentProvider>
    );
}

let environment: any;

beforeEach(() => {
    environment = createMockEnvironment();
});

test('renders LoginPage component correctly and handles login', async () => {
    const setIsLoggedIn = vi.fn();

    renderWithRelay(<LoginPage setIsLoggedIn={setIsLoggedIn} />, environment);
    console.log("setIsLoggedIn", setIsLoggedIn);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'mastrakoski@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456' } });

    await act(() => {
        fireEvent.click(screen.getByText('Login'));
        return new Promise(resolve => setImmediate(resolve));
    });

    await waitFor(() => {
        expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
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