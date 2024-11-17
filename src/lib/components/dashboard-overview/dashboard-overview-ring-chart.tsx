import { RingChart } from "@components/ring-chart";

export const DashboardOverviewRingChart = ({
    label,
    currentValue,
    maxValue,
    className,
}: DashboardOverviewRingChartProps) => {
    return (
        <div className="h-42 w-42 relative z-0 flex items-center justify-center">
            <h3 className="absolute text-center text-4xl font-bold">
                {currentValue}
            </h3>
            <RingChart
                className={className}
                currentValue={currentValue}
                maxValue={maxValue}
                data={[
                    {
                        id: "1",
                        data: [{ x: label, y: currentValue }],
                    },
                ]}
            />
        </div>
    );
};

interface DashboardOverviewRingChartProps {
    label: string;
    currentValue: number;
    maxValue: number;
    className?: string | undefined;
}
