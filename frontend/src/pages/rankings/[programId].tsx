import React from 'react';
import { useRouter } from 'next/router';

const RankingPage: React.FC = () => {
  const router = useRouter();
  const { programId } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ranking for Program: {programId}</h1>
      <p>This page will display the leaderboard with score breakdown chips and explanation drawers.</p>
      {/* Future: Leaderboard, ScoreBreakdownCard, Explanation Panel */}
    </div>
  );
};

export default RankingPage;