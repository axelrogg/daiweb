"use server";

import material from "@/lib/database/entities/material";
import { MaterialReservations } from "@/types/actions";

export async function activeReservations(): Promise<MaterialReservations | null> {
    if (!externalUserId) {
        console.error("No user id found: userId is");
        console.error(externalUserId);
        return null;
    }

    try {
        const reservations = await material.activeReservations(externalUserId);
        return reservations;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export async function extUserActiveReservations(userId: number) {
    try {
        const reservations =
            await material.activeReservationsFromUserId(userId);
        return reservations;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
