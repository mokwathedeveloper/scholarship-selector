import React, { useEffect, useState } from 'react';
import { getAllApplicants, getRank } from '../services/api'; // Import getAllApplicants
import { ApplicantData, RankedApplicant } from '../types/applicant'; // Import ApplicantData
import Link from 'next/link'; // Import Link for navigation

export default function Home() {
  const [recentApplicants, setRecentApplicants] = useState<ApplicantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentApplicants = async () => {
      try {
        setLoading(true);
        const data = await getAllApplicants(); // Fetch all applicants
        // Sort by createdAt or updatedAt if available, otherwise just take a few
        setRecentApplicants(data.slice(0, 5)); // Display up to 5 recent applicants
      } catch (err: any) {
        setError(err.message || 'Failed to fetch recent applicants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentApplicants();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">Landing Page</h1>
        <p>Loading recent uploads...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold underline">Landing Page</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Scholarship Selector!</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>
        {recentApplicants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Document Type</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {recentApplicants.map((applicant) => (
                  <tr key={applicant.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-4">{applicant.name}</td>
                    <td className="py-3 px-4">{applicant.email}</td>
                    <td className="py-3 px-4">{applicant.documentType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No recent uploads available.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Actions</h2>
        <Link href="/rank" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
          View Ranked Applicants
        </Link>
        <Link href="/upload" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Upload New Applicants
        </Link>
      </div>
    </div>
  );
}