"use server";

import { auth } from "@/auth";
import material from "@/lib/database/entities/material";

export const newMaterialLoan = async (
    reservationId: number,
    userId: number,
    materialName: string
) => {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return null;
    }

    await material.newLoan(
        userId,
        Number(session.user.id),
        reservationId,
        materialName
    );
};
