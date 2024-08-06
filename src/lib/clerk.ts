import { createClerkClient } from "@clerk/backend";
import { DeletedObjectJSON, UserJSON } from "@clerk/types";
import { GoogleOAuthJSON } from "@/types";
import envSecrets from "./environment";
import sql from "./database";

const clerkClient = createClerkClient({
    secretKey: envSecrets.server.CLERK_SECRET_KEY,
});

const OAUTH_APPROVED_SCOPES = [
    "email",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    "profile",
];

type ClerkWebhookEventType = "user.created" | "user.deleted" | "user.updated";

class ClerkWebhook {
    async newEvent(event: ClerkWebhookEventType, externalUserId: string) {
        try {
            await sql`
                insert into clerk_webhook_event
                    (user_id, event_type)
                values
                    (
                        (
                            select id
                            from "user"
                            where clerk_user_id = ${externalUserId}
                        ),
                        ${event}
                    )
            `;
        } catch (error: any) {
            throw error;
        }
    }
}

function parseClerkDeletedUserObject(obj: object) {
    const userId = (obj as DeletedObjectJSON).id;
    if (!userId) {
        return null;
    }
    return {
        userExternalId: userId,
        deletedAt: new Date(),
    };
}

function parseClerkCreatedUserObject(obj: object) {
    const rawUserData = obj as UserJSON;

    // This should never trigger
    if (!Array.isArray(rawUserData.external_accounts)) {
        console.error("no oauth account linked to clerk account", obj);
        return null;
    }

    // We're only allowing 1 external account: Google.
    const oauthParsedData = parseOAuthObject(rawUserData.external_accounts[0]);
    if (!oauthParsedData) {
        return null;
    }
    return {
        userId: rawUserData.id,
        createdAt: new Date(rawUserData.created_at),
        updatedAt: new Date(rawUserData.updated_at),
        avatarUri: rawUserData.image_url,
        username: rawUserData.username,
        lastName: rawUserData.last_name,
        firstName: rawUserData.first_name,
        ...oauthParsedData,
    };
}

function parseOAuthObject(obj: object) {
    const rawOauthData = obj as GoogleOAuthJSON;

    // Clerk gives us a string of Google's OAuth approved scopes.
    // If we don't find all of our scopes, throw. Something must be wrong.
    const approvedScopes = rawOauthData.approved_scopes.split(" ");
    for (let i = 0; i < approvedScopes.length; i++) {
        if (!OAUTH_APPROVED_SCOPES.includes(approvedScopes[i])) {
            console.error(
                "approved scopes do not match Google's OAuth config",
                obj
            );
            return null;
        }
    }

    if (
        rawOauthData.object !== "google_account" ||
        rawOauthData.verification.strategy !== "oauth_google" ||
        rawOauthData.verification.status !== "verified"
    ) {
        throw Error("This does not seem to be a verified google account.");
    }

    return {
        googleId: rawOauthData.google_id,
        emailAddress: rawOauthData.email_address,
    };
}

const clerkWebhook = new ClerkWebhook();

export {
    clerkWebhook,
    clerkClient,
    parseClerkDeletedUserObject,
    parseClerkCreatedUserObject,
};
