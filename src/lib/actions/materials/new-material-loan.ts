"use server";

import material from "@/lib/database/entities/material";


export const newMaterialLoan = async (
    reservationId: number,
    userId: number,
    materialName: string
) => {

    await material.newLoan(
        userId,
        userResponsableExternalUserId,
        reservationId,
        materialName
    );
};
