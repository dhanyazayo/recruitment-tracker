import { notFound, redirect } from "next/navigation";
import { AssignCandidatesForm } from "@/components/AssignCandidatesForm";
import { getCandidates, getRecruiter } from "@/lib/api";
import { canManageRecruiters } from "@/lib/roles";
import { getUserRole } from "@/lib/session";
import { assignCandidatesAction } from "@/app/recruiters/actions";

export default async function AssignCandidatesPage({
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

  if (recruiter.statusValue === "INACTIVE") {
    redirect(`/recruiters/${id}`);
  }

  const candidates = await getCandidates();
  const assignedIds = new Set(
    candidates.filter((c) => c.recruiterId === id).map((c) => c.id),
  );

  const boundAction = assignCandidatesAction.bind(null, id);

  return (
    <AssignCandidatesForm
      recruiterId={id}
      recruiterName={recruiter.name}
      candidates={candidates}
      assignedIds={assignedIds}
      action={boundAction}
    />
  );
}
