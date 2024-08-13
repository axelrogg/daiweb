import sql from "@/lib/database";
import { DbUserInfo, UserInfo } from "@/types/actions";

export class User {
    async new(externalId: string, email: string, isStaff: boolean) {
        const isVerified = isStaff ? true : false;
        try {
            const newUser = await sql`
                insert into users
                    (external_id, email, is_verified, is_staff)
                values
                    (${externalId}, ${email}, ${isVerified}, ${isStaff})
                returning id
            `;
            return newUser;
        } catch (error: any) {
            throw error;
        }
    }

    async delete(userId: number) {
        try {
            await sql`
                delete from users
                where id = ${userId}
            `;
        } catch (error: any) {
            throw error;
        }
    }

    async deleteFromExternalId(externalId: string) {
        try {
            await sql`
                delete from users
                where external_id = ${externalId}
            `;
        } catch (error: any) {
            throw error;
        }
    }

    async idFromExternalId(externalId: string) {
        try {
            const result = await sql<{ id: number }[]>`
                select id
                from users
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
                from users
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
                from users
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

    async infoFromId(id: number) {
        try {
            const info = await sql<DbUserInfo[]>`
                select *
                from users
                where id = ${id}
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

    isStaff(email: string) {
        if (typeof email !== "string") {
            return false;
        }
        const emailParts = email.split("@");
        if (emailParts.length !== 2) {
            return false;
        }
        if (
            emailParts[1] === "dai.uvigo.gal" ||
            emailParts[1] === "dai.uvigo.es"
        ) {
            return true;
        }
        return false;
    }
}

const user = new User();
export default user;
