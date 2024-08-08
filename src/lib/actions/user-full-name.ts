"use server";

import { clerkClient } from "../clerk";
import user from "../entities/user";

export async function userFullName(userId: number) {
    let userExternalId = null;
    try {
        userExternalId = await user.externalIdFromId(userId)
    } catch (error: any) {
        console.error(error);
        return null;
    }

    try {
        const userData = await clerkClient.users.getUser(userExternalId);
        return userData.fullName;
    } catch (error: any) {
        console.error(error);
    }
}
