import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { canViewRecruiters } from "@/lib/roles";
import { getUserRole } from "@/lib/session";

type LayoutProps = {
  children: ReactNode;
};

export async function Layout({ children }: LayoutProps) {
  const role = await getUserRole();
  const showRecruiters = canViewRecruiters(role);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header role={role} />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:block">
        <Sidebar showRecruiters={showRecruiters} />
        <main className="min-h-[calc(100vh-4rem)] flex-1 overflow-y-auto p-4 sm:p-6 lg:ml-[250px]">
          {children}
        </main>
      </div>
    </div>
  );
}
