import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { ZayoLogo } from "@/components/ZayoLogo";
import { USER_ROLE_LABELS, type UserRole } from "@/lib/roles";

type HeaderProps = {
  role: UserRole;
};

export function Header({ role }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 h-16 shrink-0 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <ZayoLogo className="h-9 w-9" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-[#1A1C1E]">ZAYO</span>
            <span className="text-base text-gray-600">Recruitment Tracker</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <RoleSwitcher currentRole={role} />
          <button
            type="button"
            aria-label="Settings"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Log out"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <LogOut className="h-5 w-5" />
          </button>

          <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F47920] text-sm font-semibold text-white">
              AM
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold text-[#1A1C1E]">Anand Mohan</span>
              <span className="text-xs text-gray-500">{USER_ROLE_LABELS[role]}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
