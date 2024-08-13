"use server";

import { currentUser } from "@clerk/nextjs/server";
import user from "@/lib/entities/user";

export async function userInfo() {
    const userDetails = await currentUser();

    if (!userDetails) {
        return null;
    }

    try {
        const userInfo = await user.info(userDetails.id);
        return {
            ...userInfo,
            profilePicUrl: userDetails.imageUrl,
            fullName: userDetails.fullName,
        };
    } catch (error: any) {
        throw error;
    }
}
