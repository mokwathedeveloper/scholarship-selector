import React, { useState } from 'react';
import { RankedApplicant } from '../types/applicant';
import BreakdownModal from './BreakdownModal'; // Assuming this component will be created

interface RankTableProps {
  applicants: RankedApplicant[];
}

const RankTable: React.FC<RankTableProps> = ({ applicants }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof RankedApplicant; direction: 'ascending' | 'descending' } | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<RankedApplicant | null>(null);

  const sortedApplicants = React.useMemo(() => {
    let sortableApplicants = [...applicants];
    if (sortConfig !== null) {
      sortableApplicants.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableApplicants;
  }, [applicants, sortConfig]);

  const requestSort = (key: keyof RankedApplicant) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getArrow = (key: keyof RankedApplicant) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '';
    }
    return sortConfig.direction === 'ascending' ? ' ⬆️' : ' ⬇️';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('applicantId')}>
              Applicant ID {getArrow('applicantId')}
            </th>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('score')}>
              Score {getArrow('score')}
            </th>
            <th className="py-3 px-4 text-left">Explanation</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sortedApplicants.map((applicant) => (
            <tr key={applicant.applicantId} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{applicant.applicantId}</td>
              <td className="py-3 px-4">{applicant.score.toFixed(2)}</td>
              <td className="py-3 px-4">{applicant.explanation}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  View Breakdown
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApplicant && (
        <BreakdownModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
};

export default RankTable;