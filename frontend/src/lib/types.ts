export type DashboardSummary = {
  quickStats: {
    active: number;
    selected: number;
    atRisk: number;
  };
  pipelineStages: {
    stage: string;
    currentStage: string;
    count: number;
    color: string;
  }[];
  recentCandidates: {
    id: string;
    name: string;
    role: string;
    stage: string;
    daysInStage: number;
    slaStatus: string;
    recruiter: string;
    hasPendingFeedback: boolean;
  }[];
  slaAlert: {
    count: number;
    severity: string;
  };
  pipelineHealth: {
    onTrack: number;
    approaching: number;
    breached: number;
  };
};

export type SlaCandidateEntry = {
  id: string;
  name: string;
  role: string;
  recruiter: string;
  currentStage: string;
  stage: string;
  daysInStage: number;
  slaTarget: number | null;
  daysRemaining: number | null;
  overdueDays: number | null;
  status: "on-track" | "approaching" | "breached" | null;
};

export type SlaStatusResponse = {
  summary: {
    total: number;
    onTrack: number;
    approaching: number;
    breached: number;
  };
  slaTargets: {
    stage: string;
    targetDays: number;
  }[];
  breached: SlaCandidateEntry[];
  approaching: SlaCandidateEntry[];
  onTrack: SlaCandidateEntry[];
  candidates: SlaCandidateEntry[];
};

export type CandidateStatus = "Active" | "Hold" | "Rejected";

export type Candidate = {
  id: string;
  name: string;
  email: string | null;
  role: string;
  stage: string;
  currentStage: string;
  status: CandidateStatus;
  statusTag: string | null;
  recruiter: string;
  recruiterId: string | null;
  job: {
    id: string;
    title: string;
    department: string | null;
  };
  daysInStage: number;
  slaStatus: string | null;
  slaTarget: number | null;
  daysRemaining: number | null;
  overdueDays: number | null;
  hasPendingFeedback: boolean;
};

export type FeedbackEntry = {
  id: string;
  stage: string;
  interviewerName: string;
  rating: number | null;
  content: string;
  submittedAt: string;
};

export type CandidateDetail = Candidate & {
  feedback: FeedbackEntry[];
};

export type FeedbackInput = {
  candidateId: string;
  stage: string;
  interviewerName: string;
  content: string;
  rating?: number;
};

export type Recruiter = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleValue: string;
  team: string | null;
  phone?: string | null;
  status: string;
  statusValue: string;
  activeCandidates: number;
  selectedCount: number;
  conversionRate: number | null;
  slaCompliancePercent: number | null;
  createdAt: string;
  updatedAt?: string;
};

export type RecruiterProfile = Recruiter & {
  candidates: {
    id: string;
    name: string;
    role: string;
    currentStage: string;
  }[];
};

export type RecruiterInput = {
  name: string;
  email: string;
  role: string;
  team?: string;
  phone?: string;
  status?: string;
};
