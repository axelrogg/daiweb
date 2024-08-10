"use server";

import { clerkClient } from "../clerk";
import { User } from "@clerk/backend";
import user from "@/lib/entities/user";

export async function useUserInfoFromId(id: number) {
    let userExternalId = null;
    try {
        userExternalId = await user.externalIdFromId(id);
    } catch (error: any) {
        console.error(error);
        return null;
    }

    let userDetails: User;
    try {
        userDetails = await clerkClient.users.getUser(userExternalId);
        if (!userDetails) {
            console.log("USE USER INFO FROM ID: USER DETAILS IS NONE");
            return null;
        }
    } catch (error: any) {
        console.error(error);
        throw error;
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
