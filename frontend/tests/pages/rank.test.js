import { render, screen, waitFor } from '@testing-library/react';
import Rank from '../../src/pages/rank';
import * as api from '../../src/services/api';

// Mock the API service
jest.mock('../../src/services/api');

describe('Rank Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    api.getRankedApplicants.mockClear();
  });

  it('displays loading message initially', () => {
    api.getRankedApplicants.mockReturnValue(new Promise(() => {})); // Keep it pending
    render(<Rank />);
    expect(screen.getByText('Loading ranked applicants...')).toBeInTheDocument();
  });

  it('displays ranked applicants after successful fetch', async () => {
    const mockApplicants = [
      {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        gpa: 3.9,
        experience: 4,
        skills: ['React'],
        score: 95,
      },
      {
        id: 2,
        name: 'Bob Williams',
        email: 'bob@example.com',
        gpa: 3.7,
        experience: 3,
        skills: ['Python'],
        score: 90,
      },
    ];
    api.getRankedApplicants.mockResolvedValue(mockApplicants);

    render(<Rank />);

    await waitFor(() => expect(screen.getByText('Ranked Applicants')).toBeInTheDocument());
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Williams')).toBeInTheDocument();
    expect(api.getRankedApplicants).toHaveBeenCalledTimes(1);
  });

  it('displays error message on fetch failure', async () => {
    api.getRankedApplicants.mockRejectedValue('Failed to connect to API');

    render(<Rank />);

    await waitFor(() => expect(screen.getByText('Error: Failed to connect to API')).toBeInTheDocument());
    expect(api.getRankedApplicants).toHaveBeenCalledTimes(1);
  });

  it('displays "No applicants to display" if no data is returned', async () => {
    api.getRankedApplicants.mockResolvedValue([]);

    render(<Rank />);

    await waitFor(() => expect(screen.getByText('No applicants to display. Please upload data first.')).toBeInTheDocument());
    expect(api.getRankedApplicants).toHaveBeenCalledTimes(1);
  });
});
