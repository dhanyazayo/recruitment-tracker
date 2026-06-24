import { STAGE_OPTIONS } from "@/lib/stages";

type PipelineProgressProps = {
  currentStage: string;
};

const PIPELINE_STAGES = STAGE_OPTIONS.filter((stage) => stage.value !== "REJECTED");

export function PipelineProgress({ currentStage }: PipelineProgressProps) {
  const currentIndex = PIPELINE_STAGES.findIndex((stage) => stage.value === currentStage);

  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-center gap-1">
        {PIPELINE_STAGES.map((stage, index) => {
          const isActive = stage.value === currentStage;
          const isComplete = currentIndex > index;
          const isUpcoming = currentIndex >= 0 && index > currentIndex;

          return (
            <div key={stage.value} className="flex items-center gap-1">
              {index > 0 ? (
                <div
                  className={`h-0.5 w-3 sm:w-4 ${
                    isComplete || isActive ? "bg-[#F47920]" : "bg-gray-200"
                  }`}
                />
              ) : null}
              <span
                className={`whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ${
                  isActive
                    ? "bg-[#F47920] text-white"
                    : isComplete
                      ? "bg-[#FEF3E8] text-[#B85A10]"
                      : isUpcoming
                        ? "bg-gray-100 text-gray-500"
                        : "bg-gray-100 text-gray-400"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
