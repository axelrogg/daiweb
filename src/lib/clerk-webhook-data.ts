import { DeletedObjectJSON, UserJSON } from "@clerk/types";
import { ClerkWebhookEventType, GoogleOAuthJSON } from "@/types";

const OAUTH_APPROVED_SCOPES = [
    "email",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    "profile",
];

function parseClerkDeletedUserObject(obj: object) {
    const userId = (obj as DeletedObjectJSON).id;
    if (!userId) {
        return null;
    }

    return {
        userId: userId,
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
    // If we don't find all of our scopes, bail. Something must be quite wrong.
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

export { parseClerkDeletedUserObject, parseClerkCreatedUserObject };
