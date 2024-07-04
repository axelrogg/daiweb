import { cn } from "@/lib/utils";
import { PropsWithChildren } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const DashboardOverviewCard = ({
    title,
    className,
    children,
}: PropsWithChildren<DashboardOverviewCardProps>) => {
    return (
        <div className={cn("group w-full", className)}>
            <Card className="flex flex-col justify-between">
                <CardHeader className="flex items-start pb-3">
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-3">{children}</CardContent>
            </Card>
        </div>
    );
};

interface DashboardOverviewCardProps {
    title: string;
    className?: string | undefined;
}
