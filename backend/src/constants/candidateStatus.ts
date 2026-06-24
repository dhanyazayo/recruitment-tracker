import { CandidateStatus, Prisma } from '@prisma/client';

export const NON_REJECTED_CANDIDATE_WHERE = {
  status: { not: CandidateStatus.Rejected },
} satisfies Prisma.CandidateWhereInput;

export type CandidateStatusFilter = 'active' | 'rejected' | 'all';

export function buildCandidateStatusWhere(
  filter: CandidateStatusFilter = 'active',
): Prisma.CandidateWhereInput {
  switch (filter) {
    case 'rejected':
      return { status: CandidateStatus.Rejected };
    case 'all':
      return {};
    case 'active':
    default:
      return NON_REJECTED_CANDIDATE_WHERE;
  }
}

export function parseCandidateStatusFilter(value: unknown): CandidateStatusFilter {
  if (value === 'rejected' || value === 'all' || value === 'active') {
    return value;
  }
  return 'active';
}
