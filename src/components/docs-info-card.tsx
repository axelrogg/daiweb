"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "@/types";
import { useRouter } from "next/navigation";

interface DocsInfoCardProps {
    title: string;
    description: string;
    href: string;
}

export const DocsInfoCard = ({
    title,
    description,
    href,
    children,
}: PropsWithChildren<DocsInfoCardProps>) => {
    const { push } = useRouter();

    function onClickCard() {
        push(href);
    }

    return (
        <button className="text-start" onClick={onClickCard}>
            <Card className="flex flex-row items-center justify-between">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">{children}</CardContent>
            </Card>
        </button>
    );
};
