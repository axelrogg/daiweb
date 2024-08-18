"use server";

import { auth } from "@/auth";
import material from "@/lib/database/entities/material";

export async function newMaterialReturn(materialId: number) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return null;
    }

    try {
        await material.newReturn(Number(session.user.id), materialId);
        return true;
    } catch (err) {
        throw err;
    }
}
