import React from 'react';

interface ScoreBreakdownCardProps {
  breakdown: Record<string, number>;
  explanation?: string;
}

const ScoreBreakdownCard: React.FC<ScoreBreakdownCardProps> = ({ breakdown, explanation }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Score Breakdown</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(breakdown).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="font-medium">{key}:</span>
            <span>{value.toFixed(1)}</span>
          </div>
        ))}
      </div>
      {explanation && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
          <h4 className="font-semibold mb-1">Explanation:</h4>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default ScoreBreakdownCard;