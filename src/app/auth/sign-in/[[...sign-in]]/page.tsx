import { Callout, CalloutDescription } from "@/components/ui/callout";
import { AuthLayout } from "@/layouts/auth-layout";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <AuthLayout>
            <div className="flex w-full flex-col items-center justify-center">
                <Callout variant="warning" className="sm:max-w-96 lg:max-w-96">
                    <CalloutDescription>
                        Por ahora solo miembros de la DAI con un correo
                        electrónico @dai.uvigo.gal pueden acceder al Dashboard.
                        <br />
                        Para más información comunícate con algún miembro de la
                        DAI o acércate a una de sus sedes.
                    </CalloutDescription>
                </Callout>
                <SignIn />
            </div>
        </AuthLayout>
    );
}
