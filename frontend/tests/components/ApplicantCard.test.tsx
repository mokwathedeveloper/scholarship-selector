import { render, screen } from '@testing-library/react';
import ApplicantCard from '../../src/components/ApplicantCard';

describe('ApplicantCard', () => {
  const mockApplicant = {
    id: 1,
    name: 'Test Applicant',
    email: 'test@example.com',
    gpa: 3.8,
    experience: 2,
    skills: ['React', 'Node.js'],
    score: 90,
  };

  it('renders applicant details correctly', () => {
    render(<ApplicantCard applicant={mockApplicant} />);

    expect(screen.getByText('Test Applicant')).toBeInTheDocument();
    expect(screen.getByText('Email: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('GPA: 3.8')).toBeInTheDocument();
    expect(screen.getByText('Experience: 2 years')).toBeInTheDocument();
    expect(screen.getByText('Skills: React, Node.js')).toBeInTheDocument();
    expect(screen.getByText('Score: 90')).toBeInTheDocument();
  });

  it('renders the first letter of the name in the avatar', () => {
    render(<ApplicantCard applicant={mockApplicant} />);
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
