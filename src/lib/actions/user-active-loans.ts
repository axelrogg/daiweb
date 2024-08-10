"use server";

import { auth } from "@clerk/nextjs/server";
import material from "@/lib/entities/material";

export async function userActiveLoans() {
    const { userId: externalUserId } = auth();

    if (!externalUserId) return null;

    try {
        const activeLoans = await material.activeLoans(externalUserId);
        return activeLoans;
    } catch (error: any) {
        throw error;
    }
}
