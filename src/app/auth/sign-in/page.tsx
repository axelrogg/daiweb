"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn, useAuth } from "@clerk/nextjs";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();
    const { isSignedIn } = useAuth();

    if (!isLoaded) {
        return null;
    }

    if (isSignedIn) {
        router.replace("/dashboard");
    }

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!signIn) {
            return;
        }
        try {
            const result = await signIn.create({
                identifier: email,
                password,
            });
            console.log(result);
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                router.push("/dashboard");
            } else {
                console.log(result);
            }
        } catch (error: any) {
            console.log("error", error.errors[0].longMessage);
        }
    }

    return (
        <>
            {!isSignedIn && (
                <div className="flex flex-col items-center justify-center mt-12">
                    <div className="mb-3.5">
                        <h1 className="text-4xl font-bold">Ingresa sesión</h1>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <form
                            className="flex flex-col items-center my-1.5 w-60"
                            onSubmit={submit}
                        >
                            <div className="flex flex-col my-1.5 w-60">
                                <label htmlFor="email">Correo</label>
                                <input
                                    className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                    type="email"
                                    value={email}
                                    placeholder="Ingresa tu correo"
                                    onChange={(element) =>
                                        setEmail(element.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col my-1.5 w-60">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                    type="password"
                                    value={password}
                                    placeholder="Ingresa tu contraseña"
                                    onChange={(element) =>
                                        setPassword(element.target.value)
                                    }
                                />
                            </div>
                            <button
                                className="rounded bg-black p-1.5 my-2.5 w-full"
                                onClick={submit}
                            >
                                Continúa
                            </button>
                        </form>
                        <div className="flex flex-row">
                            <p>¿No tienes una cuenta?&nbsp;</p>
                            <Link
                                href="/auth/sign-up"
                                className="underline text-rose-300"
                            >
                                Créala
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
