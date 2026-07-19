import { Request, Response } from "express";
import * as dashboardService from "../services/dashboard.service";

export async function stats(
    req: Request,
    res: Response
) {

    res.json(

        await dashboardService.getDashboardStats()

    );

}