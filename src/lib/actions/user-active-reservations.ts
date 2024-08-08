"use server";

import { MaterialReservations } from "@/types/actions";
import material from "../entities/material";
import { auth } from "@clerk/nextjs/server";

export async function userActiveReservations(): Promise<MaterialReservations | null> {
    const { userId: externalUserId } = auth();
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
