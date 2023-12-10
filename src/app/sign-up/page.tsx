"use client";

import { FormEvent, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!isLoaded) {
            return;
        }

        if (
            !(
                emailAddress.includes("alumnos.uvigo.gal") ||
                emailAddress.includes("alumnos.uvigo.es")
            )
        ) {
            alert(
                "Solo son válidos correos asociados a la Universidad de Vigo"
            );
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // This verifies the user using email code that is delivered.
    const onPressVerify = async (event: FormEvent) => {
        event.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code,
                }
            );
            if (completeSignUp.status !== "complete") {
                /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div className="flex flex-col min-h-screen items-center">
            <nav className="flex w-full items-center justify-start p-8">
                <Link href="/">
                    <Image
                        src="/logo-dai-blanco.svg"
                        alt="DAI logo"
                        width={50}
                        height={50}
                        priority
                    />
                </Link>
            </nav>

            <div className="flex flex-col items-center justify-center mt-12">
                <div className="mb-3.5">
                    <h1 className="text-4xl font-bold">Crea tu cuenta</h1>
                </div>
                {!pendingVerification && (
                    <form className="flex flex-col items-center">
                        <div className="flex flex-col my-1.5 w-60">
                            <label htmlFor="email">Correo de la uvigo</label>
                            <input
                                className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                onChange={(e) =>
                                    setEmailAddress(e.target.value)
                                }
                                id="email"
                                name="email"
                                type="email"
                            />
                        </div>
                        <div className="flex flex-col my-1.5 w-60">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                            />
                        </div>
                        <button
                            className="rounded bg-black p-1.5 mt-2.5"
                            onClick={handleSubmit}
                        >
                            Crear cuenta
                        </button>
                    </form>
                )}
                {pendingVerification && (
                    <div className="flex flex-col items-center justify-center">
                        <form className="flex flex-col my-1.5 w-60">
                            <label htmlFor="verification-code">Código</label>
                            <input
                                className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                value={code}
                                placeholder="Código de verificación"
                                id="verification-code"
                                name="verficacion-code"
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <button
                                className="rounded bg-black p-1.5 mt-2.5"
                                onClick={onPressVerify}
                            >
                                Verify Email
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
