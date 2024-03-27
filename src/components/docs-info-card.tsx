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

export const DocsInfoCard = ({
    title,
    description,
    href,
    className,
    children,
}: PropsWithChildren<DocsInfoCardProps>) => {
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
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 group-hover:animate-propel">
                    {children}
                </CardContent>
            </Card>
        </button>
    );
};

interface DocsInfoCardProps {
    title: string;
    description: string;
    href: string;
    className?: string | undefined;
}
