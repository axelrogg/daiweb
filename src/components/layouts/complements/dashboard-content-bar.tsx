"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboardIcon } from "lucide-react";
import { dashboardContentBarItems } from "./dashboard-content-bar-item";
import { URLPath } from "@/lib/utils/url-path";

export const DashboardContentBar = ({ isStaff }: { isStaff?: boolean }) => {
    const pathname = usePathname();
    return (
        <>
            <Link href="/dashboard">
                <div className="my-1 flex flex-row items-center rounded-lg px-2 py-2 hover:bg-slate-100">
                    <LayoutDashboardIcon className="mr-3 h-4 w-4 text-accent" />
                    <p className={pathname === "/dashboard" ? "font-bold" : ""}>
                        Dashboard
                    </p>
                </div>
            </Link>
            {dashboardContentBarItems.map((item, idx) => {
                if (item.title === "Panel de staff" && !isStaff) {
                    return;
                }

                const currentURLPath = new URLPath(pathname);
                const itemURLPath = new URLPath(item.href);
                const boldifyParent =
                    itemURLPath.parent.toString() ===
                    currentURLPath.parent.toString();

                return (
                    <div key={idx}>
                        {item.icon && (
                            <Link href={item.href}>
                                <div className="my-2 flex flex-row items-center rounded-lg px-2 py-2 hover:bg-slate-100">
                                    {item.icon}
                                    <p
                                        className={
                                            boldifyParent ? "font-bold" : ""
                                        }
                                    >
                                        {item.title}
                                    </p>
                                </div>
                            </Link>
                        )}
                        {item.children && (
                            <div className="space-y-2">
                                {item.children.map((child, index) => {
                                    const boldifyChild =
                                        pathname === child.href;
                                    return (
                                        <div
                                            key={`${index}-${child.href}`}
                                            className={`ml-7 rounded-r-lg border-l-2 px-1 py-2 hover:border-l-2 hover:border-l-accent hover:bg-slate-100 ${boldifyChild ? "border-l-primary" : ""}`}
                                        >
                                            <Link href={child.href}>
                                                <p
                                                    className={`ml-4 ${boldifyChild ? "font-bold" : ""}`}
                                                >
                                                    {child.title}
                                                </p>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};
