import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="ml-[250px] min-h-[calc(100vh-4rem)] overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
