"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "@/types";
import { useRouter } from "next/navigation";

export const GuideInfoCard = ({
    title,
    description,
    href,
    className,
    children,
}: PropsWithChildren<GuideInfoCardProps>) => {
    const { push } = useRouter();

    function onClickCard() {
        push(href);
    }

    return (
        <button
            className={cn("group text-start", className)}
            onClick={onClickCard}
        >
            <Card className="flex flex-row items-center justify-between">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 group-hover:animate-propel">
                    {children}
                </CardContent>
            </Card>
        </button>
    );
};

interface GuideInfoCardProps {
    title: string;
    description: string;
    href: string;
    className?: string | undefined;
}
