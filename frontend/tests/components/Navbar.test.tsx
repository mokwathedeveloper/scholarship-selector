import { render, screen } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';

describe('Navbar', () => {
  it('renders a navigation bar with correct links', () => {
    render(<Navbar />);

    // Check if the brand name is rendered
    expect(screen.getByText('Scholarship Selector')).toBeInTheDocument();

    // Check if navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Rank')).toBeInTheDocument();

    // Check if links have correct href attributes
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Upload' })).toHaveAttribute('href', '/upload');
    expect(screen.getByRole('link', { name: 'Rank' })).toHaveAttribute('href', '/rank');
  });
});
