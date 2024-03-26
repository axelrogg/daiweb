import { NavBar } from "@/components/navbar";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-dvh flex flex-col px-5">
        <NavBar />
        {children}
        <footer className="flex w-full flex-col items-center py-5">
            <p>&copy;2024 DAI - Galicia, España</p>
            <ul className="list-inside list-disc"></ul>
            <ol className="list-inside list-decimal"></ol>
        </footer>
    </div>
);
