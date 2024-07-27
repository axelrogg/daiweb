import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database as DatabaseType } from "@/types";
import envSecrets from "@/lib/environment";

class Database {
    private client: SupabaseClient<DatabaseType>;

    constructor(client: SupabaseClient<DatabaseType>) {
        this.client = client;
    }

    async createUser(clerkUserId: string, email: string, isStaff: boolean) {
        const { data, status, error, statusText } = await client
            .from("user")
            .insert({
                email: email,
                clerk_user_id: clerkUserId,
                is_staff: isStaff,
                is_verified: true,
            })
            .select();

        if (!data || status !== 201 || statusText !== "Created") {
            throw new Error(JSON.stringify(error, null, 4));
        }

        return data[0].id;
    }

    async deleteUser(userId: number) {
        const { error } = await this.client
            .from("user")
            .delete()
            .eq("id", userId);
        if (error) {
            throw error;
        }
    }

    async getMaterialBorrowingsByUserExternalId(userExternalId: string) {
        let userId = null;
        try {
            userId = await this.getUserIdFromExternalId(userExternalId);
            console.log(userId);
        } catch (err) {
            return null;
        }

        const { data, status, error, statusText } = await this.client
            .from("reservas_materiales")
            .select()
            .eq("user_id", userId!)
            .eq("is_active", true)
            .eq("status", "reserved");

        if (status !== 200 || statusText !== "OK") {
            console.error(error);
            throw new Error(JSON.stringify(error, null, 4));
        }
        if (!data || data.length === 0) {
            console.error(
                `No data associated to user with external user id: ${userExternalId}`
            );
            return null;
        }
        return data.map((element) => {
            return {
                id: element.id,
                userId: element.user_id,
                material: element.material,
                status: element.status,
                isActive: element.is_active,
                createdAt: element.created_at,
                validUntil: element.valid_until,
            };
        });
    }

    async getUserIdFromExternalId(externalUserId: string) {
        const { data, statusText, error, status } = await this.client
            .from("user")
            .select("id")
            .eq("clerk_user_id", externalUserId);

        if (status !== 200 || statusText !== "OK") {
            console.error(error);
            throw new Error(JSON.stringify(error, null, 4));
        }

        if (!data || data.length === 0) {
            console.error(
                `No data associated to user with external user id: ${externalUserId}`
            );
            return null;
        }
        return data[0].id;
    }

    async insertWebhookCreateEvent(userId: number) {
        const { status, error, statusText } = await client
            .from("clerk_webhook_event")
            .insert({
                user_id: userId,
                event_type: "user.create",
            });

        if (status !== 201 || statusText !== "Created") {
            console.error(error);
            throw new Error(JSON.stringify(error, null, 4));
        }
    }

    async insertWebhookDeleteEvent(userId: number) {
        const { status, error, statusText } = await client
            .from("clerk_webhook_event")
            .insert({
                user_id: userId,
                event_type: "user.deleted",
            });

        if (status !== 201 || statusText !== "Created") {
            console.error(error);
            throw new Error(JSON.stringify(error, null, 4));
        }
    }

    async createNewMaterialReservation(user_id: number, material: string) {
        const now = Date.now();
        const valid_until = now + 259200000; // default value is 3 days from now.
        const { status, error, statusText } = await client
            .from("reservas_materiales")
            .insert({
                user_id: user_id,
                material: material,
                created_at: new Date(now).toISOString(),
                valid_until: new Date(valid_until).toISOString(),
                is_active: true,
                status: "reserved",
            });
        if (status !== 201 || statusText !== "Created") {
            console.error(error);
            throw new Error(JSON.stringify(error, null, 4));
        }
    }
}

const client = createClient<DatabaseType>(
    envSecrets.server.SUPABASE_URL,
    envSecrets.server.SUPABASE_ANON_KEY
);
const database = new Database(client);

export default database;
