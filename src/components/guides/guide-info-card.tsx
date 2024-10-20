"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export const GuideInfoCard = ({
    title,
    description,
    href,
    className,
}: GuideInfoCardProps) => (
    <Link className={cn("group text-start", className)} href={href}>
        <Card className="flex h-full flex-row content-between justify-between hover:bg-slate-100">
            <div className="flex flex-col justify-between">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardDescription className="pb-6 pl-6">
                    {description}
                </CardDescription>
            </div>
            <CardContent className="flex h-full items-center p-6 group-hover:animate-propel">
                <ArrowRightIcon className="h-6 w-6" />
            </CardContent>
        </Card>
    </Link>
);

interface GuideInfoCardProps {
    title: string;
    description: string;
    href: string;
    className?: string | undefined;
}
