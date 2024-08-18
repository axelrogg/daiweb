"use server";

import { auth } from "@/auth";
import material from "@/lib/database/entities/material";

export async function newMaterialReservation(materialName: string) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return null;
    }

    try {
        await material.newReservation(Number(session.user.id), materialName);
        return true;
    } catch (err) {
        throw err;
    }
}
