import sql from "@/lib/database/psql";
import { UserInfo } from "@/types/actions";

export class User {

    async accountId(externalId: string) {
        try {
            const user = await sql<{ id: number }[]>`
                select id
                from user_accounts
                where
                    provider = 'google' and
                    provider_user_id = ${externalId}
            `;
            if (user.length === 0) {
                return null;
            }
            return user[0].id;
        } catch (error: any) {
            console.error(error);
            throw error;
        }
    }

    async new(
        externalId: string,
        email: string,
        isStaff: boolean,
        name?: string | null | undefined,
        pictureUri?: string | null | undefined
    ) {
        try {
            const result = await sql.begin(async (sql) => {
                const userId = await sql`
                    insert into user_accounts
                        (provider, provider_user_id)
                    values
                        ('google', ${externalId})
                    returning id
                    `;
                await sql`
                    insert into user_profiles
                        (id, email, is_verified, is_staff, name, picture_uri)
                    values (
                        ${userId[0].id},
                        ${email},
                        false,
                        ${isStaff},
                        ${name ? name : ""},
                        ${pictureUri ? pictureUri : ""}
                    )
                    `;
                return userId[0].id;
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    async verify(userId: number) {
        try {
            await sql`
                update user_profiles
                set is_verified = true
                where id = ${userId}
            `;
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

    async info(id: number) {
        try {
            const profile = await sql<
                {
                    id: number;
                    email: string;
                    name: string;
                    is_verified: boolean;
                    is_staff: boolean;
                    picture_uri: string;
                    created_at: Date;
                    last_updated_at: Date;
                }[]
            >`
                select
                    id,
                    email,
                    name,
                    is_verified,
                    is_staff,
                    picture_uri,
                    created_at,
                    last_updated_at
                from
                    user_profiles
                where
                    id = ${id}
            `;
            if (profile.length === 0) {
                return null;
            }
            return {
                id: profile[0].id,
                email: profile[0].email,
                name: profile[0].name,
                isStaff: profile[0].is_staff,
                pictureUri: profile[0].picture_uri,
                createdAt: new Date(profile[0].created_at),
                lastUpdatedAt: new Date(profile[0].last_updated_at),
                isVerified: profile[0].is_verified,
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
