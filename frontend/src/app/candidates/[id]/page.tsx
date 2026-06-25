import { notFound } from "next/navigation";
import { BackendError } from "@/components/BackendError";
import { CandidateProfile } from "@/components/CandidateProfile";
import { getCandidate, ApiError } from "@/lib/api";

type CandidateProfilePageProps = {
  params: Promise<{ id: string }>;
};

export default async function CandidateProfilePage({ params }: CandidateProfilePageProps) {
  const { id } = await params;

  try {
    const candidate = await getCandidate(id);
    if (!candidate) {
      notFound();
    }

    return <CandidateProfile candidate={candidate} />;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Candidate Profile</h1>
        <BackendError message={message} />
      </div>
    );
  }
}
