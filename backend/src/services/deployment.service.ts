import prisma from "../config/db";
import {
    DeploymentStatus,
    Environment
} from "@prisma/client";

export async function createDeployment(
    serviceName: string,
    version: string,
    environment: Environment,
    requestedById: string
) {

    const deployment =
        await prisma.deployment.create({

            data: {

                serviceName,

                version,

                environment,

                requestedById
            }

        });

    await prisma.deploymentHistory.create({

        data: {

            deploymentId: deployment.id,

            action: "Deployment Request Created"

        }

    });

    return deployment;

}

export async function getDeployments() {

    return prisma.deployment.findMany({

        include: {

            requestedBy: true,

            approvedBy: true

        },

        orderBy: {

            createdAt: "desc"

        }

    });

}

export async function getDeployment(id: string) {

    return prisma.deployment.findUnique({

        where: {

            id

        },

        include: {

            history: true,

            requestedBy: true,

            approvedBy: true

        }

    });

}

export async function approveDeployment(
    id: string,
    approvedById: string
) {

    const deployment =
        await prisma.deployment.update({

            where: {

                id

            },

            data: {

                status: DeploymentStatus.APPROVED,

                approvedById

            }

        });

    await prisma.deploymentHistory.create({

        data: {

            deploymentId: id,

            action: "Deployment Approved"

        }

    });

    return deployment;

}

export async function rejectDeployment(
    id: string,
    approvedById: string
) {

    const deployment =
        await prisma.deployment.update({

            where: {

                id

            },

            data: {

                status: DeploymentStatus.REJECTED,

                approvedById

            }

        });

    await prisma.deploymentHistory.create({

        data: {

            deploymentId: id,

            action: "Deployment Rejected"

        }

    });

    return deployment;

}

export async function deleteDeployment(id: string) {

    return prisma.deployment.delete({

        where: {

            id

        }

    });

}