import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMockEnvironment, MockPayloadGenerator } from 'relay-test-utils';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import LoginPage from '../components/auth/Login/Login';

// Mock global objects
global.jest = {
    fn: vi.fn,
};

// Helper function to render with Relay
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

    // Render the component
    renderWithRelay(<LoginPage setIsLoggedIn={setIsLoggedIn} />, environment);

    // Fill in form inputs
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // Click login button to trigger the mutation
    fireEvent.click(screen.getByText('Login'));

    // Wait for the operation to be in flight
    await waitFor(() => {
        const operations = environment.mock.getAllOperations();
        console.log('Operations:', operations.map((op: any) => op.fragment.node.name));
        expect(operations.length).toBeGreaterThan(0);
    });

    // Resolve the mutation
    await act(async () => {
        environment.mock.resolveMostRecentOperation((operation: any) =>
            MockPayloadGenerator.generate(operation, {
                LoginMutation: () => ({
                    login: {
                        userId: '1',
                        token: 'fake-token',
                        tokenExpiration: 3600
                    },
                }),
            })
        );
    });

    // Check that setIsLoggedIn was called with true
    await waitFor(() => {
        expect(setIsLoggedIn).toHaveBeenCalledWith(true);
    });
});

test('handles login error state', async () => {
    const setIsLoggedIn = vi.fn();

    // Render the component
    renderWithRelay(<LoginPage setIsLoggedIn={setIsLoggedIn} />, environment);

    // Fill in form inputs
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrong-password' } });

    // Click login button
    fireEvent.click(screen.getByText('Login'));

    // Wait for the operation to be in flight
    await waitFor(() => {
        expect(environment.mock.getAllOperations().length).toBeGreaterThan(0);
    });

    // Reject the mutation
    await act(async () => {
        environment.mock.rejectMostRecentOperation(new Error('Invalid email or password'));
    });

    // Check for error message
    expect(await screen.findByText(/invalid email or password/i)).toBeInTheDocument();
    expect(setIsLoggedIn).not.toHaveBeenCalled();
});