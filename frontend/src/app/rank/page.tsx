'use client';

import React, { useEffect, useState } from 'react';
import { getRank } from '../../services/api';
import { RankedApplicant } from '../../types/applicant';
import RankTable from '../../components/RankTable';
import Layout from '../../components/Layout';

const RankPage: React.FC = () => {
  const [rankedApplicants, setRankedApplicants] = useState<RankedApplicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankedApplicants = async () => {
      try {
        setLoading(true);
        const data = await getRank();
        setRankedApplicants(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch ranked applicants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRankedApplicants();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Ranked Applicants</h1>
          <div className="flex justify-center items-center h-32">
            <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-700">Loading ranked applicants...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Ranked Applicants</h1>
          <p className="text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Ranked Applicants</h1>
        {rankedApplicants.length > 0 ? (
          <RankTable applicants={rankedApplicants} />
        ) : (
          <p>No ranked applicants available.</p>
        )}
      </div>
    </Layout>
  );
};

export default RankPage;