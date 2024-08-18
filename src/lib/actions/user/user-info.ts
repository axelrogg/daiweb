"use server";

import { auth } from "@/auth";
import user from "@/lib/database/entities/user";

export async function userInfo(id?: number | undefined) {
    let userId = id;
    if (!userId) {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            return null;
        }
        userId = Number(session.user.id);
    }
    try {
        const userInfo = await user.info(userId);
        return userInfo;
    } catch (error: any) {
        throw error;
    }
}
