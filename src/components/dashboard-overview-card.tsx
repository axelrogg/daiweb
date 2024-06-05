"use client";

import { PropsWithChildren } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const DashboardOverviewCard = ({
    title,
    href,
    className,
    children,
}: PropsWithChildren<DashboardOverviewCardProps>) => {
    const { push } = useRouter();

    function onClickCard() {
        push(href);
    }

    return (
        <button className={cn("group w-full", className)} onClick={onClickCard}>
            <Card className="flex flex-col justify-between">
                <CardHeader className="flex items-start">
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">{children}</CardContent>
            </Card>
        </button>
    );
};

interface DashboardOverviewCardProps {
    title: string;
    href: string;
    className?: string | undefined;
}
