import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Define types
type ApiResponse = {
  message: string;
};

type SudokuResponse = {
  puzzle: (number | null)[];
  solution: number[];
  difficulty: number;
};

// Mock the fetch API
globalThis.fetch = vi.fn() as unknown as typeof fetch;

function mockFetchResponse(data: ApiResponse | SudokuResponse) {
  return {
    json: vi.fn().mockResolvedValue(data),
    ok: true,
  };
}

function mockSudokuResponse(): SudokuResponse {
  // Create a simple mock sudoku puzzle
  const puzzle = Array(81)
    .fill(null)
    .map((_, i) => (i < 20 ? (i % 9) + 1 : null));
  const solution = Array(81)
    .fill(null)
    .map((_, i) => (i % 9) + 1);
  return {
    puzzle,
    solution,
    difficulty: 1.5,
  };
}

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock implementation that handles both API endpoints
    (globalThis.fetch as unknown as Mock).mockImplementation((url: string) => {
      if (url === '/api/sudoku') {
        return Promise.resolve(mockFetchResponse(mockSudokuResponse()));
      } else if (url === '/api') {
        return Promise.resolve(
          mockFetchResponse({ message: 'Test Message from API' })
        );
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  it('renders App component correctly', () => {
    render(<App />);
    expect(screen.getByText('Mentat Template JS')).toBeInTheDocument();
    expect(screen.getByText(/React, Vite, Vitest/)).toBeInTheDocument();
    expect(screen.getByText(/Node.js, Express, Jest/)).toBeInTheDocument();
    expect(
      screen.getByText(/TypeScript, ESLint, Prettier/)
    ).toBeInTheDocument();
  });

  it('loads and displays API message', async () => {
    render(<App />);

    // Should initially show loading message
    expect(screen.getByText(/Loading message from server/)).toBeInTheDocument();

    // Wait for the fetch to resolve and check if the message is displayed
    await waitFor(() => {
      expect(screen.getByText('Test Message from API')).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith('/api');
  });

  it('handles API error', async () => {
    // Mock a failed API call for the main API endpoint
    (globalThis.fetch as unknown as Mock).mockImplementation((url: string) => {
      if (url === '/api/sudoku') {
        return Promise.resolve(mockFetchResponse(mockSudokuResponse()));
      } else if (url === '/api') {
        return Promise.reject(new Error('API Error'));
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });

    render(<App />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/)).toBeInTheDocument();
    });
  });
});
