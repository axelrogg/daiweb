"use server";

import { auth } from "@/auth";
import material from "@/lib/database/entities/material";

export async function activeLoans(id?: number | undefined | null) {
    let userId = id;
    if (!userId) {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return null;
        }
        userId = Number(session.user.id);
    }

    try {
        const activeLoans = await material.activeLoans(userId);
        return activeLoans;
    } catch (error: any) {
        throw error;
    }
}
