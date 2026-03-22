import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import AdminAssignmentsClient from "@/components/dashboard/features/AdminAssignmentsClient";

export default function AdminAssignmentsPage({ session, assignments }: any) {
  if (!session?.user) return null;
  return (
    <DashboardLayout role="COACH" userName={session.user.name || "Coach"}>
      <AdminAssignmentsClient assignments={assignments} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || (session.user as any).role !== "COACH") {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const assignments = await db.assignment.findMany({
    where: { coachId: (session.user as any).id },
    orderBy: { createdAt: "desc" },
    include: { 
      submissions: {
        include: { student: true }
      } 
    }
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      assignments: JSON.parse(JSON.stringify(assignments))
    }
  };
};
