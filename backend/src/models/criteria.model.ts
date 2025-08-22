import mongoose, { Document, Schema } from 'mongoose';

export interface ICriteria extends Document {
  programId: mongoose.Types.ObjectId;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  minYearsExperience: number;
  educationLevels: string[];
  weights: {
    skillsMatch: number;
    experience: number;
    education: number;
    assessments: number;
    writingQuality?: number;
    semanticSimilarity: number; // Added semanticSimilarity weight
  };
  keywordBoosts: string[];
}

const CriteriaSchema: Schema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    niceToHaveSkills: {
      type: [String],
      default: [],
    },
    minYearsExperience: {
      type: Number,
      default: 0,
    },
    educationLevels: {
      type: [String],
      default: [],
    },
    weights: {
      skillsMatch: { type: Number, default: 1 },
      experience: { type: Number, default: 1 },
      education: { type: Number, default: 1 },
      assessments: { type: Number, default: 1 },
      writingQuality: { type: Number, default: 0 }, // Optional
      semanticSimilarity: { type: Number, default: 1 }, // Added semanticSimilarity weight
    },
    keywordBoosts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICriteria>('Criteria', CriteriaSchema);
