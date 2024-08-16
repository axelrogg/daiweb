"use server";

import { auth } from "@/auth";
import user from "@/lib/database/entities/user";


export async function userInfo() {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
        return null;
    }

    try {
        const userInfo = await user.info(session.user.id);
        return userInfo
    } catch (error: any) {
        throw error;
    }
}
