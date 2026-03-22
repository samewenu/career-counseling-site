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
    case "POST":
      const { action, title, description, dueDate, assignmentId, textContent, fileUrl, feedback, submissionId } = req.body;

      if (action === "create" && userRole === "COACH") {
        await db.assignment.create({
          data: {
            title,
            description,
            dueDate: dueDate ? new Date(dueDate) : null,
            coachId: userId
          }
        });
        return res.status(201).json({ message: "Assignment created" });
      }

      if (action === "submit" && userRole === "STUDENT") {
        const existing = await db.submission.findFirst({
          where: { assignmentId, studentId: userId }
        });

        if (existing) {
          if (existing.status === "REVIEWED") return res.status(400).json({ message: "Already reviewed" });
          await db.submission.update({
            where: { id: existing.id },
            data: { textContent, fileUrl, status: "PENDING" }
          });
        } else {
          await db.submission.create({
            data: { assignmentId, studentId: userId, textContent, fileUrl, status: "PENDING" }
          });
        }
        return res.status(200).json({ message: "Submitted" });
      }

      if (action === "review" && userRole === "COACH") {
        await db.submission.update({
          where: { id: submissionId },
          data: { status: "REVIEWED", feedback }
        });
        return res.status(200).json({ message: "Reviewed" });
      }
      break;

    case "DELETE":
      if (userRole !== "COACH") return res.status(403).json({ message: "Forbidden" });
      const { id } = req.query;
      await db.assignment.delete({ where: { id: String(id), coachId: userId } });
      return res.status(200).json({ message: "Deleted" });

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
