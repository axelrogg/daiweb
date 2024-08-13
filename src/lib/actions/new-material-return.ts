"use server";

import { auth } from "@clerk/nextjs/server";
import material from "../entities/material";

export async function newMaterialReturn(materialId: number) {
    const { userId: externalUserId } = auth();
    if (!externalUserId) {
        console.error("No user id found: userId is");
        console.error(externalUserId);
        return;
    }

    try {
        await material.newReturn(externalUserId, materialId);
        return true;
    } catch (err) {
        throw err;
    }
}
