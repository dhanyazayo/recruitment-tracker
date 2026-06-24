import { RecruiterRole, RecruiterStatus } from '@prisma/client';

export const RECRUITER_ROLE_LABELS: Record<RecruiterRole, string> = {
  RECRUITER: 'Recruiter',
  SENIOR_RECRUITER: 'Senior Recruiter',
  RECRUITING_LEAD: 'Recruiting Lead',
  HR: 'HR',
};

export const RECRUITER_STATUS_LABELS: Record<RecruiterStatus, string> = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

export function parseRecruiterRole(value: string): RecruiterRole | null {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, '_');
  if (Object.values(RecruiterRole).includes(normalized as RecruiterRole)) {
    return normalized as RecruiterRole;
  }

  const byLabel = Object.entries(RECRUITER_ROLE_LABELS).find(
    ([, label]) => label.toLowerCase() === value.trim().toLowerCase(),
  );
  return byLabel ? (byLabel[0] as RecruiterRole) : null;
}

export function parseRecruiterStatus(value: string): RecruiterStatus | null {
  const normalized = value.trim().toUpperCase();
  if (Object.values(RecruiterStatus).includes(normalized as RecruiterStatus)) {
    return normalized as RecruiterStatus;
  }

  const byLabel = Object.entries(RECRUITER_STATUS_LABELS).find(
    ([, label]) => label.toLowerCase() === value.trim().toLowerCase(),
  );
  return byLabel ? (byLabel[0] as RecruiterStatus) : null;
}

export function getRecruiterRoleLabel(role: RecruiterRole): string {
  return RECRUITER_ROLE_LABELS[role];
}

export function getRecruiterStatusLabel(status: RecruiterStatus): string {
  return RECRUITER_STATUS_LABELS[status];
}
