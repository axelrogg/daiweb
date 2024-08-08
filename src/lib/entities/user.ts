import sql from "@/lib/database";
import { DbUserInfo, UserInfo } from "@/types/actions";

export class User {
    async new(externalId: string, email: string, isStaff: boolean) {
        try {
            const newUser = await sql`
                insert into "user"
                    (external_id, email, is_verified, is_staff)
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
                where external_id = ${externalId}
            `;
            console.log(deleted);
        } catch (error: any) {
            throw error;
        }
    }

    async idFromExternalId(externalId: string) {
        try {
            const result = await sql<{ id: number }[]>`
                select id
                from "user"
                where external_id = ${externalId}
            `;
            return result[0].id as number;
        } catch (error: any) {
            throw error;
        }
    }

    async externalIdFromId(id: number) {
        try {
            const result = await sql<{ external_id: string }[]>`
                select external_id
                from "user"
                where id = ${id}
            `;
            return result[0].external_id;
        } catch (error: any) {
            throw error;
        }
    }

    async info(externalId: string) {
        try {
            const info = await sql<DbUserInfo[]>`
                select *
                from "user"
                where external_id = ${externalId}
            `;

            return {
                id: info[0].id,
                externalId: info[0].external_id,
                email: info[0].email,
                isStaff: info[0].is_staff,
                createdAt: new Date(info[0].created_at),
                lastUpdatedAt: new Date(info[0].last_updated_at),
                isVerified: info[0].is_verified,
            } as UserInfo;
        } catch (error: any) {
            throw error;
        }
    }
}

const user = new User();
export default user;
