import { RingChartData } from "@/types/ring-chart";
import { RingChart } from "./ring-chart";

export const DashboardOverviewRingChart = ({
    data,
    maxValue,
    className,
}: DashboardOverviewRingChartProps) => {
    return (
        <div className="h-42 w-42 relative flex items-center justify-center">
            <h3 className="absolute text-center text-4xl font-bold">
                {data[0].data[0].y}
            </h3>
            <RingChart className={className} data={data} maxValue={maxValue} />
        </div>
    );
};

interface DashboardOverviewRingChartProps {
    data: RingChartData[];
    maxValue: number;
    className?: string | undefined;
}
