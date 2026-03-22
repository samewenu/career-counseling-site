import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Users, Calendar, FileCheck } from "lucide-react";

export default function AdminDashboard({ session, metrics }: any) {
  if (!session?.user) return null;

  const stats = [
    { label: "Total Students", value: metrics?.studentCount || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Upcoming Sessions", value: metrics?.upcomingSessions || 0, icon: Calendar, color: "text-accent-500", bg: "bg-accent-50" },
    { label: "Pending Reviews", value: metrics?.pendingSubmissions || 0, icon: FileCheck, color: "text-emerald-500", bg: "bg-emerald-50" }
  ];

  return (
    <DashboardLayout role="COACH" userName={session.user.name || "Coach"}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-950">Coach Dashboard</h1>
          <p className="text-slate-600 mt-2">Here is a high-level overview of your practice.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map((m, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className={`p-4 rounded-xl ${m.bg}`}>
                <m.icon className={`w-8 h-8 ${m.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{m.label}</p>
                <p className="text-2xl font-bold text-primary-950">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-500">
          Use the sidebar to manage sessions, assignments, and view users.
        </div>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || (session.user as any).role !== "COACH") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const [studentCount, upcomingSessions, pendingSubmissions] = await Promise.all([
    db.user.count({ where: { role: "STUDENT" } }),
    db.session.count({ where: { coachId: (session.user as any).id, status: "BOOKED", date: { gte: new Date() } } }),
    db.submission.count({ where: { status: "PENDING" } })
  ]);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      metrics: { studentCount, upcomingSessions, pendingSubmissions }
    },
  };
};
