"use server";

import { auth } from "@clerk/nextjs/server";
import database from "../database";

export const newMaterialLoan = async (
    reservationId: number,
    userId: number,
    material: string
) => {
    const { userId: userResponsableExternalUserId } = auth();
    if (!userResponsableExternalUserId) {
        return null;
    }

    let userResponsableId = null;
    try {
        userResponsableId = await database.getUserIdFromExternalId(
            userResponsableExternalUserId
        );
    } catch (err) {
        throw err;
    }

    console.info(userResponsableId);
    if (!userResponsableId) {
        return;
    }

    await database.insertNewMaterialLoan(userId, userResponsableId, material);
};
