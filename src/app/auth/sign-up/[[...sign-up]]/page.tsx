import { Callout, CalloutDescription } from "@/components/ui/callout";
import { AuthLayout } from "@/layouts/auth-layout";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <AuthLayout>
            <div className="flex w-full flex-col items-center justify-center">
                <Callout variant="warning" className="sm:max-w-96 lg:max-w-96">
                    <CalloutDescription>
                        Por ahora solo miembros de la DAI con un correo
                        electrónico @dai.uvigo.gal pueden crear una cuenta.
                    </CalloutDescription>
                </Callout>
                <SignUp />
            </div>
        </AuthLayout>
    );
}
