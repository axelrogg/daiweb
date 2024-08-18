import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    pages: {
        signIn: "/auth/sign-in",
    },
    callbacks: {
        async signIn({ profile }) {
            if (!profile) {
                return false;
            }
            const {
                sub: googleUserId,
                email,
                name,
                email_verified: emailVerified,
                picture,
            } = profile;

            if (!emailVerified || !googleUserId) {
                return false;
            }

            let exists = false;
            try {
                const response = await fetch(
                    "http://localhost:3000/api/users/google/" + googleUserId
                );

                if (response.status === 500 || response.status === 400) {
                    return false;
                }

                if (response.status === 200) {
                    exists = true;
                    return true;
                }
            } catch (error: any) {
                console.error(error);
                return false;
            }

            // Si estamos aquí es porque el usuario no existe en nuestra base
            // de datos. Vamos a crearlo.

            try {
                const response = await fetch(
                    "http://localhost:3000/api/users",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            externalId: googleUserId,
                            email: email,
                            name: name,
                            pictureUri: picture,
                        }),
                    }
                );
                if (response.status === 400 || response.status === 500) {
                    return false;
                }
                if (response.status === 201) {
                    return true;
                }
            } catch (error: any) {
                console.error(error);
                return false;
            }
            return false;
        },
        async jwt({ token, profile }) {
            if (!profile) {
                return token;
            }

            try {
                const response = await fetch(
                    "/api/users/google/" + profile!.sub
                );

                if (
                    response.status === 500 ||
                    response.status === 400 ||
                    response.status === 404
                ) {
                    return token;
                }

                if (response.status === 200) {
                    const body = await response.json();
                    token.id = body.userId;
                    return token;
                }
            } catch (error: any) {
                console.error(error);
                return token;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id as string;
            return session;
        },
    },
});
