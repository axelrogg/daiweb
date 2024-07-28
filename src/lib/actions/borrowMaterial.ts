"use server";

import { auth } from "@clerk/nextjs/server";
import database from "../database";

export const makeMaterialReservationAction = async (material: string) => {
    const { userId: externalUserId } = auth();
    if (!externalUserId) {
        console.error("No user id found: userId is");
        console.error(externalUserId);
        return;
    }

    let userId = null;
    try {
        userId = await database.getUserIdFromExternalId(externalUserId);
    } catch (err) {
        throw err;
    }

    console.info(userId);
    if (!userId) {
        return 0;
    }
    database.createNewMaterialReservation(userId, material);
};
