import { MainLogo } from "@/components/main-logo";
import { WithFooter } from "@/components/with-footer";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-dvh flex-col px-5">
        <nav className="mb-2 py-5">
            <MainLogo />
        </nav>
        {children}
        <WithFooter className="fixed bottom-0 left-0" />
    </div>
);
