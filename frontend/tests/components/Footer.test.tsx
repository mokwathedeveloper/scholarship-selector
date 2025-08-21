import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/Footer';

describe('Footer', () => {
  it('renders the copyright text with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Scholarship Selector. All rights reserved.`)).toBeInTheDocument();
  });
});
