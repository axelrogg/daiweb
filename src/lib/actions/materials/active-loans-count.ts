"use server";

import { auth } from "@/auth";
import material from "@/lib/database/entities/material";

export async function activeLoansCount() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return null;
    }
    console.log(session.user.id);

    try {
        return await material.activeLoansCount(session.user.id);
    } catch (error: any) {
        throw error;
    }
}
