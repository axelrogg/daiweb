import Link from "next/link";
import { PropsWithChildren } from "@/types";
import { Button } from "./ui/button";

export const SideBarItem = ({
    href,
    children,
    }: PropsWithChildren<SideBarItemProps>) => (
    <Button asChild variant="link" className="ml-4 justify-start text-base">
        <Link href={href}>{children}</Link>
    </Button>
);

interface SideBarItemProps {
    href: string;
}
