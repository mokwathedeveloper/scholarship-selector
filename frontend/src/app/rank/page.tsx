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
          <p>Loading ranked applicants...</p>
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