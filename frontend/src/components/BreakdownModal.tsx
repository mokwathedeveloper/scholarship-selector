import React from 'react';
import { RankedApplicant } from '../types/applicant';

interface BreakdownModalProps {
  applicant: RankedApplicant;
  onClose: () => void;
}

const BreakdownModal: React.FC<BreakdownModalProps> = ({ applicant, onClose }) => {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Score Breakdown for Applicant ID: {applicant.applicantId}
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            <strong>Total Score:</strong> {applicant.score.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Explanation:</strong> {applicant.explanation}
          </p>
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-700">Detailed Breakdown:</h4>
            <ul className="list-disc list-inside text-sm text-gray-500">
              <li>Skills Score: {applicant.breakdown.skillsScore.toFixed(2)}</li>
              <li>Experience Score: {applicant.breakdown.experienceScore.toFixed(2)}</li>
              <li>Education Score: {applicant.breakdown.educationScore.toFixed(2)}</li>
              <li>Assessments Score: {applicant.breakdown.assessmentsScore.toFixed(2)}</li>
              <li>Semantic Score: {applicant.breakdown.semanticScore.toFixed(2)}</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakdownModal;