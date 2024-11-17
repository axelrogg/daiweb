import { cn } from "@/lib/utils";
import { PropsWithChildren } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export const DashboardCard = ({
    title,
    className,
    children,
}: PropsWithChildren<DashboardCardProps>) => {
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

interface DashboardCardProps {
    title: string;
    className?: string | undefined;
}
