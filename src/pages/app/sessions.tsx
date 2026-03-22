import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { GetServerSideProps } from "next";
import { db } from "@/lib/db";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import StudentSessionsClient from "@/components/dashboard/features/StudentSessionsClient";

export default function StudentSessionsPage({ session, bookedSessions, availableSlots }: any) {
  if (!session?.user) return null;
  return (
    <DashboardLayout role="STUDENT" userName={session.user.name || "Student"}>
      <StudentSessionsClient bookedSessions={bookedSessions} availableSlots={availableSlots} />
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || (session.user as any).role !== "STUDENT") {
    return { redirect: { destination: "/login", permanent: false } };
  }

  const [bookedSessions, availableSlots] = await Promise.all([
    db.session.findMany({
      where: { studentId: (session.user as any).id, status: "BOOKED" },
      include: { coach: true },
      orderBy: { date: "asc" }
    }),
    db.session.findMany({
      where: { status: "OPEN", date: { gte: new Date() } },
      orderBy: { date: "asc" }
    })
  ]);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      bookedSessions: JSON.parse(JSON.stringify(bookedSessions)),
      availableSlots: JSON.parse(JSON.stringify(availableSlots))
    }
  };
};
