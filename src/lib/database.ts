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
}

const client = createClient<DatabaseType>(
    envSecrets.server.SUPABASE_URL,
    envSecrets.server.SUPABASE_ANON_KEY
);
const database = new Database(client);

export default database;
