import sql from "./database";

export class User {
    async new(externalId: string, email: string, isStaff: boolean) {
        try {
            const newUser = await sql`
                insert into "user"
                    (clerk_user_id, email, is_verified, is_staff)
                values
                    (${externalId}, ${email}, false, false)
                returning id
            `;
            console.log("here comes santa clause");
            console.log(newUser);
            return newUser;
        } catch (error: any) {
            throw error;
        }
    }

    async delete(userId: number) {
        try {
            const deleted = await sql`
                delete from "user"
                where id = ${userId}
            `;
            console.log(deleted);
        } catch (error: any) {
            throw error;
        }
    }

    async deleteFromExternalId(externalId: string) {
        try {
            const deleted = await sql`
                delete from "user"
                where clerk_user_id = ${externalId}
            `;
            console.log(deleted);
        } catch (error: any) {
            throw error;
        }
    }

    async idFromExternalId(externalId: string) {
        try {
            const userId = await sql<{ id: number }[]>`
            select id
            from "user"
            where clerk_user_id = ${externalId}
        `;

            if (userId.length != 1) {
                console.error("wwoooooooooooooooooo");
                return null;
            }
            return userId[0].id;
        } catch (error: any) {
            throw error;
        }
    }

    //async externalIdFromUserId(userId: number) {
    //    const { data, statusText, error, status } = await this.db
    //        .from("user")
    //        .select("clerk_user_id")
    //        .eq("id", userId);

    //    if (status !== 200 || statusText !== "OK") {
    //        console.error(error);
    //        throw new Error(JSON.stringify(error, null, 4));
    //    }

    //    if (!data || data.length === 0) {
    //        console.error(`No data associated to user with user id: ${userId}`);
    //        return null;
    //    }
    //    return data[0].clerk_user_id;
    //}
}

const user = new User();
export default user;
