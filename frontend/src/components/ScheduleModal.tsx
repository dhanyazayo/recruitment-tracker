"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

const STAGES = ["Found", "Initial", "First Round", "Second Round", "HR Round"] as const;

type ScheduleModalProps = {
  candidateId: string;
  candidateName: string;
  onClose: () => void;
};

export function ScheduleModal({ candidateId, candidateName, onClose }: ScheduleModalProps) {
  const [stage, setStage] = useState<string>(STAGES[0]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<{ date?: string; time?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: { date?: string; time?: string } = {};
    if (!date) nextErrors.date = "Date is required";
    if (!time) nextErrors.time = "Time is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const scheduledAt = new Date(`${date}T${time}`).toISOString();

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/interviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId, stage, scheduledAt }),
      });

      if (!response.ok) {
        let message = "Failed to schedule interview";
        try {
          const body = (await response.json()) as { error?: string };
          if (body.error) message = body.error;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      onClose();
      window.alert("Interview scheduled");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Failed to schedule interview");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-900">Schedule Interview</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Candidate Name</label>
            <input
              type="text"
              value={candidateName}
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#F47920]"
            >
              {STAGES.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Interview Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#F47920] ${
                errors.date ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Interview Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                if (errors.time) setErrors((prev) => ({ ...prev, time: undefined }));
              }}
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-[#F47920] ${
                errors.time ? "border-red-300" : "border-gray-200"
              }`}
            />
            {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-[#F47920] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D96510] disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
