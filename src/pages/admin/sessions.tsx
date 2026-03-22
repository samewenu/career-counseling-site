import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import AdminSessionsClient from "@/components/dashboard/features/AdminSessionsClient";

export default function AdminSessionsPage({ session, sessions }: any) {
  if (!session?.user) return null;
  return (
    <DashboardLayout role="COACH" userName={session.user.name || "Coach"}>
      <AdminSessionsClient sessions={sessions} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || (session.user as any).role !== "COACH") {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const sessions = await db.session.findMany({
    where: { coachId: (session.user as any).id },
    include: { student: true },
    orderBy: { date: "desc" }
  });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      sessions: JSON.parse(JSON.stringify(sessions))
    }
  };
};
