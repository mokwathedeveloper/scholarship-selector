// frontend/src/pages/rank.js
import { useEffect, useState } from 'react';
import ApplicantCard from '../components/ApplicantCard';
import { getRankedApplicants } from '../services/api'; // Import the API function

export default function Rank() {
  const [rankedApplicants, setRankedApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankedData = async () => {
      try {
        const data = await getRankedApplicants();
        setRankedApplicants(data);
      } catch (err) {
        setError(err || 'Failed to fetch ranked applicants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankedData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading ranked applicants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

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
