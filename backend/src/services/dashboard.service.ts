import prisma from "../config/db";
import { DeploymentStatus, Environment } from "@prisma/client";

export async function getDashboardStats() {

    const totalDeployments =
        await prisma.deployment.count();

    const pending =
        await prisma.deployment.count({

            where: {

                status: DeploymentStatus.PENDING

            }

        });

    const approved =
        await prisma.deployment.count({

            where: {

                status: DeploymentStatus.APPROVED

            }

        });

    const rejected =
        await prisma.deployment.count({

            where: {

                status: DeploymentStatus.REJECTED

            }

        });

    const production =
        await prisma.deployment.count({

            where: {

                environment: Environment.PRODUCTION

            }

        });

    const staging =
        await prisma.deployment.count({

            where: {

                environment: Environment.STAGING

            }

        });

    const development =
        await prisma.deployment.count({

            where: {

                environment: Environment.DEVELOPMENT

            }

        });

    const latestDeployments =
        await prisma.deployment.findMany({

            take: 5,

            include: {

                requestedBy: true

            },

            orderBy: {

                createdAt: "desc"

            }

        });

    return {

        totalDeployments,

        pending,

        approved,

        rejected,

        production,

        staging,

        development,

        latestDeployments

    };

}