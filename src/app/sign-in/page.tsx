import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    // TODO: Modify appearance by going here:
    // https://clerk.com/docs/components/customization/overview#using-tailwind
    return <SignIn redirectUrl="/sign-up" />;
}
