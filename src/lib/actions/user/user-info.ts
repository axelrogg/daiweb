"use server";

import { auth } from "@/auth";
import user from "@/lib/database/entities/user";
import { logger } from "@/lib/logging/logger";

const log = logger.child({ module: "/lib/actions/user/user-info" });

export async function userInfo(id?: number | undefined) {
    let userId = id;
    if (!userId) {
        const session = await auth();
        if (!session || !session.user || !session.user.id) {
            log.warn(
                {
                    session: session,
                },
                "No active session was found. No user information can be fetched"
            )
            return null;
        }
        userId = Number(session.user.id);
        log.debug(
            {
                session: session,
                userId: userId,
            },
            "User ID found from session object"
        )
    }

    try {
        const userInfo = await user.info(userId);
        log.debug(
            {
                userInfo: userInfo
            },
            "User info found from user id"
        )
        return userInfo;
    } catch (error: any) {
        log.error(
            {
                userId: userId,
                error: error.message,
                stack: error.stack,
            },
            "Error occurred while fetching user info"
        )
        return null
    }
}
