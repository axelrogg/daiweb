import Image from "next/image";
import { signIn } from "@/auth";
import { Callout, CalloutDescription } from "@/components/ui/callout";
import { AuthLayout } from "@/components/layouts/auth-layout";

export default function SignInPage() {
    return (
        <AuthLayout>
            <div className="flex w-full flex-col items-center justify-center">
                <Callout
                    variant="warning"
                    className="mb-5 sm:max-w-96 lg:max-w-96"
                >
                    <CalloutDescription>
                        Por ahora solo miembros de la DAI con un correo
                        electrónico @dai.uvigo.gal pueden acceder al Dashboard.
                        <br />
                        Para más información comunícate con algún miembro de la
                        DAI o acércate a una de sus sedes.
                    </CalloutDescription>
                </Callout>
                <form
                    action={async () => {
                        "use server";
                        await signIn("google", { redirectTo: "/dashboard" });
                    }}
                >
                    <button
                        type="submit"
                        className="flew-row flex items-center justify-center rounded-lg
                               border border-neutral-400 p-4"
                    >
                        <Image
                            src="/assets/google-g-logo.svg"
                            alt="Google logo"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                        Iniciar sesión con Google
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
