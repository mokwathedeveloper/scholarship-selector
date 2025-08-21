// frontend/src/pages/rank.js
import ApplicantCard from '../components/ApplicantCard';

export default function Rank() {
  // Dummy data for ranked applicants
  const rankedApplicants = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      gpa: 3.9,
      experience: 4,
      skills: ['React', 'Node.js', 'MongoDB'],
      score: 95,
    },
    {
      id: 2,
      name: 'Bob Williams',
      email: 'bob@example.com',
      gpa: 3.7,
      experience: 3,
      skills: ['Python', 'Machine Learning'],
      score: 90,
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      gpa: 3.5,
      experience: 2,
      skills: ['Java', 'Spring Boot'],
      score: 85,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Ranked Applicants</h1>

        {rankedApplicants.length === 0 ? (
          <p className="text-center text-gray-600">No applicants to display. Please upload data first.</p>
        ) : (
          <div className="space-y-4">
            {rankedApplicants.map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}