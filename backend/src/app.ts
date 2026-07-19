import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes";
import errorMiddleware from "./middleware/error.middleware";
import notFound from "./middleware/notFound.middleware";
import { register } from "./metrics/metrics";

import authRoutes from "./routes/auth.routes";
import deploymentRoutes from "./routes/deployment.routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", healthRoutes);

app.use("/api/auth", authRoutes);
app.use(
    "/api/deployments",
    deploymentRoutes
);

app.get("/metrics", async (_, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.use(notFound);

app.use(errorMiddleware);

export default app;