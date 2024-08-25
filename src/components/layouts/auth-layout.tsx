import { MainLogo } from "@/components/layouts/complements/main-logo";
import { Footer } from "@/components/layouts/complements/footer";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-dvh flex-col px-5">
        <nav className="mb-2 py-5">
            <MainLogo />
        </nav>
        {children}
        <Footer />
    </div>
);
