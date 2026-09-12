import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { getUserSession } from "@/lib/core/session";


export default async function DashboardLayout({ children }) {
  const user = await getUserSession();
  if (!user) {
    redirect("/signin");
  }
  const userRole = user?.role?.toLowerCase() || "tenant";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0B0F17]">
      <DashboardSidebar currentRole={userRole} />
      
      <main className="flex-1 min-w-0 px-4 pb-10 pt-28 lg:pt-6 lg:p-6 text-white w-full">
        {children}
      </main>
    </div>
  );
}