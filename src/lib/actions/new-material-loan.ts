"use server";

import { auth } from "@clerk/nextjs/server";
import material from "../entities/material";

export const newMaterialLoan = async (
    reservationId: number,
    userId: number,
    materialName: string
) => {
    const { userId: userResponsableExternalUserId } = auth();
    if (!userResponsableExternalUserId) {
        return null;
    }

    await material.newLoan(
        userId,
        userResponsableExternalUserId,
        reservationId,
        materialName
    );
};
