/**
 * Module for checking the presence of all environment variables needed for the
 * web
 *
 * @module checkEnvironmentVariables
 */

"use strict";

/**
 * Used to sync data between Clerk (authentication & authorization) and
 * daiweb's backend.
 *
 * @see {@link https://clerk.com/docs/integrations/webhooks/sync-data}
 *
 * @type {string | undefined}
 */
const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
/**
 * The Clerk Secret Key as set in the environment variables.
 * @type {string | undefined}
 */
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
/**
 * Clerk's "safe for browser sharing" Publishable Key.
 * @type {string | undefined}
 */
const NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY =
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const NEXT_PUBLIC_CLERK_SIGN_IN_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;
const NEXT_PUBLIC_CLERK_SIGN_UP_URL = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL;
const NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL =
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL;
const NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL =
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

/**
 * An object mapping the names of the required environment variables to their
 * values. This is utilized to check the presence of both required secrets
 * before the application runs.
 *
 * Note that values can be `undefined` if their corresponding environment
 * variables are not set.
 *
 * @type {{
 *   pub: Object.<string, (string|undefined)>,
 *   server: Object.<string, (string|undefined)>
 * }}
 */
const envSecrets = {
    pub: {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
            NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
            NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    },
    server: {
        CLERK_WEBHOOK_SECRET: CLERK_WEBHOOK_SECRET,
        CLERK_SECRET_KEY: CLERK_SECRET_KEY,
        SUPABASE_URL: SUPABASE_URL,
        SUPABASE_ANON_KEY: SUPABASE_ANON_KEY,
    },
};

/**
 * Checks if all required environment variables are set. Throws an error if any
 * of the required environment variables are missing (i.e., are `undefined` or
 * empty), thereby preventing the application from starting without the
 * necessary configurations.
 *
 * @throws {Error} If any of the required environment variables are not defined
 * or are empty.
 */
function checkEnvironmentVariables() {
    Object.entries(envSecrets).forEach(([_, secrets]) => {
        for (let key in secrets) {
            if (!envSecrets[key]) {
                throw new Error(
                    `Environment variable ${key} is not defined. ` +
                        "Please make sure to add it to your .env.local file"
                );
            }
        }
    });
}

export default checkEnvironmentVariables;
