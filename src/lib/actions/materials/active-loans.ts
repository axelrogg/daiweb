"use server";

import material from "@/lib/database/entities/material";


export async function activeLoans() {

    if (!externalUserId) return null;

    try {
        const activeLoans = await material.activeLoans(externalUserId);
        return activeLoans;
    } catch (error: any) {
        throw error;
    }
}

export async function extUserActiveLoans(userId: number) {
    try {
        const loans = await material.activeLoansFromUserId(userId);
        return loans;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
