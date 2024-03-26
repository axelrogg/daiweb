import Image from "next/image";
import Link from "next/link";
import {
    DocumentTextIcon,
    EnvelopeIcon,
    WifiIcon,
} from "@heroicons/react/24/outline";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { SideBar } from "./side-bar";
import { Button } from "./ui/button";
import { NavBarItem } from "./navbar-item";

export const NavBar = () => (
    <nav className="mb-2 flex justify-between py-5">
        <Link href="/">
            <Image
                src="/logo-dai.svg"
                alt="DAI logo"
                width={50}
                height={50}
                priority
            />
        </Link>
        <div className="hidden lg:flex">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle}
                            >
                                <DocumentTextIcon className="mr-2 h-6 w-6 stroke-purple-800" />
                                Documentación
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        <SideBar>
            <Button asChild variant="link" className="justify-start text-base">
                <Link href="/docs">
                    <DocumentTextIcon className="mr-2 h-6 w-6 stroke-purple-800" />
                    Documentación
                </Link>
            </Button>
            <NavBarItem href="/docs/primeros-pasos/anadir-correo">
                <EnvelopeIcon className="mr-2 h-6 w-6 stroke-zinc-500" />
                Añadir el correo UVigo
            </NavBarItem>
            <NavBarItem href="/docs/primeros-pasos/wifi">
                <WifiIcon className="mr-2 h-6 w-6 stroke-emerald-500" />
                Activar el WiFi UVigo
            </NavBarItem>
        </SideBar>
    </nav>
);
