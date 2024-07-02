import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AddProblem from '../components/afterLogin/AddProblem/AddProblem';
import { testEnvironment } from './test_utils/testEnvironment';
import CreateProblemMutation from '../mutations/CreateProblemMutation';
import Cookies from 'js-cookie';

// Mock the required modules
vi.mock('js-cookie', () => ({
    default: {
        get: vi.fn()
    }
}));

vi.mock('../mutations/CreateProblemMutation');
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        // @ts-ignore
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

function renderWithRelayAndRouter(ui: React.ReactElement, env: any) {
    return render(
        <RelayEnvironmentProvider environment={env}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </RelayEnvironmentProvider>
    );
}

vi.mocked(Cookies.get).mockReturnValue({userId: "null"});

beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
});

test('renders AddProblem component correctly and handles form submission', async () => {
    const navigate = vi.fn();
    vi.mocked(CreateProblemMutation).mockImplementation((problemData, onSuccess) => {
        onSuccess({ ...problemData, id: 'mockProblemId' });
    });

    await act(async () => {
        renderWithRelayAndRouter(<AddProblem />, testEnvironment);
    });

    fireEvent.change(screen.getByPlaceholderText(/title/i), { target: { value: 'New Problem' } });
    fireEvent.change(screen.getByPlaceholderText(/description./i), { target: { value: 'Problem Description' } });
    fireEvent.change(screen.getByPlaceholderText(/link/i), { target: { value: 'http://example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/level/i), { target: { value: 'Easy' } });
    fireEvent.change(screen.getByPlaceholderText(/data_structure/i), { target: { value: 'Array' } });
    fireEvent.change(screen.getByPlaceholderText(/frequency/i), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText(/user_description/i), { target: { value: 'Some notes' } });

    await act(async () => {
        fireEvent.click(screen.getByText(/Create/i));
    });
});

test('handles missing user ID', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await act(async () => {
        renderWithRelayAndRouter(<AddProblem />, testEnvironment);
    });

    await act(async () => {
        fireEvent.click(screen.getByText(/Create/i));
    });

    await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('User not found!');
    });

    alertSpy.mockRestore();
});
