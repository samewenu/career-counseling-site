import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import StudentAssignmentsClient from "@/components/dashboard/features/StudentAssignmentsClient";

export default function StudentAssignmentsPage({ session, assignments }: any) {
  if (!session?.user) return null;
  return (
    <DashboardLayout role="STUDENT" userName={session.user.name || "Student"}>
      <StudentAssignmentsClient assignments={assignments} studentId={(session.user as any).id} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || (session.user as any).role !== "STUDENT") {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const assignments = await db.assignment.findMany({
    orderBy: { createdAt: "desc" },
    include: { 
      submissions: {
        where: { studentId: (session.user as any).id }
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
