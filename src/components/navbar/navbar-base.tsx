import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MainLogo } from "@/components/layouts/complements/main-logo";
import { navBarItems } from "@/components/navbar/navbar-items";

export const NavBarBase = ({ children }: { children: React.ReactNode }) => (
    <nav className="mb-2 flex items-center justify-center py-5 lg:justify-between">
        <MainLogo />
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
                {navBarItems.map((item, indx) => (
                    <NavigationMenuItem key={indx}>
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                            >
                                {item.icon}
                                {item.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>

        {children}
    </nav>
);
