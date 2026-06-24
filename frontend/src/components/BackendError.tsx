import { getApiBaseUrl } from "@/lib/api";

export function BackendError({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
      <p className="font-medium">Could not load data from the backend</p>
      <p className="mt-1 text-sm">{message}</p>
      <p className="mt-2 text-sm text-red-700">
        Make sure the API is running at <code>{getApiBaseUrl()}</code>
      </p>
    </div>
  );
}
