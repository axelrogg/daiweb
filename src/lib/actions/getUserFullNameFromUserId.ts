"use server";

import { clerkClient } from "../clerk";
import database from "../database";

export async function getUserFullNameFromUserId(userId: number) {
    let userExternalId = null;
    try {
        userExternalId = await database.getExternalIdFromUserId(userId);
    } catch (error: any) {
        console.error(error);
        return null;
    }

    if (userExternalId == null) {
        return null;
    }

    try {
        const userData = await clerkClient.users.getUser(userExternalId);
        return userData.fullName;
    } catch (error: any) {
        console.error(error);
    }
}
