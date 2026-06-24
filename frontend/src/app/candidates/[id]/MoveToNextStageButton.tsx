"use client";

type MoveToNextStageButtonProps = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

export function MoveToNextStageButton({
  onClick,
  loading = false,
  disabled = false,
  className = "",
}: MoveToNextStageButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`whitespace-nowrap rounded-lg bg-[#F47920] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#D96510] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {loading ? "Moving..." : "Move to Next Stage"}
    </button>
  );
}
