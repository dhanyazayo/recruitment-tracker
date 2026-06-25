import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BackendError } from "@/components/BackendError";
import { RecruiterDeactivateButton } from "@/components/RecruiterDeactivateButton";
import { getRecruiter } from "@/lib/api";
import { canManageRecruiters, canViewRecruiters } from "@/lib/roles";
import { getUserRole } from "@/lib/session";
import { getStageLabel } from "@/lib/stages";

function formatPercent(value: number | null) {
  if (value === null) {
    return "—";
  }
  return `${value}%`;
}

export default async function RecruiterProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = await getUserRole();

  if (!canViewRecruiters(role)) {
    redirect("/");
  }

  const canManage = canManageRecruiters(role);

  try {
    const recruiter = await getRecruiter(id);
    if (!recruiter) {
      notFound();
    }

    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">{recruiter.name}</h1>
            <p className="mt-1 text-sm text-gray-600">
              <Link href="/recruiters" className="text-gray-500 hover:text-gray-700">
                Recruiters
              </Link>
              <span className="mx-2">/</span>
              <span>Profile</span>
            </p>
          </div>
          {canManage ? (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link
                href={`/recruiters/${recruiter.id}/edit`}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
              >
                Edit
              </Link>
              {recruiter.statusValue === "ACTIVE" ? (
                <Link
                  href={`/recruiters/${recruiter.id}/assign`}
                  className="w-full rounded-md bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800 sm:w-auto"
                >
                  Assign Candidates
                </Link>
              ) : null}
            </div>
          ) : null}
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold">Profile</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Email</dt>
                <dd className="font-medium">{recruiter.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Role</dt>
                <dd className="font-medium">{recruiter.role}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Team</dt>
                <dd className="font-medium">{recruiter.team ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Phone</dt>
                <dd className="font-medium">{recruiter.phone ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Status</dt>
                <dd className="font-medium">{recruiter.status}</dd>
              </div>
            </dl>
            {canManage ? (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <RecruiterDeactivateButton
                  recruiterId={recruiter.id}
                  recruiterName={recruiter.name}
                  isInactive={recruiter.statusValue === "INACTIVE"}
                />
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold">Performance</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Active Candidates</dt>
                <dd className="font-medium">{recruiter.activeCandidates}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Selected Count</dt>
                <dd className="font-medium">{recruiter.selectedCount}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Conversion Rate</dt>
                <dd className="font-medium">{formatPercent(recruiter.conversionRate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">SLA Compliance</dt>
                <dd className="font-medium">{formatPercent(recruiter.slaCompliancePercent)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-gray-500">
              Metrics are derived from assigned candidate records and stage history.
            </p>
          </div>
        </div>

        <section className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold">Assigned Candidates</h2>
          {recruiter.candidates.length === 0 ? (
            <p className="text-sm text-gray-500">No candidates assigned yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Role</th>
                    <th className="pb-2 font-medium">Stage</th>
                    {canManage ? <th className="pb-2 font-medium">Actions</th> : null}
                  </tr>
                </thead>
                <tbody>
                  {recruiter.candidates.map((candidate) => (
                    <tr key={candidate.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-2 font-medium">{candidate.name}</td>
                      <td className="py-2">{candidate.role}</td>
                      <td className="py-2">
                        {getStageLabel(candidate.currentStage) ?? candidate.currentStage}
                      </td>
                      {canManage ? (
                        <td className="py-2">
                          <Link
                            href={`/candidates/${candidate.id}/edit`}
                            className="font-medium text-gray-700 hover:text-gray-900"
                          >
                            View Candidate
                          </Link>
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return (
      <div className="mx-auto max-w-7xl space-y-4 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold sm:text-2xl">Recruiter Profile</h1>
        <BackendError message={message} />
      </div>
    );
  }
}
