import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ScoringService from '../services/scoring.service';
import Applicant from '../models/Applicant';
import AppError from '../utils/AppError';
import { RankedApplicant } from '../types/scoring';

// Helper to convert JSON to CSV
const convertToCsv = (data: any[]): string => {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [];

  csvRows.push(headers.join(',')); // Add headers
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      if (typeof val === 'object' && val !== null) {
        return '"' + String(val) + '"'; // Simple string conversion for objects
      }
      return '"' + String(val).replace(/"/g, '""') + '"'; // Escape double quotes
    });
    csvRows.push(values.join(','));
  }
  return csvRows.join('
');
};

// @desc    Export ranked applicants for a program
// @route   POST /api/export/:programId
// @access  Private (will add authentication later)
const exportRankedApplicants = asyncHandler(async (req: Request, res: Response) => {
  const { programId } = req.params;
  const { format = 'json' } = req.query; // 'csv' or 'json'

  const applicants = await Applicant.find({});
  const rankedApplicants: RankedApplicant[] = await ScoringService.rankApplicants(applicants);

  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=ranked_applicants_' + programId + '.csv');
    res.send(convertToCsv(rankedApplicants));
  } else { // Default to json
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=ranked_applicants_' + programId + '.json');
    res.json(rankedApplicants);
  }
});

export { exportRankedApplicants };
