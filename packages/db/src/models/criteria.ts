import { Schema, model, Document } from "mongoose";

// Interface for Criteria Document
export interface ICriteria extends Document {
  programId: string;
  requiredSkills?: string[];
  niceToHaveSkills?: string[];
  minYearsExperience?: number;
  educationLevels?: string[];
  weights: {
    skillsMatch: number;
    experience: number;
    education: number;
    assessments: number;
    writingQuality: number;
    diversityBonus?: number;
  };
  keywordBoosts?: { term: string; weight: number }[];
  targetEmbedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

const CriteriaSchema = new Schema<ICriteria>({
  programId: { type: String, required: true, index: true },
  requiredSkills: [{ type: String }],
  niceToHaveSkills: [{ type: String }],
  minYearsExperience: { type: Number },
  educationLevels: [{ type: String }],
  weights: {
    skillsMatch: { type: Number, required: true },
    experience: { type: Number, required: true },
    education: { type: Number, required: true },
    assessments: { type: Number, required: true },
    writingQuality: { type: Number, required: true },
    diversityBonus: { type: Number },
  },
  keywordBoosts: [{ term: String, weight: Number }],
  targetEmbedding: [{ type: Number }],
}, { timestamps: true });

export default model<ICriteria>("Criteria", CriteriaSchema);