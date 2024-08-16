"use server";

import user from "@/lib/database/entities/user";


export async function userInfoFromId(id: number) {
    let userExternalId = null;
    try {
        userExternalId = await user.externalIdFromId(id);
    } catch (error: any) {
        console.error(error);
        return null;
    }

    try {
        const userInfo = await user.infoFromId(id);
        return {
            ...userInfo,
            profilePicUrl: userDetails.imageUrl,
            fullName: userDetails.fullName,
        };
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}
