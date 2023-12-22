import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserWebhookEvent, WebhookEvent } from "@clerk/nextjs/server";
import { Database } from "@/server/database";

// TODO: Log all events and errors
export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let event: WebhookEvent;

    // Verify the payload with the headers
    try {
        event = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as UserWebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const db = new Database();
    switch (event.type) {
        case "user.created":
            if (event.data.email_addresses.length !== 1) {
                console.error("User has more than 1 email address");
                return new Response("", { status: 500 });
            }
            if (
                event.data.email_addresses[0].verification?.status !==
                "verified"
            ) {
                return new Response(
                    "Unverified email addresses are rejected by default",
                    { status: 422 }
                );
            }
            try {
                const created_at = new Date(event.data.created_at);
                let emailIsVerified = false;
                if (
                    event.data.email_addresses[0].verification.status ===
                    "verified"
                ) {
                    emailIsVerified = true;
                }
                const userWasCreated = await db.createUser(
                    event.data.id,
                    event.data.email_addresses[0].email_address,
                    emailIsVerified,
                    created_at,
                    false,
                );
                if (!userWasCreated) {
                    return new Response("User could not created", {status: 500})
                }
                return new Response("", { status: 200 });
            } catch (error: any) {
                if (
                    (error as Error).message.includes(
                        "unique constraint violation"
                    )
                ) {
                    return new Response(
                        "User with given credentials already exists",
                        { status: 409 }
                    );
                }
                console.error(error);
                return new Response("Unknown error occured", { status: 500 });
            }

        case "user.updated":
            try {
                const userId = await db.updateUser(
                    event.data.id,
                    event.data.email_addresses[0].email_address,
                    event.data.first_name,
                    event.data.last_name,
                    new Date(event.data.updated_at)
                );
                if (!userId) {
                    return new Response(
                        "No user was found with given external id",
                        { status: 404 }
                    );
                }
                return new Response("", { status: 200 });
            } catch (err: any) {
                console.error(err);
                return new Response("Unknown error occured", { status: 500 });
            }
            break;
        case "user.deleted":
            if (event.data.deleted === true) {
                if (!event.data.id) {
                    return new Response("", { status: 500 });
                }
                try {
                    const deletedUserId = await db.deleteUser(event.data.id);
                    if (!deletedUserId) {
                        return new Response(
                            "No user was found with given external id",
                            { status: 404 }
                        );
                    }
                    return new Response("", { status: 200 });
                } catch (err: any) {
                    console.error(err);
                    return new Response("Unknown error occured", {
                        status: 500,
                    });
                }
            }
        default:
            console.error("unrecognized event was sent", [event]);
            return new Response("Unrecognized event", { status: 500 });
    }
}
