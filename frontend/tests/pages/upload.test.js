import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Upload from '../../src/pages/upload';
import * as api from '../../src/services/api';

// Mock the API service
jest.mock('../../src/services/api');

describe('Upload Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    api.uploadApplicants.mockClear();
  });

  it('renders the upload form', () => {
    render(<Upload />);
    expect(screen.getByText('Upload Applicant List')).toBeInTheDocument();
    expect(screen.getByText('Drag & drop your file here, or click to select')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload File' })).toBeInTheDocument();
  });

  it('displays selected file name after file input change', () => {
    render(<Upload />);
    const fileInput = screen.getByLabelText(/drag & drop/i).closest('div').querySelector('input[type="file"]');
    const testFile = new File(['content'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [testFile] } });

    expect(screen.getByText(/Selected file: test.csv/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Upload File' })).not.toBeDisabled();
  });

  it('calls uploadApplicants on form submission with a file', async () => {
    api.uploadApplicants.mockResolvedValue({ message: 'Upload successful!' });

    render(<Upload />);
    const fileInput = screen.getByLabelText(/drag & drop/i).closest('div').querySelector('input[type="file"]');
    const testFile = new File(['content'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(screen.getByRole('button', { name: 'Upload File' }));

    expect(screen.getByRole('button', { name: 'Uploading...' })).toBeInTheDocument();
    await waitFor(() => expect(api.uploadApplicants).toHaveBeenCalledTimes(1));
    expect(api.uploadApplicants).toHaveBeenCalledWith(testFile);
    expect(screen.getByText('Upload successful!')).toBeInTheDocument();
  });

  it('displays error message on upload failure', async () => {
    api.uploadApplicants.mockRejectedValue('Network Error');

    render(<Upload />);
    const fileInput = screen.getByLabelText(/drag & drop/i).closest('div').querySelector('input[type="file"]');
    const testFile = new File(['content'], 'test.csv', { type: 'text/csv' });

    fireEvent.change(fileInput, { target: { files: [testFile] } });
    fireEvent.click(screen.getByRole('button', { name: 'Upload File' }));

    await waitFor(() => expect(api.uploadApplicants).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
  });
});
