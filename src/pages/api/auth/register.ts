import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API: /api/auth/register hit with method:", req.method);
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password, name, role } = req.body;
    console.log("API: Registering email:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let existingUser;
    try {
      existingUser = await db.user.findUnique({ where: { email } });
    } catch (dbError) {
      console.error("API: DB lookup failed:", dbError);
      return res.status(500).json({ message: "Database connection failed during lookup" });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log("API: Password hashed");
    } catch (hashError) {
      console.error("API: Password hashing failed:", hashError);
      return res.status(500).json({ message: "Security module error" });
    }

    try {
      const user = await db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role: role === "COACH" ? "COACH" : "STUDENT"
        }
      });
      console.log("API: User created in DB:", user.id);
      return res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (createError) {
      console.error("API: User creation failed:", createError);
      return res.status(500).json({ message: "Database update failed" });
    }
  } catch (error) {
    console.error("API: Unexpected error:", error);
    return res.status(500).json({ message: "Unexpected server error" });
  }
}
