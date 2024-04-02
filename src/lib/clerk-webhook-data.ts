import { DeletedObjectJSON, UserJSON } from "@clerk/types";
import { ClerkWebhookEventType, GoogleOAuthJSON } from "@/types";

const OAUTH_APPROVED_SCOPES = [
    "email",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    "profile",
];

function parseClerkWebhookEvent(event: ClerkWebhookEventType, obj: object) {
    if (event === "user.deleted") {
        return parseClerkDeletedUserObject(obj);
    }
    if (event === "user.created") {
        return parseClerkCreatedUserObject(obj);
    }
    throw Error(`unsupported webhook event: ${event}`);
}

function parseClerkDeletedUserObject(obj: object) {
    return {
        userId: (obj as DeletedObjectJSON).id,
        deletedAt: new Date(),
    };
}

function parseClerkCreatedUserObject(obj: object) {
    const rawUserData = obj as UserJSON;

    // This should never trigger
    if (!Array.isArray(rawUserData.external_accounts)) {
        throw Error("no oauth account linked to clerk account");
    }

    try {
        const oauthParsedData = parseOAuthObject(
            rawUserData.external_accounts[0]
        );
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
    } catch (err) {
        throw err;
    }
}

function parseOAuthObject(obj: object) {
    const rawOauthData = obj as GoogleOAuthJSON;

    // Clerk gives us a string of Google's OAuth approved scopes.
    // If we don't find all of our scopes, bail. Something must be quite wrong.
    const approvedScopes = rawOauthData.approved_scopes.split(" ");
    for (let i = 0; i < approvedScopes.length; i++) {
        if (!OAUTH_APPROVED_SCOPES.includes(approvedScopes[i])) {
            throw Error("approved scopes do not match Google's OAuth config");
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

export { parseClerkWebhookEvent, parseClerkCreatedUserObject };
