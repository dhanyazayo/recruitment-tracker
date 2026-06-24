export const RECRUITER_ROLE_OPTIONS = [
  { value: "RECRUITER", label: "Recruiter" },
  { value: "SENIOR_RECRUITER", label: "Senior Recruiter" },
  { value: "RECRUITING_LEAD", label: "Recruiting Lead" },
  { value: "HR", label: "HR" },
] as const;

export const RECRUITER_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
] as const;

export const TEAM_OPTIONS = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Infrastructure",
  "Quality",
  "Security",
  "HR",
] as const;
