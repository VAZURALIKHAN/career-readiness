export type ReadinessClassification = 'Ready' | 'Nearly Ready' | 'Needs Improvement';

export type ExperienceLevel = 'Freshers' | '0-1 Years' | 'Career Switcher' | '1-3 Years';

export interface SkillRating {
  name: string;
  level: number; // 0 to 100
}

export interface StudentProfile {
  name: string;
  targetRole: string;
  cgpa: number;
  department: string;
  graduationYear: number;
  collegeTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  currentRoleOrStatus?: string; // For switchers (e.g. "Data Analyst" or "Non-CS Student")
  technicalSkills: Record<string, number>; // skillName -> 0..100
  internships: number;
  projectsCount: number;
  certificationsCount: number;
  hackathonsCount: number;
  openSourceContributions: number;
  communicationScore: number; // 0..100
  problemSolvingScore: number; // 0..100
  teamworkScore: number; // 0..100
  codingTestScore: number; // 0..100 (LeetCode/DSA benchmark)
  resumeText?: string;
}

export interface TargetRoleBenchmark {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  requiredSkills: { name: string; minRequired: number; weight: number }[];
  targetCgpa: number;
  baseSalaryMin: number; // LPA
  baseSalaryMax: number; // LPA
  demandLevel: 'High' | 'Very High' | 'Explosive';
  freshersAllowed: boolean;
}

export interface FeatureImportance {
  featureName: string;
  impactValue: number; // positive or negative SHAP contribution
  impactType: 'positive' | 'negative';
  description: string;
}

export interface SkillGap {
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gapDelta: number; // required - current
  priority: 'High' | 'Medium' | 'Low';
  estimatedWeeks: number;
}

export interface Recommendation {
  id: string;
  type: 'Learn' | 'Project' | 'Practice' | 'Certify';
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTime: string;
  skillName: string;
  actionText: string;
}

export interface PredictionResult {
  readinessScore: number; // 0..100
  classification: ReadinessClassification;
  placementProbability: number; // 0..100
  expectedSalaryRange: string; // e.g. "₹8–12 LPA"
  topPositiveDrivers: FeatureImportance[];
  topNegativeDrivers: FeatureImportance[];
  skillGaps: SkillGap[];
  recommendations: Recommendation[];
}

export interface JobOpening {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Remote' | 'Hybrid';
  experienceLevel: ExperienceLevel;
  targetRole: string;
  salaryRange: string;
  matchScore: number; // calculated 0..100
  requiredSkills: string[];
  missingSkillsForStudent: string[];
  postedDate: string;
  deadline: string;
  applyUrl: string;
  isHot: boolean;
}

export interface JobSwitchDiff {
  currentRole: string;
  targetRole: string;
  transferableSkills: { name: string; level: number; relevance: string }[];
  deltaMissingSkills: { name: string; requiredLevel: number; learningCurve: 'Easy' | 'Moderate' | 'Steep' }[];
  transitionDifficultyScore: number; // 1..10 scale
  estimatedTransitionMonths: number;
  strategicRoadmap: { phase: string; title: string; action: string; duration: string }[];
}

export interface FresherRoadmapPhase {
  phaseNumber: number;
  title: string;
  timeframe: string;
  goal: string;
  milestones: string[];
  recommendedCourses: string[];
  keyProjects: string[];
}

export interface AtsResult {
  score: number; // 0..100
  matchedKeywords: string[];
  missingKeywords: string[];
  formatSuggestions: string[];
  summary: string;
}

export interface InterviewQuestion {
  id: string;
  skillName: string;
  question: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sampleAnswer: string;
  tips: string;
}
