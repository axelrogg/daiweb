import { NavBar } from "@/components/navbar";
import { WithFooter } from "@/components/with-footer";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="mx-5 flex min-h-dvh flex-col lg:mx-20 2xl:mx-80">
        <NavBar />
        {children}
        <WithFooter />
    </div>
);
