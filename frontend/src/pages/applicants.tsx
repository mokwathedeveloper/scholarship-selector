import React, { useState, useEffect } from 'react';
import withAuth from '../components/withAuth';
import { getAllApplicants } from '../services/api';
import { ApplicantData } from '../types/applicant';

const ApplicantsPage: React.FC = () => {
  const [applicants, setApplicants] = useState<ApplicantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getAllApplicants();
        setApplicants(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch applicants.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Applicants Management</h1>
        {loading && <p className="text-center">Loading applicants...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {applicants.length > 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 font-bold">Name</th>
                  <th className="p-3 font-bold">Email</th>
                  <th className="p-3 font-bold">GPA</th>
                  <th className="p-3 font-bold">Experience (yrs)</th>
                  <th className="p-3 font-bold">Score</th>
                  <th className="p-3 font-bold">Skills</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{applicant.name}</td>
                    <td className="p-3">{applicant.email}</td>
                    <td className="p-3">{applicant.gpa}</td>
                    <td className="p-3">{applicant.experience}</td>
                    <td className="p-3">{applicant.score}</td>
                    <td className="p-3">{applicant.skills.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!loading && applicants.length === 0 && (
          <p className="text-center text-gray-500">No applicants found.</p>
        )}
      </div>
    </div>
  );
};

export default withAuth(ApplicantsPage, { roles: ['admin'] });
