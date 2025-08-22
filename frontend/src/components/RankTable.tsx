import React, { useState } from 'react';
import { RankedApplicant } from '../types/applicant';
import BreakdownModal from './BreakdownModal';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; // Import icons

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

  const getSortIcon = (key: keyof RankedApplicant) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSort className="ml-2 text-gray-400" />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp className="ml-2 text-white" /> : <FaSortDown className="ml-2 text-white" />;
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg font-inter">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left cursor-pointer uppercase tracking-wider flex items-center" onClick={() => requestSort('applicantId')}>
              Applicant ID {getSortIcon('applicantId')}
            </th>
            <th className="py-3 px-4 text-left cursor-pointer uppercase tracking-wider flex items-center" onClick={() => requestSort('score')}>
              Score {getSortIcon('score')}
            </th>
            <th className="py-3 px-4 text-left uppercase tracking-wider">Explanation</th>
            <th className="py-3 px-4 text-left uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 divide-y divide-gray-200">
          {sortedApplicants.map((applicant) => (
            <tr key={applicant.applicantId} className="hover:bg-blue-50 transition duration-300 ease-in-out">
              <td className="py-3 px-4 whitespace-nowrap">{applicant.applicantId}</td>
              <td className="py-3 px-4 whitespace-nowrap">{applicant.score.toFixed(2)}</td>
              <td className="py-3 px-4">{applicant.explanation}</td>
              <td className="py-3 px-4 whitespace-nowrap">
                <button
                  onClick={() => setSelectedApplicant(applicant)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
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