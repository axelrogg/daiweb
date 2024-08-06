import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { UserJSON } from "@clerk/types";
import {
    clerkWebhook,
    parseClerkCreatedUserObject,
    parseClerkDeletedUserObject,
} from "@/lib/clerk";
import { HTTP_RESPONSE_STATUS } from "@/lib/http-reponse-status";
import { verifySvixHeaders } from "@/lib/svix";
import { ClerkWebhookEvent } from "@/types";
import user from "@/lib/user";

export async function POST(req: Request) {
    // Clerk uses Svix to send us the webhook.
    // We need to check that svix headers were set, and that they were
    // properly signed.
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no svix headers, get out. Can't trust the request.
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response(
            "The request was rejected because one or more of the following \
            headers were not found: 'svix-id', 'svix-timestamp', 'svix-signature' \
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
        console.error(err);
        return new Response(
            "The request was rejected because we couldn't verify svix headers. \
            Please ensure your headers are correctly formatted and contain \
            valid information.",
            {
                status: HTTP_RESPONSE_STATUS.badRequest.code,
            }
        );
    }

    const eventType = webhookEvent.type;

    if (eventType === "user.deleted") {
        const parsedPayloadData = parseClerkDeletedUserObject(payload.data);
        if (!parsedPayloadData) {
            return new Response("", {
                status: HTTP_RESPONSE_STATUS.badRequest.code,
            });
        }

        try {
            await clerkWebhook.newEvent(
                "user.deleted",
                parsedPayloadData.userExternalId
            );
        } catch (err) {
            console.error(err);
            throw err;
        }

        try {
            await user.deleteFromExternalId(parsedPayloadData.userExternalId);
        } catch (err) {
            console.error(err);
            throw err;
        }

        return new Response(
            `User with ID ${parsedPayloadData.userExternalId} was deleted`,
            { status: HTTP_RESPONSE_STATUS.ok.code }
        );
    }

    if (eventType === "user.created") {
        const parsedPayloadData = parseClerkCreatedUserObject(payload.data);
        if (!parsedPayloadData) {
            return new Response(
                "The request payload contains invalid or incomplete data. \
                    Please ensure that all fields are correctly formatted and \
                    meet the required criteria.",
                { status: HTTP_RESPONSE_STATUS.unprocessableEntity.code }
            );
        }

        try {
            await user.new(
                parsedPayloadData.userId,
                parsedPayloadData.emailAddress,
                false
            );
        } catch (err) {
            console.error(err);
            throw err;
        }

        try {
            await clerkWebhook.newEvent(
                "user.created",
                parsedPayloadData.userId
            );
        } catch (err) {
            throw err;
        }

        return new Response(null, {
            status: HTTP_RESPONSE_STATUS.ok.code,
        });
    }

    if (eventType === "user.updated") {
        throw new Error("user.updated");
    }

    return new Response(
        "Unsupported webhook event. Supported: 'user.created', 'user.deleted' \
            and 'user.updated'",
        { status: HTTP_RESPONSE_STATUS.badRequest.code }
    );
}
