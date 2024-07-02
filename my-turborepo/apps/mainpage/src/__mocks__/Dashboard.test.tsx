import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RelayEnvironmentProvider } from 'react-relay';
import { act } from 'react-dom/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../components/afterLogin/Dashboard/Dashboard';
import { testEnvironment } from "./test_utils/testEnvironment";
import GetUserProblemsMutation from '../mutations/GetUserProblemsMutation';
import Cookies from 'js-cookie';

// Mock the required modules
vi.mock('js-cookie', () => ({
    default: {
        get: vi.fn()
    }
}));
vi.mock('../mutations/GetUserProblemsMutation');
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
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

beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    (Cookies.get as any).mockReturnValue('mockUserId');
});

test('renders Dashboard, ProblemInfo and EditProblem components correctly and fetches problems', async () => {
    const mockProblems = [
        { title: 'Problem 1', level: 'Easy', description: 'Description 1', frequency: 'High', link: 'link1',
            data_structure: 'Array', date: '2023-01-01', userId: 'user1'
        },
        { title: 'Problem 2', level: 'Medium', description: 'Description 2', frequency: 'Medium', link: 'link2',
            data_structure: 'Tree', date: '2023-01-02', userId: 'user1'
        },
    ];

    vi.mocked(GetUserProblemsMutation).mockImplementation((userId, onSuccess) => {
        onSuccess(mockProblems);
    });

    await act(async () => {
        renderWithRelayAndRouter(<Dashboard />, testEnvironment);
    });

    await waitFor(() => {
        expect(screen.queryByText('Problem 1')).not.toBeNull();
        expect(screen.queryByText('Problem 2')).not.toBeNull();
    });
});

// no need for individual renderization tests for ProblemInfo and EditProblem components since the problems come from
// the dashboard component
test('handles error when fetching problems', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    vi.mocked(GetUserProblemsMutation).mockImplementation((userId, onSuccess, onError) => {
        onError(new Error('Failed to fetch problems'));
    });

    await act(async () => {
        renderWithRelayAndRouter(<Dashboard />, testEnvironment);
    });

    await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
            "Error in fetching users' problems: ",
            expect.any(Error)
        );
    });

    consoleSpy.mockRestore();
});

test('handles missing user ID', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    (Cookies.get as any).mockReturnValue(null);

    await act(async () => {
        renderWithRelayAndRouter(<Dashboard />, testEnvironment);
    });

    await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('User not found!');
    });

    alertSpy.mockRestore();
});