import Image from "next/image";
import { signIn } from "@/auth";
import { DefaultLayout } from "@components/layouts/default-layout";
import { MainLogo } from "@components/layouts/complements/main-logo";

export default function SignInPage() {
    return (
        <DefaultLayout>
            <div className="mt-20 flex min-h-[80svh] w-full flex-col items-center">
                <div className="flex w-full flex-col items-center space-y-8">
                    <h1 className="text-3xl font-bold">
                        Inicia sesión en la DAI
                    </h1>
                    <MainLogo
                        scale={4}
                        className="flex w-full items-center justify-center"
                    />
                    <form
                        action={async () => {
                            "use server";
                            await signIn("google", {
                                redirectTo: "/dashboard",
                            });
                        }}
                    >
                        <button
                            type="submit"
                            className="flew-row flex items-center justify-center rounded-lg
                               border border-neutral-400 p-4 hover:bg-slate-100"
                        >
                            <Image
                                src="/assets/social-media-apps-logos/google-g-logo.svg"
                                alt="Google logo"
                                width={20}
                                height={20}
                                className="mr-2"
                            />
                            Iniciar sesión con Google
                        </button>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
}
