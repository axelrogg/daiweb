"use server";

import { auth } from "@clerk/nextjs/server";
import material from "../entities/material";

export async function newMaterialReservation(materialName: string) {
    const { userId: externalUserId } = auth();
    if (!externalUserId) {
        console.error("No user id found: userId is");
        console.error(externalUserId);
        return;
    }

    try {
        await material.newReservation(
            externalUserId,
            materialName
        );
        return true;
    } catch (err) {
        throw err;
    }
}
