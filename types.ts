
export enum AppPhase {
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  CURRICULUM_REVEAL = 'CURRICULUM_REVEAL',
  DAILY_LOOP = 'DAILY_LOOP',
}

export type Role = 'Business' | 'Product' | 'Developer' | 'CXO' | 'Architect' | 'HR' | 'Unassigned';

export interface UserState {
  name: string;
  email: string;
  role: Role;
  objective: string; // Core realignment: Objective drives the path
  personaName?: string; 
  expertiseLevel: number; // 1-10
  dailyCommitment: string;
  currentDay: number;
  totalDays: number;
  lastQuizScore: number;
  isReturningUser: boolean;
  personaDescription?: string;
  contentBuffer?: {
    day: number;
    topic: string;
    data: DailyContent;
  } | null;
}

export interface Message {
  id: string;
  sender: 'user' | 'lumina';
  text: string;
  timestamp: number;
}

export interface CurriculumDay {
  day: number;
  title: string;
  topic: string;
}

export interface Curriculum {
  trackName: string;
  description: string;
  schedule: CurriculumDay[];
}

export interface VisualStep {
    id: string;
    label: string;
    subLabel?: string;
    type: 'input' | 'process' | 'decision' | 'output' | 'storage';
}

export interface DailyContent {
  dayTitle: string;
  visualConcept: string;
  sections: {
    header: string;
    body: string;
  }[];
  deepDive?: {
    title: string;
    explanation: string;
    visualSteps: VisualStep[];
  };
  // New Interactive Element
  practicalTask?: {
    title: string;
    description: string;
    actionItems: string[];
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  }[];
  summary: string;
}

export interface ProgressMetrics {
  currentDay: number;
  timeSpent: string;
  overallProgress: number;
  nextTopic: string;
}
