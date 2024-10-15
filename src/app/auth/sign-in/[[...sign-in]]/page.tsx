import Image from "next/image";
import { signIn } from "@/auth";
import { Callout, CalloutDescription } from "@/components/ui/callout";
import { DefaultLayout } from "@/components/layouts/default-layout";

export default function SignInPage() {
    return (
        <DefaultLayout>
            <div className="flex w-full flex-col items-center justify-center">
                <h1 className="my-10 text-3xl font-bold">Iniciar sesión</h1>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/dashboard" });
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
        </DefaultLayout>
    );
}
