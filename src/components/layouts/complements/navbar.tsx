import { ReactElement } from "react";
import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { CalendarCheckIcon, KeyRoundIcon, Menu } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { MainLogo } from "@/components/layouts/complements/main-logo";
import { Button } from "@/components/ui/button";

const navBarSheetItems: NavBarSheetItem[] = [
    {
        title: "Guías",
        href: "/guias",
        icon: <DocumentTextIcon className="mr-2 h-6 w-6 stroke-purple-800" />,
    },
    {
        title: "Reserva de espacios",
        href: "/guias/servicios/como-reservar-espacios",
        icon: <CalendarCheckIcon className="mr-2 h-6 w-6 stroke-green-800" />,
    },
];

interface NavBarSheetItem {
    title: string;
    href: string;
    icon?: ReactElement;
}

function renderNavBarSheetItem(item?: NavBarSheetItem | null) {
    if (!item) {
        return;
    }
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
    );
}

export const NavBar = () => {
    return (
        <nav className="mb-2 flex items-center justify-center py-5 lg:justify-between">
            <MainLogo />
            <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/guias" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <DocumentTextIcon className="mr-2 h-6 w-6 stroke-purple-800" />
                                Guías
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href="/guias/servicios/como-solicitar-una-taquilla"
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <KeyRoundIcon className="mr-2 h-6 w-6 stroke-blue-800" />
                                Solicita una taquilla
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link
                            href="/guias/servicios/como-reservar-espacios"
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                <CalendarCheckIcon className="mr-2 h-6 w-6 stroke-green-800" />
                                Reserva de espacios
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="hidden lg:flex">
                <Button asChild>
                    <Link href="/dashboard">Dashboard</Link>
                </Button>
            </div>
            <Sheet>
                <SheetTitle className="hidden">Menu</SheetTitle>
                <SheetDescription className="hidden">Menu</SheetDescription>
                <SheetTrigger className="absolute left-5 top-6 lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open Menu</span>
                </SheetTrigger>
                <SheetContent side="left">
                    <MainLogo />
                    <div className="my-6 space-y-3">
                        {navBarSheetItems.map((item) =>
                            renderNavBarSheetItem(item)
                        )}
                    </div>
                    <SheetClose>
                        <Button asChild className="w-full">
                            <Link href="/dashboard">Dashboard</Link>
                        </Button>
                    </SheetClose>
                </SheetContent>
            </Sheet>
        </nav>
    );
};
