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
            const user = await this.sql<{ id: number }[]>`
        INSERT INTO users
            (
                external_user_id,
                email_address,
                email_is_verified,
                created_at,
                last_updated_at
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
        DELETE FROM users
        WHERE external_user_id = ${externalUserId}
        RETURNING id
        `;
            return result[0].id;
        } catch (err: any) {
            throw err;
        }
    }
}
