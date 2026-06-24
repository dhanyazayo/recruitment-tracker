"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setUserRoleAction } from "@/app/recruiters/actions";
import { USER_ROLE_LABELS, type UserRole } from "@/lib/roles";

type RoleSwitcherProps = {
  currentRole: UserRole;
};

export function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const role = event.target.value as UserRole;
    startTransition(async () => {
      await setUserRoleAction(role);
      router.refresh();
    });
  }

  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <span className="hidden sm:inline">View as</span>
      <select
        value={currentRole}
        onChange={handleChange}
        disabled={pending}
        className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700"
        aria-label="Switch user role"
      >
        {(Object.keys(USER_ROLE_LABELS) as UserRole[]).map((role) => (
          <option key={role} value={role}>
            {USER_ROLE_LABELS[role]}
          </option>
        ))}
      </select>
    </label>
  );
}
