import Link from "next/link";
import { notFound } from "next/navigation";
import { CandidateForm } from "@/components/CandidateForm";
import { BackendError } from "@/components/BackendError";
import { getCandidate } from "@/lib/api";
import { updateCandidateAction } from "../../actions";

type EditCandidatePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCandidatePage({ params }: EditCandidatePageProps) {
  const { id } = await params;

  try {
    const candidate = await getCandidate(id);

    if (!candidate) {
      notFound();
    }

    const updateAction = updateCandidateAction.bind(null, id);

    return (
      <CandidateForm
        title="Edit Candidate"
        submitLabel="Save Changes"
        action={updateAction}
        initialValues={{
          name: candidate.name,
          role: candidate.role,
          stage: candidate.currentStage,
        }}
      />
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Edit Candidate</h1>
        <BackendError message={message} />
        <Link href="/candidates" className="text-sm text-gray-600 hover:text-gray-900">
          Back to candidates
        </Link>
      </div>
    );
  }
}
