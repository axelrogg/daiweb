"use server";

import { auth } from "@/auth";
import locker from "@/lib/database/entities/lockers";

export async function userLockerAction() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return null;
    }

    try {
        return await locker.userLocker(Number(session.user.id));
    } catch (error: any) {
        throw error;
    }
}
