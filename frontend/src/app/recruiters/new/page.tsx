import { redirect } from "next/navigation";
import { RecruiterForm } from "@/components/RecruiterForm";
import { createRecruiterAction } from "@/app/recruiters/actions";
import { canManageRecruiters } from "@/lib/roles";
import { getUserRole } from "@/lib/session";

export default async function NewRecruiterPage() {
  const role = await getUserRole();
  if (!canManageRecruiters(role)) {
    redirect("/recruiters");
  }

  return (
    <RecruiterForm
      title="Add Recruiter"
      submitLabel="Create Recruiter"
      action={createRecruiterAction}
    />
  );
}
