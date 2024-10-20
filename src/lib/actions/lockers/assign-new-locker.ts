"use server";

import { auth } from "@/auth";
import locker from "@/lib/database/entities/lockers";
import { logger } from "@/lib/logging/logger";

export async function assignNewLocker(
    campus: "cuvi" | "ciudad",
    number: number
) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return null;
    }

    try {
        await locker.assignNewLocker(Number(session.user.id), campus, number);
    } catch (error: any) {
        logger.error(error);
        if (error.code === "23505") {
            // Unique key violation
            // This means that either a user wants to have multiple lockers,
            // which is not allowed, or two users want to have the same locker,
            // which is also not allowed.
            if (error.constraint_name === "user_school_lockers_user_id_key") {
                throw new Error(
                    "One user cannot have multiple lockers assigned to themselves"
                );
            }
            if (error.constraint_name === "user_school_lockers_pkey") {
                throw new Error(
                    "The same locker cannot be assigned to more than one user"
                );
            }
        }
        throw error;
    }
}
