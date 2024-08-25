import { NavBar } from "@/components/navbar";
import { WithFooter } from "@/components/with-footer";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-[80svh] flex-col">
        <div className="lg:mx-20 2xl:mx-80">
            <NavBar />
        </div>
        <div className="mx-5 mb-10 flex min-h-[100svh] flex-col lg:mx-20 2xl:mx-80">
            {children}
        </div>
        <WithFooter />
    </div>
);
