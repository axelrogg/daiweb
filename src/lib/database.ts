import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database as DatabaseType } from "@/types";
import envSecrets from "@/lib/environment";

class Database {
    private client: SupabaseClient<DatabaseType>;
    constructor(client: SupabaseClient<DatabaseType>) {
        this.client = client;
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
            return null;
        }
        return Number(data[0].id);
    }

    async insertWebhookDeleteEvent(externalUserId: string) {
        console.log("inserting webhook delete event");
        let userId;
        try {
            userId = await this.getUserIdFromExternalId(externalUserId);
        } catch (err) {
            throw err;
        }

        if (!userId) {
            throw new Error(
                `No user was found with external ID ${externalUserId} ` +
                    "but can still trigger Clerk's webhook events"
            );
        }

        const { data, status, error, statusText } = await client
            .from("clerk_webhook_event")
            .insert({
                user_id: userId,
                event_type: "user.deleted",
            });

        if (status !== 200 || statusText !== "OK") {
            throw new Error(JSON.stringify(error, null, 4));
        }

        console.log(data);
    }
}

const client = createClient<DatabaseType>(
    envSecrets.server.SUPABASE_URL,
    envSecrets.server.SUPABASE_ANON_KEY
);

const database = new Database(client);

export default database;
