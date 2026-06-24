import { CandidateForm } from "@/components/CandidateForm";
import { getRecruiters } from "@/lib/api";
import { createCandidateAction } from "../actions";

export default async function NewCandidatePage() {
  const recruiters = await getRecruiters();
  const activeRecruiters = recruiters.filter((r) => r.statusValue === "ACTIVE");

  return (
    <CandidateForm
      title="Add Candidate"
      submitLabel="Create Candidate"
      action={createCandidateAction}
      recruiters={activeRecruiters}
    />
  );
}
