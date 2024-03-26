import Link from "next/link";
import { PropsWithChildren } from "@/types";
import { Button } from "./ui/button";

export const NavBarItem = ({
    href,
    children,
}: PropsWithChildren<NavBarItemProps>) => (
    <Button asChild variant="link" className="ml-6 justify-start text-base">
        <Link href={href}>{children}</Link>
    </Button>
);

interface NavBarItemProps {
    href: string;
}
