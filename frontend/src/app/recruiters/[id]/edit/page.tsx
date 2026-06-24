import { notFound, redirect } from "next/navigation";
import { RecruiterForm } from "@/components/RecruiterForm";
import { getRecruiter } from "@/lib/api";
import { canManageRecruiters } from "@/lib/roles";
import { getUserRole } from "@/lib/session";
import { updateRecruiterAction } from "@/app/recruiters/actions";

export default async function EditRecruiterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await getUserRole();

  if (!canManageRecruiters(role)) {
    redirect("/recruiters");
  }

  const recruiter = await getRecruiter(id);
  if (!recruiter) {
    notFound();
  }

  const boundAction = updateRecruiterAction.bind(null, id);

  return (
    <RecruiterForm
      title="Edit Recruiter"
      submitLabel="Save Changes"
      action={boundAction}
      initialValues={{
        name: recruiter.name,
        email: recruiter.email,
        role: recruiter.roleValue,
        team: recruiter.team ?? "",
        phone: recruiter.phone ?? "",
        status: recruiter.statusValue,
      }}
    />
  );
}
