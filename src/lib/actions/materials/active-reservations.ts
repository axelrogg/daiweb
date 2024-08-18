"use server";

import { auth } from "@/auth";
import material from "@/lib/database/entities/material";
import { MaterialReservations } from "@/types/actions";

export async function activeReservations(
    id?: number | undefined | null
): Promise<MaterialReservations | null> {
    let userId = id;
    if (!userId) {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return null;
        }
        userId = Number(session.user.id);
    }

    try {
        const reservations = await material.activeReservations(userId);
        return reservations;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
