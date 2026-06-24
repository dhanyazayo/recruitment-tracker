import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  GitBranch,
  AlertCircle,
  BarChart3,
  UserCog,
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/candidate-visibility', label: 'Candidates', icon: Users },
  { path: '/visual-pipeline', label: 'Workflow Analytics', icon: GitBranch },
  { path: '/sla-breakdown', label: 'SLA Breakdown', icon: AlertCircle },
  { path: '/executive-dashboard', label: 'Executive Reports', icon: BarChart3 },
  { path: '/recruiters', label: 'Recruiters', icon: UserCog },
];

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside
      className="fixed bottom-0 left-0 top-16 z-40 w-[250px] overflow-y-auto border-r border-gray-200 bg-white"
    >
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'border-l-4 border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-l-4 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`h-5 w-5 shrink-0 ${active ? 'text-blue-600' : 'text-gray-400'}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
