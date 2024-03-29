import { AuthLayout } from "@/layouts/auth-layout";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <AuthLayout>
            <div className="mt-20">
                <SignUp />
            </div>
        </AuthLayout>
    );
}
