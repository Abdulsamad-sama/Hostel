import express from "express";
import cors from "cors";
import "dotenv/config";
import { apiRouter } from "@/server/routes";
import { errorHandler } from "@/server/middlewares/error-handler.middleware";

const app = express();

// --- Global Middleware ---
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Health Check ---
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// --- API Routes ---
app.use("/api", apiRouter);

// --- Centralized Error Handler (must be last) ---
app.use(errorHandler);

export default app;
