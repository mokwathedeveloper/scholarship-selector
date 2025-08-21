import { scoreApplicant } from '../../../packages/core/src/scoring';
import ApplicantModel, { IApplicant } from '../../../packages/db/src/models/applicant';
import CriteriaModel, { ICriteria } from '../../../packages/db/src/models/criteria';
import RankingModel, { IRanking, IRankingItem } from '../../../packages/db/src/models/ranking';
import { Types } from 'mongoose';

export class RankService {
  async rankProgram(programId: string, topK = 50) {
    const criteria: ICriteria | null = await CriteriaModel.findOne({ programId }).exec();
    if (!criteria) {
      throw new Error(`Criteria for program ${programId} not found.`);
    }

    const applicants: IApplicant[] = await ApplicantModel.find({}).exec(); // Fetch all applicants for now

    const items: IRankingItem[] = applicants.map(a => {
      const { score, breakdown } = scoreApplicant({ applicant: a, criteria });
      // Placeholder for LLM explanation
      const explanation = `Applicant scored ${score.toFixed(2)} based on breakdown.`;
      return { applicantId: a._id, score, breakdown, explanation } as IRankingItem;
    }).sort((x, y) => y.score - x.score).slice(0, topK);

    // Placeholder for metrics evaluation (NDCG, Precision)
    const metrics = { ndcgAt10: 0.0, precisionAt10: 0.0 };

    const runId = new Types.ObjectId().toHexString(); // Generate a unique runId

    const newRanking: IRanking = new RankingModel({
      programId,
      runId,
      items,
      metrics,
    });

    await newRanking.save();

    return { runId, items, metrics };
  }

  async getLatestRanking(programId: string) {
    const latestRanking: IRanking | null = await RankingModel.findOne({ programId })
      .sort({ createdAt: -1 })
      .populate('items.applicantId') // Populate applicant details
      .exec();

    if (!latestRanking) {
      throw new Error(`No ranking found for program ${programId}.`);
    }

    return latestRanking;
  }
}