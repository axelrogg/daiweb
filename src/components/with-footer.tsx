import { cn } from "@/lib/utils";

export const WithFooter = ({ className }: WithFooterProps) => (
    <footer className={cn(className, "flex w-full flex-col items-center py-5")}>
        <p>&copy;2024 DAI - Galicia, España</p>
    </footer>
);

interface WithFooterProps {
    className?: string | undefined;
}
