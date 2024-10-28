import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import DAI_BASE_URL from "./lib/utils/base-url";
import { logger } from "./lib/logging/logger";

const log = logger.child({ module: "/auth" });

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        async signIn({ profile, email, account }) {
            log.debug(
                { profile, email, provider: account?.provider },
                "Sign-in attempt"
            );
            if (!profile) {
                log.warn(
                    { accountDetails: { email, account } },
                    "No OAuth2 user profile found in signIn callback"
                );
                return false;
            }

            const {
                sub: googleUserId,
                email: profileEmail,
                name,
                email_verified: emailVerified,
                picture: pictureUri,
            } = profile;

            if (!emailVerified || !googleUserId) {
                log.warn(
                    { email: profileEmail, googleUserId, emailVerified },
                    "Email not verified or missing Google user ID"
                );
                return false;
            }

            let userExists = false;
            let userId = null;
            try {
                const response = await fetch(
                    `${DAI_BASE_URL}/api/users/google/${googleUserId}`
                );

                if (response.status === 500 || response.status === 400) {
                    log.error(
                        { googleUserId, responseStatus: response.status },
                        "Error fetching user in signIn callback"
                    );
                    return false;
                }

                if (response.status === 200) {
                    userExists = true;
                    userId = (await response.json()).userId;
                    log.info(
                        { googleUserId },
                        "User found in database, sign-in successful"
                    );
                }
            } catch (error: any) {
                log.error(
                    { googleUserId, error: error.message },
                    "Exception occurred while checking user existence in signIn callback"
                );
                return false;
            }

            try {
                const response = await fetch(
                    DAI_BASE_URL + "/api/users/locker",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: profileEmail,
                            userId: userId,
                        }),
                    }
                );
                if (response.status === 400 || response.status === 500) {
                    log.error(
                        { googleUserId, responseStatus: response.status },
                        "Error checking locker assignment to user"
                    );
                    return true;
                }
                if (response.status === 201) {
                    const data = await response.json();
                    log.info(data, "Locker was assigned successfully to user");
                    return true;
                }
            } catch (error: any) {
                log.error(
                    { googleUserId, error: error.message },
                    "Exception occurred while assigning locker"
                );
                return false;
            }

            log.debug(
                { googleUserId, email: profileEmail },
                "User not found, creating a new user"
            );

            if (userExists) {
                return true;
            }

            // Si estamos aquí es porque el usuario no existe en nuestra base
            // de datos. Vamos a crearlo.

            try {
                const response = await fetch(DAI_BASE_URL + "/api/users", {
                    method: "POST",
                    body: JSON.stringify({
                        externalId: googleUserId,
                        email: profileEmail,
                        name: name,
                        pictureUri: pictureUri,
                    }),
                });
                if (response.status === 400 || response.status === 500) {
                    log.error(
                        { googleUserId, responseStatus: response.status },
                        "Error creating user in signIn callback"
                    );
                    return false;
                }
                if (response.status === 201) {
                    userId = (await response.json()).userId;
                    log.info({ googleUserId }, "New user created successfully");
                }
            } catch (error: any) {
                log.error(
                    { googleUserId, error: error.message },
                    "Exception occurred while creating user in signIn callback"
                );
                return false;
            }

            try {
                const response = await fetch(
                    DAI_BASE_URL + "/api/users/locker",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            email: profileEmail,
                            userId: userId,
                        }),
                    }
                );
                if (response.status === 400 || response.status === 500) {
                    log.error(
                        { googleUserId, responseStatus: response.status },
                        "Error checking locker assignment to user"
                    );
                    return true;
                }
                if (response.status === 201) {
                    const data = await response.json();
                    log.info(data, "Locker was assigned successfully to user");
                    return true;
                }
            } catch (error: any) {
                log.error(
                    { googleUserId, error: error.message },
                    "Exception occurred while assigning locker"
                );
                return false;
            }
            return false;
        },
        async jwt({ token, profile }) {
            if (!profile) {
                log.debug(
                    { token },
                    "No profile found in JWT, returning existing token"
                );
                return token;
            }

            try {
                const response = await fetch(
                    `${DAI_BASE_URL}/api/users/google/${profile.sub}`
                );

                if ([400, 404, 500].includes(response.status)) {
                    log.warn(
                        {
                            googleUserId: profile.sub,
                            responseStatus: response.status,
                        },
                        "Error fetching user in jwt callback"
                    );
                    return token;
                }

                if (response.status === 200) {
                    const body = await response.json();
                    token.id = body.userId;
                    log.info(
                        { googleUserId: profile.sub, userId: body.userId },
                        "User ID set in JWT token"
                    );
                    return token;
                }
            } catch (error: any) {
                log.error(
                    { googleUserId: profile.sub, error: error.message },
                    "Exception occurred while setting user ID in JWT token"
                );
                return token;
            }
            return token;
        },
        session({ session, token }) {
            log.debug({ session, token }, "Session callback triggered");
            session.user.id = token.id as string;
            log.info(
                { sessionId: session.user.id },
                "Session user ID set from JWT token"
            );
            return session;
        },
    },
});
