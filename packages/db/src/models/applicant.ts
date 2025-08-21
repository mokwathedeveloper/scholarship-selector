import { Schema, model, Types, Document } from "mongoose";

// Interface for Applicant Document
export interface IApplicant extends Document {
  externalId?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  resumeText?: string;
  coverLetterText?: string;
  qna?: { questionId: string; answerText: string }[];
  assessments?: { name: string; score: number; maxScore: number }[];
  extracted?: {
    skills?: string[];
    totalYearsExp?: number;
    highestEducation?: { level?: string; institution?: string; graduationYear?: number };
    certifications?: string[];
    keywords?: string[];
  };
  vectors?: {
    resumeEmbedding?: number[];
    answersEmbedding?: number[];
  };
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicantSchema = new Schema<IApplicant>({
  externalId: { type: String, index: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  resumeText: { type: String },
  coverLetterText: { type: String },
  qna: [{ questionId: String, answerText: String }],
  assessments: [{ name: String, score: Number, maxScore: Number }],
  extracted: {
    skills: [{ type: String }],
    totalYearsExp: { type: Number },
    highestEducation: {
      level: { type: String },
      institution: { type: String },
      graduationYear: { type: Number },
    },
    certifications: [{ type: String }],
    keywords: [{ type: String }],
  },
  vectors: {
    resumeEmbedding: { type: [Number], index: "vector" },
    answersEmbedding: { type: [Number], index: "vector" }
  },
  metadata: { type: Schema.Types.Mixed },
}, { timestamps: true });

export default model<IApplicant>("Applicant", ApplicantSchema);