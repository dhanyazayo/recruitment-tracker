"use client";

import { useTransition } from "react";
import { deactivateRecruiterAction } from "@/app/recruiters/actions";

type RecruiterDeactivateButtonProps = {
  recruiterId: string;
  recruiterName: string;
  isInactive: boolean;
};

export function RecruiterDeactivateButton({
  recruiterId,
  recruiterName,
  isInactive,
}: RecruiterDeactivateButtonProps) {
  const [pending, startTransition] = useTransition();

  if (isInactive) {
    return null;
  }

  function handleDeactivate() {
    const confirmed = window.confirm(
      `Deactivate ${recruiterName}? Existing assigned candidates will remain visible and can be reassigned.`,
    );
    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deactivateRecruiterAction(recruiterId);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDeactivate}
      disabled={pending}
      className="text-sm font-medium text-red-700 hover:text-red-900 disabled:opacity-60"
    >
      {pending ? "Deactivating..." : "Deactivate"}
    </button>
  );
}
