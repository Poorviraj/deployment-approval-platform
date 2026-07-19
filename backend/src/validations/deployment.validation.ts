import { z } from "zod";

export const createDeploymentSchema = z.object({
  serviceName: z.string().min(2),
  version: z.string().min(1),
  environment: z.enum([
    "DEVELOPMENT",
    "STAGING",
    "PRODUCTION"
  ])
});