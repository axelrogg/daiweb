"use server";

import material from "@/lib/database/entities/material";


export async function newMaterialReturn(materialId: number) {
    try {
        await material.newReturn(externalUserId, materialId);
        return true;
    } catch (err) {
        throw err;
    }
}
