"use server";

import { auth } from "@clerk/nextjs/server";
import material from "@/lib/entities/material";

export async function userActiveLoansCount() {
    const { userId: externalUserId } = auth();

    if (!externalUserId) return null;

    try {
        return await material.activeLoansCount(externalUserId);
    } catch (error: any) {
        throw error;
    }
}
