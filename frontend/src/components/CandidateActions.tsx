"use client";

import Link from "next/link";
import { useState } from "react";
import { ScheduleModal } from "./ScheduleModal";

type CandidateActionsProps = {
  candidateId: string;
  candidateName: string;
};

export function CandidateActions({ candidateId, candidateName }: CandidateActionsProps) {
  const [showSchedule, setShowSchedule] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/candidates/${candidateId}/edit`}
        className="text-sm font-medium text-[#F47920] hover:text-[#D96510]"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={() => setShowSchedule(true)}
        className="text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        Schedule
      </button>
      {showSchedule && (
        <ScheduleModal
          candidateId={candidateId}
          candidateName={candidateName}
          onClose={() => setShowSchedule(false)}
        />
      )}
    </div>
  );
}
