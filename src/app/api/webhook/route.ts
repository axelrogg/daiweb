import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { parseClerkWebhookEvent } from "@/lib/clerk-webhook-data";
import { HTTP_RESPONSE_STATUS } from "@/lib/http-reponse-status";
import { verifySvixHeaders } from "@/lib/svix";
import { ClerkWebhookEvent } from "@/types";
import { UserJSON } from "@clerk/types";

export async function POST(req: Request) {
    // Clerk uses Svix to send us the webhook. We need to check that svix
    // headers they were set, and that they were properly signed
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no svix headers, get out. Can't trust the request.
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response(
            "The request was rejected because no svix headers was found. \
            Please ensure that your request contains the necessary headers.",
            {
                status: HTTP_RESPONSE_STATUS.badRequest.code,
            }
        );
    }

    const payload = (await req.json()) as ClerkWebhookEvent<
        "user.created",
        UserJSON
    >;
    let webhookEvent: WebhookEvent;
    try {
        webhookEvent = verifySvixHeaders(
            JSON.stringify(payload),
            svix_id,
            svix_timestamp,
            svix_signature
        );
    } catch (err) {
        return new Response(
            "The request was rejected because we couldn't verify svix headers. \
            Please ensure your headers are correctly formatted and contain \
            valid information.",
            {
                status: HTTP_RESPONSE_STATUS.badRequest.code,
            }
        );
    }

    // use eventId when adding event to library
    const eventId = webhookEvent.data.id;
    const eventType = webhookEvent.type;

    switch (eventType) {
        case "user.deleted":
            const deletedData = parseClerkWebhookEvent(
                "user.deleted",
                payload.data
            );
            // TODO: Add event to database
            // TODO: Delete user from database
            console.log(deletedData);
            return new Response(null, { status: HTTP_RESPONSE_STATUS.ok.code });

        case "user.created":
            // TODO: Add event to database
            try {
                const createdUserData = parseClerkWebhookEvent(
                    "user.created",
                    payload.data
                );
                // TODO: Add user to database
                console.log(createdUserData);
                return new Response(null, {
                    status: HTTP_RESPONSE_STATUS.ok.code,
                });
            } catch (err) {
                console.error(err);
                return new Response(
                    "The request payload contains invalid or incomplete data. \
                    Please ensure that all fields are correctly formatted and \
                    meet the required criteria.",
                    { status: HTTP_RESPONSE_STATUS.unprocessableEntity.code }
                );
            }
        case "user.updated":
            // TODO: Add event to database
            console.log(payload);
        default:
            return new Response(null, {
                status: HTTP_RESPONSE_STATUS.badRequest.code,
            });
    }
}
