import { Schema, model, Types, Document } from "mongoose";

// Interface for Ranking Item
export interface IRankingItem {
  applicantId: Types.ObjectId; // Reference to Applicant
  score: number;
  breakdown: Record<string, any>; // Per-feature contributions
  explanation?: string; // LLM summary
}

// Interface for Ranking Document
export interface IRanking extends Document {
  programId: string;
  runId: string;
  items: IRankingItem[];
  metrics?: { ndcgAt10?: number; precisionAt10?: number };
  createdAt: Date;
  updatedAt: Date;
}

const RankingItemSchema = new Schema<IRankingItem>({
  applicantId: { type: Schema.Types.ObjectId, ref: 'Applicant', required: true },
  score: { type: Number, required: true },
  breakdown: { type: Schema.Types.Mixed, required: true },
  explanation: { type: String },
});

const RankingSchema = new Schema<IRanking>({
  programId: { type: String, required: true },
  runId: { type: String, required: true },
  items: [RankingItemSchema],
  metrics: {
    ndcgAt10: { type: Number },
    precisionAt10: { type: Number },
  },
}, { timestamps: true });

export default model<IRanking>("Ranking", RankingSchema);