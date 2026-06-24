import { cookies } from "next/headers";
import type { UserRole } from "./roles";

const ROLE_COOKIE = "app_role";

const VALID_ROLES: UserRole[] = ["admin", "recruiting_lead", "leadership"];

export async function getUserRole(): Promise<UserRole> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ROLE_COOKIE)?.value;
  if (value && VALID_ROLES.includes(value as UserRole)) {
    return value as UserRole;
  }
  return "admin";
}

export { ROLE_COOKIE };
