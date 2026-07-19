import { Router } from "express";

import * as controller from "../controllers/dashboard.controller";

import auth from "../middleware/auth.middleware";

const router = Router();

router.use(auth);

router.get(
    "/stats",
    controller.stats
);

export default router;