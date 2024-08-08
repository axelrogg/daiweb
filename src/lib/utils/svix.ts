import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";

export function verifySvixHeaders(
    body: string,
    id: string,
    timestamp: string,
    signature: string
) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local"
        );
    }

    const webhook = new Webhook(WEBHOOK_SECRET);
    try {
        return webhook.verify(body, {
            "svix-id": id,
            "svix-timestamp": timestamp,
            "svix-signature": signature,
        }) as WebhookEvent;
    } catch (err) {
        throw err;
    }
}
