import { IApplicant } from '../models/Applicant';
import { processText } from '../utils/text';

class ExtractionService {
  public async extractApplicantData(applicant: IApplicant): Promise<Partial<IApplicant>> {
    const extractedData: Partial<IApplicant> = {
      extracted: {
        skills: [],
        totalYearsExp: 0,
        highestEducation: {
          level: '',
        },
      },
    };

    if (applicant.resumeText) {
      const processedResume = processText(applicant.resumeText);
      // Simple keyword matching for skills
      const extractedSkills = this.extractSkills(processedResume);
      if (extractedData.extracted) {
        extractedData.extracted.skills = extractedSkills;
      }

      // Simple regex for years of experience (very basic, needs improvement)
      const yearsMatch = applicant.resumeText.match(/(\d+)\s*years?\s*experience/i);
      if (yearsMatch && extractedData.extracted) {
        extractedData.extracted.totalYearsExp = parseInt(yearsMatch[1], 10);
      }

      // Simple keyword matching for education (very basic, needs improvement)
      const educationLevel = this.extractEducationLevel(applicant.resumeText);
      if (educationLevel && extractedData.extracted && extractedData.extracted.highestEducation) {
        extractedData.extracted.highestEducation.level = educationLevel;
      }
    }

    // Similar logic can be applied for coverLetterText and certifications

    return extractedData;
  }

  private extractSkills(processedText: string[]): string[] {
    const commonSkills = ['javascript', 'typescript', 'react', 'nodejs', 'mongodb', 'express', 'graphql', 'python', 'java', 'c++', 'html', 'css', 'sql'];
    const foundSkills = commonSkills.filter(skill => processedText.includes(skill));
    return [...new Set(foundSkills)]; // Return unique skills
  }

  private extractEducationLevel(text: string): string | undefined {
    const lowercasedText = text.toLowerCase();
    if (lowercasedText.includes('phd') || lowercasedText.includes('doctorate')) return 'PhD';
    if (lowercasedText.includes('master') || lowercasedText.includes('m.sc')) return 'Master';
    if (lowercasedText.includes('bachelor') || lowercasedText.includes('b.sc')) return 'Bachelor';
    return undefined;
  }
}

export default new ExtractionService();

