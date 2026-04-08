import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}