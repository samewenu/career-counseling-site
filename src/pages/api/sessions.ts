import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const { method } = req;
  const userRole = (session.user as any).role;
  const userId = (session.user as any).id;

  switch (method) {
    case "POST": // Create session slot (Coach) or Book slot (Student)
      const { action, date, time, sessionId } = req.body;
      
      if (action === "create" && userRole === "COACH") {
        const sessionDate = new Date(`${date}T${time}`);
        await db.session.create({
          data: {
            date: sessionDate,
            coachId: userId,
            status: "OPEN"
          }
        });
        return res.status(201).json({ message: "Slot created" });
      }

      if (action === "book" && userRole === "STUDENT") {
        const target = await db.session.findUnique({ where: { id: sessionId } });
        if (!target || target.status !== "OPEN") return res.status(400).json({ message: "Slot unavailable" });
        
        await db.session.update({
          where: { id: sessionId },
          data: {
            studentId: userId,
            status: "BOOKED"
          }
        });
        return res.status(200).json({ message: "Session booked" });
      }
      break;

    case "DELETE": // Delete slot (Coach)
      if (userRole !== "COACH") return res.status(403).json({ message: "Forbidden" });
      const { id } = req.query;
      await db.session.delete({ where: { id: String(id), coachId: userId } });
      return res.status(200).json({ message: "Slot deleted" });

    case "PUT": // Cancel booking (Both)
      const { sessId } = req.body;
      const targetSess = await db.session.findUnique({ where: { id: sessId } });
      if (!targetSess) return res.status(404).json({ message: "Not found" });

      if (userRole === "COACH" || (userRole === "STUDENT" && targetSess.studentId === userId)) {
        await db.session.update({
          where: { id: sessId },
          data: {
            studentId: null,
            status: "OPEN"
          }
        });
        return res.status(200).json({ message: "Booking cancelled" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
