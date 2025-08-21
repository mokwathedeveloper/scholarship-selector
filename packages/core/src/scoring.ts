import { cosineSim } from "./similarity";

export type CriteriaWeights = {
  skillsMatch: number; experience: number; education: number;
  assessments: number; writingQuality: number; diversityBonus?: number;
};

export function scoreApplicant(opts: {
  applicant: {
    extracted: {
      skills: string[]; totalYearsExp: number;
      highestEducation?: { level?: string; institution?: string; graduationYear?: number };
    };
    assessments?: { score: number; maxScore: number }[];
    vectors?: { resumeEmbedding?: number[]; answersEmbedding?: number[] };
    writingQuality?: number; // 0-100 from LLM rubric
  };
  criteria: {
    requiredSkills: string[];
    niceToHaveSkills?: string[];
    minYearsExperience?: number;
    educationLevels?: string[];
    keywordBoosts?: { term: string; weight: number }[];
    weights: CriteriaWeights;
    targetEmbedding?: number[];
  };
}) {
  const { applicant, criteria } = opts;
  const W = criteria.weights;

  // Skills overlap
  const setA = new Set((applicant.extracted.skills || []).map(s => s.toLowerCase()));
  const req = criteria.requiredSkills.map(s => s.toLowerCase());
  const nice = (criteria.niceToHaveSkills || []).map(s => s.toLowerCase());

  const reqHit = req.every(s => setA.has(s));
  const niceHits = nice.filter(s => setA.has(s)).length;
  const skillsScore = reqHit ? Math.min(100, 60 + 10 * niceHits) : 10 * niceHits;

  // Experience (log-scaled, cap at 10y)
  const years = Math.min(10, Math.max(0, applicant.extracted.totalYearsExp || 0));
  const expScore = Math.min(100, Math.round(100 * Math.log10(1 + years)));

  // Education mapping (configurable)
  const eduOrder = ["Certificate","Diploma","HND","BSc","MSc","PhD","Bootcamp"];
  const eduLevel = applicant.extracted.highestEducation?.level || "Certificate";
  const eduIdx = eduOrder.indexOf(eduLevel);
  const acceptable = criteria.educationLevels?.some(l => eduOrder.indexOf(l) <= eduIdx) ?? true;
  const eduScore = acceptable ? 100 : 40;

  // Assessments normalized
  const assessments = applicant.assessments || [];
  const norm = (assessments.reduce((s,a)=> s + (a.score / (a.maxScore||100)),0) / (assessments.length||1)) * 100;

  // Semantic similarity
  const target = criteria.targetEmbedding || [];
  const emb = applicant.vectors?.resumeEmbedding || applicant.vectors?.answersEmbedding || [];
  const sim = (target.length && emb.length) ? (0.5 + 0.5 * cosineSim(target, emb)) * 100 : 50;

  // Writing quality already 0-100
  const writing = applicant.writingQuality ?? 60;

  // Weighted sum (skills use max of lexical vs semantic)
  const skillsCombined = 0.6 * skillsScore + 0.4 * sim;

  let raw =
    W.skillsMatch * skillsCombined +
    W.experience   * expScore +
    W.education    * eduScore +
    W.assessments  * norm +
    W.writingQuality * writing;

  // Optional keyword boosts
  for (const kb of (criteria.keywordBoosts || [])) {
    if ([...setA].some(s => s.includes(kb.term.toLowerCase()))) raw += kb.weight;
  }

  // Calibrate (squash to 0..100)
  const calibrated = Math.max(0, Math.min(100, 1 / (1 + Math.exp(-0.06*(raw-250))) * 100));

  const breakdown = { skillsScore, sim, expScore, eduScore, norm, writing, calibrated };
  return { score: calibrated, breakdown };
}