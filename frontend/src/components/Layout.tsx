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
      <Sidebar showRecruiters={showRecruiters} />
      <main className="ml-[250px] min-h-[calc(100vh-4rem)] overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
