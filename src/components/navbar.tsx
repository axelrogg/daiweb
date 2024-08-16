"use client";

import { ReactElement, useEffect, useState } from "react";
import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Menu } from "lucide-react";
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
} from "./ui/sheet";
import { MainLogo } from "@/components/main-logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserInfo } from "@/types/actions";
import { userInfo } from "@/lib/actions/user/user-info";

const navBarSheetItems: NavBarSheetItem[] = [
    {
        title: "Guías",
        href: "/guias",
        isParent: true,
        icon: <DocumentTextIcon className="mr-2 h-6 w-6 stroke-purple-800" />,
        children: [
            {
                title: "Añadir el correo de la UVigo",
                href: "/guias/anadir-correo-uvigo",
                isParent: false,
            },
            {
                title: "Activar el WiFi",
                href: "http://localhost:3000/guias/activar-wifi",
                isParent: false,
            },
        ],
    },
];

interface NavBarSheetItem {
    title: string;
    href: string;
    isParent: boolean;
    children?: NavBarSheetItem[];
    icon?: ReactElement;
}

function renderNavBarSheetItem(item?: NavBarSheetItem | null) {
    if (!item) {
        return;
    }
    const fontClasses = item.isParent ? "text-lg font-bold" : "";
    return (
        <div key={item.title}>
            <SheetClose asChild className="m-0 p-0 text-start">
                <Link
                    className={`my-1 flex flex-row items-center ${fontClasses}`}
                    href={item.href}
                >
                    {item.icon}
                    {item.title}
                </Link>
            </SheetClose>
            {item.children &&
                item.children.map((child, indx) => (
                    <SheetClose key={`${child.title}${indx}`} className="pl-4">
                        {renderNavBarSheetItem(child)}
                    </SheetClose>
                ))}
        </div>
    );
}

export const NavBar = () => {
    const [user, setUser] = useState<UserInfo | null>(null)

    useEffect(() => {
        async function getUserInfo() {
            const info = await userInfo()
            setUser(info)
        }
        getUserInfo()

    }, [])
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
                <div className="my-6">
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
        {user && (
            <div className="absolute right-5 top-5 lg:hidden">
                <Image
                    src={user.pictureUri}
                    className="rounded-full"
                    alt="Foto de perfil. Haz click para acceder a tu perfil"
                    width={35}
                    height={35}
                    priority
                />
            </div>
        )}
    </nav>
);
}
