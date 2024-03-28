import { NavBar } from "@/components/navbar";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-dvh flex-col px-5">
        <NavBar />
        {children}
        <footer className="flex w-full flex-col items-center py-5">
            <p>&copy;2024 DAI - Galicia, España</p>
        </footer>
    </div>
);
