"use server";

import material from "@/lib/database/entities/material";

export async function newMaterialReservation(materialName: string) {
    try {
        await material.newReservation(externalUserId, materialName);
        return true;
    } catch (err) {
        throw err;
    }
}
