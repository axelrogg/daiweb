import { NavBar } from "@/components/navbar";
import { WithFooter } from "@/components/with-footer";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-dvh flex-col mx-5 lg:mx-80">
        <NavBar />
        {children}
        <WithFooter />
    </div>
);
