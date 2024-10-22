import { MenuIcon } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton } from "@/components/auth/user-button";
import { DashboardContentMenu } from "@/components/navbar/dashboard-content-menu";
import { userInfo } from "@/lib/actions/user/user-info";
import { NoUserInfo } from "@/components/dashboard/materials/no-user-info";
import { NavBarBase } from "@/components/navbar/navbar-base";

export const DashboardNavBar = async () => {
    const user = await userInfo();
    if (!user) {
        return <NoUserInfo />;
    }

    return (
        <NavBarBase>
                <div className="hidden lg:flex">
                    <UserButton />
                </div>
                <Sheet>
                    <SheetTitle className="hidden">Menu</SheetTitle>
                    <SheetDescription className="hidden">Menu</SheetDescription>
                    <SheetTrigger className="absolute left-5 top-6 lg:hidden">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Open Menu</span>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <UserButton />
                        <SheetClose>
                            <DashboardContentMenu isStaff={user.isStaff} />
                        </SheetClose>
                    </SheetContent>
                </Sheet>
        </NavBarBase>
    );
};
