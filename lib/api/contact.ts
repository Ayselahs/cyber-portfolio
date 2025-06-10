import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "express-rate-limit";
import { escape } from "validator";
import  from "../../lib/mongodb";
import { error } from "console";

// Rate limiter
const limiter = rateLimit({
  windowMs: 60_000,
  max: 5,
  handler: (_req, res) => {
    res
      .status(429)
      .json({ error: "Too many requests. Try again in a minute." });
  },
});

async function runRateLimiter(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve, reject) => {
    limiter(req, res, (err: any) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// Apply Rate Limiting
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await runRateLimiter(req, res);
  } catch {
    return;
  }

  const { name, email, topic, message, captchaToken } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof topic !== "string" ||
    typeof message !== "string" ||
    typeof captchaToken !== "string"
  ) {
    return res.status(400).json({ error: "Invalid request parameters. " });
  }

  // Verify CAPTCHA
  const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
  if (!RECAPTCHA_SECRET) {
    console.error("Missing RECAPTCHA_SECRET_KEY");
    return res.status(500).json({ error: "Server Misconfiguration" });
  }

  try {
    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: RECAPTCHA_SECRET,
          response: captchaToken,
          remoteip: req.socket.remoteAddress || "",
        }),
      }
    );

    const captchaJson = await captchaRes.json();
    if (
      !captchaJson.success ||
      typeof captchaJson.score !== "number" ||
      captchaJson.score < 0.5
    ) {
      return res.status(400).json({ error: "CAPTCHA verification failed." });
    }
  } catch (err) {
    console.error("CAPTCHA verification error:", err);
    return res.status(500).json({ error: "CAPTCHA verification error." });
  }

  // Sanitiza Inputs
  const safeName = escape(name.trim());
  const safeEmail = escape(email.trim().toLowerCase());
  const safeTopic = escape(topic.trim());
  const safeMessage = escape(message.trim());

  // MongoDB
  try {
    const db = await getDatabase();
    const collection = db.collection("contacts");

    const document = {
      name: safeName,
      email: safeEmail,
      topic: safeTopic,
      message: safeMessage,
      submittedAt: new Date(),
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    };

    const result = await collection.insertOne(document);
    if (!result.acknowledged) {
      throw new Error("MongoDB insert was not acknowledged");
    }
  } catch (err) {
    console.error("MongoDB insertion error:", err);
    return res.status(500).json({ error: "Failed to save contact form." });
  }

  return res.status(200).json({ success: true });
}