import { MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { NavBarBase } from "./navbar-base";
import { navBarItems } from "./navbar-items";
import { MainLogo } from "../layouts/complements/main-logo";
import Link from "next/link";
import { Button } from "../ui/button";

export const DefaultNavBar = () => (
    <NavBarBase>
        <div className="hidden lg:flex">
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </div>
        <Sheet>
                <SheetTitle className="hidden">Menu</SheetTitle>
                <SheetDescription className="hidden">Menu</SheetDescription>
                <SheetTrigger className="absolute left-5 top-6 lg:hidden">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Open Menu</span>
                </SheetTrigger>
                <SheetContent side="left">
                    <MainLogo />
                    <div className="my-6 space-y-3">
                        {navBarItems.map((item) => {
                            return (
                                <div key={item.title}>
                                    <SheetClose asChild className="m-0 p-0 text-start">
                                        <Link
                                            className="my-1 flex flex-row items-center"
                                            href={item.href}
                                        >
                                            {item.icon}
                                            {item.title}
                                        </Link>
                                    </SheetClose>
                                </div>
                            )
                    })}
                    </div>
                    <SheetClose>
                        <Button asChild className="w-full">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    </SheetClose>
                </SheetContent>
            </Sheet>
    </NavBarBase>
)
