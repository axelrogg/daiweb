import { NavBar } from "@/components/navbar";

export const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-full flex-col px-5">
        <NavBar />
        {children}
        <footer className="fixed bottom-0 left-0 flex w-full flex-col items-center pb-5 pt-1">
            <p>&copy;2024 DAI - Galicia, España</p>
            <ul className="list-inside list-disc"></ul>
            <ol className="list-inside list-decimal"></ol>
        </footer>
    </div>
);
