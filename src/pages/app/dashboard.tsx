import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function StudentDashboard({ session, upcomingSessions = [], pendingAssignments = [] }: any) {
  if (!session?.user) return null;

  return (
    <DashboardLayout role="STUDENT" userName={session.user.name || "Student"}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-950">Welcome back, {session.user.name || "Student"}!</h1>
          <p className="text-slate-600 mt-2">Here is an overview of your coaching journey.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent-500" />
                Upcoming Sessions
              </h2>
              <Link href="/app/sessions" className="text-sm font-medium text-accent-600 hover:text-accent-500">
                View All
              </Link>
            </div>
            
            {upcomingSessions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 mb-4">No upcoming sessions scheduled.</p>
                <Link href="/app/sessions">
                  <Button variant="outline" size="sm">Book a Session</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingSessions.map((sess: any) => (
                  <div key={sess.id} className="p-4 bg-slate-50 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-primary-950">{new Date(sess.date).toLocaleDateString()}</p>
                      <p className="text-sm text-slate-500">{new Date(sess.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-md">Confirmed</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent-500" />
                Pending Assignments
              </h2>
              <Link href="/app/assignments" className="text-sm font-medium text-accent-600 hover:text-accent-500">
                View All
              </Link>
            </div>
            
            {pendingAssignments.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                You are all caught up!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingAssignments.map((task: any) => (
                  <div key={task.id} className="p-4 border border-slate-100 rounded-lg group hover:border-accent-200 transition-colors">
                    <h3 className="font-semibold text-primary-950 group-hover:text-accent-600 transition-colors">{task.title}</h3>
                    {task.dueDate && (
                      <p className="text-sm text-slate-500 mt-1">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || (session.user as any).role !== "STUDENT") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const [upcomingSessions, pendingAssignments] = await Promise.all([
    db.session.findMany({
      where: { 
        studentId: (session.user as any).id,
        date: { gte: new Date() },
        status: "BOOKED"
      },
      orderBy: { date: "asc" },
      take: 3
    }),
    db.assignment.findMany({
      where: {
        submissions: {
          none: { studentId: (session.user as any).id, status: "REVIEWED" }
        }
      },
      take: 3
    })
  ]);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      upcomingSessions: JSON.parse(JSON.stringify(upcomingSessions)),
      pendingAssignments: JSON.parse(JSON.stringify(pendingAssignments)),
    },
  };
};
