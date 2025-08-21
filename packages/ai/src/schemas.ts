import { z } from "zod";

export const ExtractionSchema = z.object({
  skills: z.array(z.string().toLowerCase()).max(200),
  totalYearsExp: z.number().int().min(0).max(50),
  highestEducation: z.object({
    level: z.enum(["Certificate","Diploma","HND","BSc","MSc","PhD","Bootcamp"]),
    institution: z.string().optional(),
    graduationYear: z.number().int().min(1970).max(new Date().getFullYear()).optional()
  }),
  certifications: z.array(z.string()).max(100).optional(),
  keywords: z.array(z.string().toLowerCase()).max(50)
});

export type Extraction = z.infer<typeof ExtractionSchema>;