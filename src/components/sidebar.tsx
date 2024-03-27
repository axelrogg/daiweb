import { PropsWithChildren } from "@/types";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export const SideBar = ({
    className,
    children,
}: PropsWithChildren<SideBarProps>) => (
    <Sheet>
        <SheetTrigger
            className={cn(
                "absolute right-5 top-6 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 lg:hidden",
                className
            )}
        >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open Menu</span>
        </SheetTrigger>
        <SheetContent>
            <div className="my-2 flex flex-col">{children}</div>
        </SheetContent>
    </Sheet>
);

interface SideBarProps {
    className?: string | undefined;
    title?: string | undefined;
    titleHref?: string | undefined;
    children: React.ReactNode;
}
