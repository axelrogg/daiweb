"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { IoIosArrowBack } from "react-icons/io";

export default function SignUpPage() {
    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [signUpErrored, setSignUpErrored] = useState(false);
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

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
            setSignUpErrored(true);
            setSignUpErrorMessage(
                "Solo son válidos correos asociados a la Universidad de Vigo"
            );
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setPendingVerification(true);
        } catch (err: any) {
            console.log(err);
            if (err.errors[0].code === "form_password_pwned") {
                setSignUpErrored(true);
                setSignUpErrorMessage(
                    "Contraseña comprometida. Por tu seguridad, elige otra."
                );
                return;
            }
            if (err.errors[0].code === "form_identifier_exists") {
                setSignUpErrored(true);
                setSignUpErrorMessage(
                    "Correo electrónico en uso. Por favor, intenta con otro."
                );
                return;
            }
        }
    };

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
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="mb-3.5">
                <h1 className="text-4xl font-bold">Crea tu cuenta</h1>
            </div>
            {!pendingVerification && (
                <div className="flex flex-col items-center justify-center">
                    <form className="flex flex-col items-center my-1.5 w-60">
                        <div className="flex flex-col my-1.5 w-60">
                            <label htmlFor="email">Correo de la uvigo</label>
                            <input
                                className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                onChange={(element) => {
                                    setSignUpErrored(false);
                                    setSignUpErrorMessage("");
                                    setEmailAddress(element.target.value);
                                }}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ingresa tu correo"
                            />
                        </div>
                        <div className="flex flex-col my-1.5 w-60">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                className="my-0.5 rounded text-black py-0.5 px-1.5 bg-[#f2f2f2]"
                                onChange={(element) =>
                                    setPassword(element.target.value)
                                }
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>
                        <button
                            className="rounded bg-black p-1.5 my-2.5 w-full"
                            onClick={handleSubmit}
                        >
                            Empieza
                        </button>
                    </form>
                    {signUpErrored && (
                        <div className="flex items-center text-rose-500 my-4 w-60">
                            <p>{signUpErrorMessage}</p>
                        </div>
                    )}
                    <div className="flex flex-row">
                        <p>¿Ya tienes una cuenta?&nbsp;</p>
                        <Link
                            href="/auth/sign-in"
                            className="underline text-rose-300"
                        >
                            Ingresa sesión
                        </Link>
                    </div>
                </div>
            )}
            {pendingVerification && (
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full flex-start">
                        <button
                            onClick={() => {
                                setPendingVerification(false);
                                setEmailAddress("");
                                setPassword("");
                                setCode("");
                            }}
                        >
                            <div className="flex flex-row items-center">
                                <IoIosArrowBack color="white" size={20} />
                                <p>&nbsp;Atrás</p>
                            </div>
                        </button>
                    </div>
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
    );
}
