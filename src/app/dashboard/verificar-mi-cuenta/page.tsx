import { VerifyAccountForm } from "@/components/dashboard/verify-account/verify-account-form";
import { userInfo } from "@/lib/actions/user/user-info";

export default async function VerifyAccountPage() {
    const user = await userInfo();

    if (user?.isVerified) {
        return (
            <div className="flex min-h-[80svh] w-full flex-col items-center justify-center">
                <div className="max-w-screen-sm">
                    <h1 className="text-center text-xl font-bold">
                        Ya has verificado tu cuenta
                    </h1>
                    <br />
                    <p className="text-center">
                        Vuelve a tu dashboard para acceder a nuestros servicios.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[80svh] space-y-3">
            <h1 className="text-3xl font-bold">Verifica tu cuenta</h1>
            {!user?.isVerified && <VerifyAccountForm />}
        </div>
    );
}
