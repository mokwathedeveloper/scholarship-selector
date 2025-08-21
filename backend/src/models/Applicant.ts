import mongoose, { Document, Schema } from 'mongoose';

export interface IApplicant extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  gpa: number;
  experience: number;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ApplicantSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email',
      ],
    },
    gpa: {
      type: Number,
      required: [true, 'Please add a GPA'],
      min: [0.0, 'GPA cannot be less than 0.0'],
      max: [4.0, 'GPA cannot be greater than 4.0'],
    },
    experience: {
      type: Number,
      required: [true, 'Please add years of experience'],
      min: [0, 'Experience cannot be negative'],
    },
    skills: {
      type: [String],
      required: [true, 'Please add skills'],
    },
    // Add other relevant fields for applicant data
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IApplicant>('Applicant', ApplicantSchema);