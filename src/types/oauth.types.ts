import { ClerkAPIErrorJSON, VerificationStatus } from "@clerk/types";

type GoogleOAuthJSON = {
    approved_scopes: string;
    created_at: number;
    email_address: string;
    family_name?: string | undefined;
    given_name?: string | undefined;
    google_id: string;
    id: string;
    label: null;
    object: string; // Must be: google_account
    picture: string;
    public_metadata: object;
    updated_at: number;
    username?: string | undefined | null;
    verification: {
        attempts: number;
        error: ClerkAPIErrorJSON;
        expire_at: number;
        status: VerificationStatus;

        strategy: string; // Must be -> oauth_google
    };
};

export type { GoogleOAuthJSON };
