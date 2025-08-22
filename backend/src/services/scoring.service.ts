import { IApplicant } from '../models/Applicant';
import { RankedApplicant, ScoreBreakdown } from '../types/scoring';
import { PorterStemmer, WordTokenizer } from 'natural';
import { removeStopwords } from 'stopword';
import cosineSimilarity from 'compute-cosine-similarity';

const REQUIRED_SKILLS = ['javascript', 'react', 'nodejs', 'mongodb'];
const NICE_TO_HAVE_SKILLS = ['typescript', 'nextjs', 'graphql'];
const EDUCATION_LEVEL_MAP: { [key: string]: number } = {
  bachelor: 70,
  master: 90,
  phd: 100,
};

class ScoringService {
  private tokenizer = new WordTokenizer();

  private readonly WEIGHTS = {
    skillsScore: 0.3,
    experienceScore: 0.25,
    educationScore: 0.15,
    assessmentsScore: 0.2,
    semanticScore: 0.1,
  };

  public async rankApplicants(applicants: IApplicant[]): Promise<RankedApplicant[]> {
    const rankedApplicants = applicants.map((applicant) => {
      const scoreBreakdown = this.calculateScore(applicant);
      const totalScore = this.calculateTotalScore(scoreBreakdown);
      const explanation = this.generateExplanation(scoreBreakdown);

      return {
        applicantId: applicant._id,
        score: totalScore,
        breakdown: scoreBreakdown,
        explanation,
      };
    });

    return rankedApplicants.sort((a, b) => b.score - a.score);
  }

  private calculateTotalScore(breakdown: ScoreBreakdown): number {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const key in breakdown) {
      if (this.WEIGHTS.hasOwnProperty(key)) {
        weightedSum += breakdown[key as keyof ScoreBreakdown] * this.WEIGHTS[key as keyof typeof this.WEIGHTS];
        totalWeight += this.WEIGHTS[key as keyof typeof this.WEIGHTS];
      }
    }

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  private calculateScore(applicant: IApplicant): ScoreBreakdown {
    const skillsScore = this.calculateSkillsScore(applicant.skills || []);
    const experienceScore = this.calculateExperienceScore(applicant.experience || 0);
    const educationScore = this.calculateEducationScore(applicant.extracted?.highestEducation?.level);
    const assessmentsScore = this.calculateAssessmentsScore(applicant.assessments || []);
    const semanticScore = this.calculateSemanticScore(applicant.resumeText || '');

    return {
      skillsScore,
      experienceScore,
      educationScore,
      assessmentsScore,
      semanticScore,
    };
  }

  private calculateSkillsScore(applicantSkills: string[]): number {
    const lowercasedSkills = applicantSkills.map(s => s.toLowerCase());
    let score = 0;
    const requiredMet = REQUIRED_SKILLS.every(skill => lowercasedSkills.includes(skill));

    if (!requiredMet) return 0; // Harsh penalty for missing required skills

    score += 60; // Base score for meeting all required skills

    const niceToHaveMet = NICE_TO_HAVE_SKILLS.filter(skill => lowercasedSkills.includes(skill));
    score += (niceToHaveMet.length / NICE_TO_HAVE_SKILLS.length) * 40;

    return Math.round(score);
  }

  private calculateExperienceScore(years: number): number {
    if (years <= 0) return 0;
    // Log-scaled score, capped at 100
    const score = Math.log(years + 1) / Math.log(20) * 100; // Assumes 20 years is max relevant experience
    return Math.min(100, Math.round(score));
  }

  private calculateEducationScore(level?: string): number {
    if (!level) return 0;
    return EDUCATION_LEVEL_MAP[level.toLowerCase()] || 0;
  }

  private calculateAssessmentsScore(assessments: { name: string; score: number; maxScore: number }[]): number {
    if (assessments.length === 0) return 0;
    const totalNormalizedScore = assessments.reduce((sum, assessment) => {
      return sum + (assessment.score / assessment.maxScore) * 100;
    }, 0);
    return Math.round(totalNormalizedScore / assessments.length);
  }

  private calculateSemanticScore(resumeText: string): number {
    const jobDescription = 'We are looking for a senior software engineer with experience in javascript, react, and nodejs to build scalable web applications.';
    if (!resumeText) return 0;

    const resumeTokens = this.processText(resumeText);
    const jobDescTokens = this.processText(jobDescription);

    const vocabulary = [...new Set([...resumeTokens, ...jobDescTokens])];
    const resumeVector = this.createVector(resumeTokens, vocabulary);
    const jobDescVector = this.createVector(jobDescTokens, vocabulary);

    const similarity = cosineSimilarity(resumeVector, jobDescVector);
    if (similarity === null || isNaN(similarity)) {
      return 0; // Or handle as appropriate, e.g., throw an error or log
    }
    return Math.round(similarity * 100);
  }

  private processText(text: string): string[] {
    const tokens = this.tokenizer.tokenize(text.toLowerCase());
    const filteredTokens = removeStopwords(tokens);
    return filteredTokens.map(token => PorterStemmer.stem(token));
  }

  private createVector(tokens: string[], vocabulary: string[]): number[] {
    const vector = new Array(vocabulary.length).fill(0);
    tokens.forEach(token => {
      const index = vocabulary.indexOf(token);
      if (index !== -1) {
        vector[index] += 1;
      }
    });
    return vector;
  }

  private generateExplanation(breakdown: ScoreBreakdown): string {
    const parts: string[] = [];
    if (breakdown.skillsScore > 75) parts.push('Excellent skills match.');
    else if (breakdown.skillsScore > 50) parts.push('Good skills match.');
    else parts.push('Skills match could be better.');

    if (breakdown.experienceScore > 75) parts.push('Strong experience.');
    else if (breakdown.experienceScore > 50) parts.push('Relevant experience.');

    if (breakdown.assessmentsScore > 80) parts.push('Strong assessment results.');

    if (breakdown.semanticScore > 70) parts.push('Resume shows strong semantic similarity to job description.');

    return parts.join(' ') || 'Overall profile evaluation.';
  }
}

export default new ScoringService();

