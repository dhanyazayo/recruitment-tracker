"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  BarChart3,
  ChevronRight,
  GitBranch,
  LayoutDashboard,
  User,
  UserCog,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: (pathname: string) => boolean;
  hidden?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

function isCandidateProfile(pathname: string) {
  return (
    /^\/candidates\/[^/]+$/.test(pathname) &&
    !pathname.endsWith("/new") &&
    !pathname.endsWith("/edit")
  );
}

function buildSections(showRecruiters: boolean): NavSection[] {
  return [
    {
      title: "Main Pages",
      items: [
        {
          href: "/",
          label: "Overview",
          icon: LayoutDashboard,
          isActive: (pathname) => pathname === "/",
        },
        {
          href: "/candidates",
          label: "Candidate Details",
          icon: User,
          isActive: isCandidateProfile,
        },
        {
          href: "/workflow-analytics",
          label: "Workflow Analytics",
          icon: GitBranch,
        },
        {
          href: "/candidates",
          label: "All Candidates",
          icon: Users,
          isActive: (pathname) =>
            pathname === "/candidates" ||
            pathname === "/candidates/new" ||
            pathname.endsWith("/edit"),
        },
      ],
    },
    {
      title: "Reports & Details",
      items: [
        {
          href: "/sla-breakdown",
          label: "SLA Breakdown",
          icon: AlertCircle,
        },
        {
          href: "/executive-reports",
          label: "Executive Reports",
          icon: BarChart3,
        },
        {
          href: "/recruiters",
          label: "Recruiters",
          icon: UserCog,
          hidden: !showRecruiters,
        },
      ],
    },
  ];
}

type SidebarProps = {
  showRecruiters: boolean;
};

export function Sidebar({ showRecruiters }: SidebarProps) {
  const pathname = usePathname();
  const sections = buildSections(showRecruiters);

  const isActive = (item: NavItem) => {
    if (item.isActive) {
      return item.isActive(pathname);
    }
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  const getHref = (item: NavItem) => {
    if (item.label === "Candidate Details" && isCandidateProfile(pathname)) {
      return pathname;
    }
    return item.href;
  };

  return (
    <aside className="w-full shrink-0 border-b border-gray-200 bg-[#F8F9FA] lg:fixed lg:bottom-0 lg:left-0 lg:top-16 lg:z-40 lg:w-[250px] lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <nav className="flex gap-1 overflow-x-auto p-2 sm:p-4 lg:block lg:space-y-6 lg:overflow-visible">
        {sections.map((section) => (
          <div key={section.title} className="shrink-0 lg:shrink">
            <p className="mb-2 hidden px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400 lg:block">
              {section.title}
            </p>
            <div className="flex gap-1 lg:block lg:space-y-1">
              {section.items
                .filter((item) => !item.hidden)
                .map((item) => {
                  const active = isActive(item);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={`${section.title}-${item.label}`}
                      href={getHref(item)}
                      className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors sm:gap-3 sm:py-2.5 lg:shrink ${
                        active
                          ? "bg-[#FEF3E8] text-[#F47920]"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 ${
                          active ? "text-[#F47920]" : "text-gray-400"
                        }`}
                      />
                      <span className="whitespace-nowrap lg:flex-1">{item.label}</span>
                      {active ? (
                        <ChevronRight className="hidden h-4 w-4 shrink-0 text-[#F47920] lg:block" />
                      ) : null}
                    </Link>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
