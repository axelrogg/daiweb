"use server";

import { auth } from "@clerk/nextjs/server";
import database from "../database";

export async function getMaterialBorrowings() {
    const { userId: userExternalId } = auth();

    if (!userExternalId) {
        return null;
    }

    const borrowings =
        await database.getMaterialBorrowingsByUserExternalId(userExternalId);
    if (!borrowings) {
        return null;
    }
    return borrowings;
}
