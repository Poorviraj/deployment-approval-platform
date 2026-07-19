import { Request, Response } from "express";
import * as deploymentService from "../services/deployment.service";
import { AuthRequest } from "../middleware/auth.middleware";

export async function create(req: Request, res: Response) {
    // Cast req to AuthRequest inline so TypeScript knows req.user exists
    const authReq = req as AuthRequest; 

    const deployment = await deploymentService.createDeployment(
        req.body.serviceName,
        req.body.version,
        req.body.environment,
        authReq.user.id // Use the casted request here
    );

    res.status(201).json(deployment);
}

export async function list(req: Request, res: Response) {
    res.json(await deploymentService.getDeployments());
}

export async function get(req: Request, res: Response) {
    res.json(await deploymentService.getDeployment(req.params.id as string));
}

export async function approve(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    res.json(await deploymentService.approveDeployment(req.params.id as string, authReq.user.id));
}

export async function reject(req: Request, res: Response) {
    const authReq = req as AuthRequest;
    res.json(await deploymentService.rejectDeployment(req.params.id as string, authReq.user.id));
}

export async function remove(req: Request, res: Response) {
    await deploymentService.deleteDeployment(req.params.id as string);
    res.sendStatus(204);
}
