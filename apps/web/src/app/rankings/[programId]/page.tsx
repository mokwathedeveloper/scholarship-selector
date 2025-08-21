import React from 'react';
import { notFound } from 'next/navigation';

interface RankingPageProps {
  params: {
    programId: string;
  };
}

const RankingPage: React.FC<RankingPageProps> = ({ params }) => {
  const { programId } = params;

  if (!programId) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ranking for Program: {programId}</h1>
      <p>This page will display the leaderboard with score breakdown chips and explanation drawers.</p>
      {/* Future: Leaderboard, ScoreBreakdownCard, Explanation Panel */}
    </div>
  );
};

export default RankingPage;