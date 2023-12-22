import postgres, { PostgresError } from "postgres";

export class Database {
    sql: postgres.Sql;

    constructor() {
        this.checkCredentials();
        this.sql = postgres({
            host: process.env.DATABASE_HOST!,
            port: Number(process.env.DATABASE_PORT!),
            database: process.env.DATABASE_NAME!,
            username: process.env.DATABASE_USERNAME!,
            password: process.env.DATABASE_PASSWORD!,
        });
    }

    checkCredentials() {
        if (
            !(
                process.env.DATABASE_HOST ||
                process.env.DATABASE_PORT ||
                process.env.DATABASE_NAME ||
                process.env.DATABASE_USERNAME ||
                process.env.DATABASE_PASSWORD
            )
        ) {
            throw new Error();
        }
    }

    async createUser(
        externalId: string,
        email: string,
        isVerified: boolean,
        createdAt: Date,
        lastUpdatedAt: Date
    ) {
        try {
            const user = await this.sql<{ id?: number }[]>`
        WITH new_user AS (
            INSERT INTO users
                (
                    external_user_id,
                    email_address,
                    email_is_verified,
                    account_creation_date,
                    last_update_date
                )
            VALUES  
                (
                    ${externalId},
                    ${email},
                    ${isVerified},
                    ${createdAt},
                    ${lastUpdatedAt}
                )
            RETURNING id
        )
        INSERT INTO user_profiles (user_id, last_update_date)
        SELECT id, ${createdAt} FROM new_user
        RETURNING user_id as id;
    `;
            if (user.length !== 1) {
                throw new Error("user was not created");
            }
            return user[0].id;
        } catch (err) {
            const error = err as PostgresError;
            if (
                error.message.includes(
                    "duplicate key value violates unique constraint"
                )
            ) {
                if (error.constraint_name === "users_email_address_key") {
                    throw new Error(
                        "unique constraint violation: email_address already exists"
                    );
                }
                if (error.constraint_name === "users_external_user_id_key") {
                    throw new Error(
                        "unique constraint violation: external_user_id already exists"
                    );
                }
            }
            throw error;
        }
    }

    async deleteUser(externalUserId: string) {
        try {
            const result = await this.sql<{ id?: number }[]>`
        WITH deleted_user_profile AS (
            DELETE FROM user_profiles
            WHERE
                user_id = (
                    SELECT id
                    FROM users
                    WHERE external_user_id = ${externalUserId}
                )
            RETURNING user_id
        )
        DELETE FROM users
        WHERE
            id = (SELECT user_id FROM deleted_user_profile)
        RETURNING id
        `;
            if (!result || result.length !== 1) {
                return null;
            }
            return result[0].id;
        } catch (err: any) {
            throw err;
        }
    }

    async updateUserProfile(
        externalUserId: string,
        firstName: string,
        lastName: string,
        updateDate: Date
    ) {
        try {
            const result = await this.sql<{ id?: number }[]>`
            UPDATE user_profiles
            SET 
                first_name = ${firstName},
                last_name = ${lastName},
                last_update_date = ${updateDate}
            WHERE
                user_id = (
                    SELECT id
                    FROM users
                    WHERE external_user_id = ${externalUserId}
                )
            RETURNING user_id as id;
            `;
            if (!result || result.length !== 1) {
                return null;
            }
            return result[0].id;
        } catch (err: any) {
            throw err;
        }
    }
}
