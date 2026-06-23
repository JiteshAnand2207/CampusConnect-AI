import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import solutionRoutes from "./routes/solution.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/uploads", uploadRoutes);

app.use(errorMiddleware);

export default app;