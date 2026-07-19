import { Router } from "express";

import * as controller from "../controllers/deployment.controller";

import auth from "../middleware/auth.middleware";

import role from "../middleware/role.middleware";

const router = Router();

router.use(auth);

router.get("/", controller.list);

router.get("/:id", controller.get);

router.post("/", controller.create);

router.patch(
    "/:id/approve",
    role("ADMIN"),
    controller.approve
);

router.patch(
    "/:id/reject",
    role("ADMIN"),
    controller.reject
);

router.delete(
    "/:id",
    role("ADMIN"),
    controller.remove
);

export default router;