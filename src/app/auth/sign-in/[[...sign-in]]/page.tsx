import { AuthLayout } from "@/layouts/auth-layout";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <AuthLayout>
            <div className="mt-20">
                <SignIn />
            </div>
        </AuthLayout>
    );
}
