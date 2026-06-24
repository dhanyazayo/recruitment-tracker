import { Link } from 'react-router';
import { LogOut, Settings } from 'lucide-react';
import { ZayoLogo } from './ZayoLogo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 shrink-0 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        <Link
          to="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <ZayoLogo className="h-9 w-9" />
          <span className="text-base font-semibold text-gray-900">
            Recruitment Tracker
          </span>
        </Link>

        <div className="flex items-center gap-2">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              AM
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-medium text-gray-900">Anand Mohan</span>
              <span className="text-xs text-gray-500">Recruiter</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
