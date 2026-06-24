export type UserRole = "admin" | "recruiting_lead" | "leadership";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: "Admin",
  recruiting_lead: "Recruiting Lead",
  leadership: "Leadership",
};

export function canManageRecruiters(role: UserRole): boolean {
  return role === "admin" || role === "recruiting_lead";
}

export function canViewRecruiters(role: UserRole): boolean {
  return canManageRecruiters(role) || role === "leadership";
}
