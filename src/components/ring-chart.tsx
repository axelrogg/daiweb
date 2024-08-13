"use client";

import { cn } from "@/lib/utils";
import { RingChartData } from "@/types/ring-chart";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

export const RingChart = ({
    data,
    currentValue,
    maxValue,
    className,
}: RingChartProps) => (
    <div
        className={cn(
            "relative my-4 flex h-40 w-40 items-center justify-center",
            className
        )}
    >
        <ResponsiveRadialBar
            colors={getColor(currentValue, maxValue)}
            tracksColor="rgba(0, 0, 0, .08)"
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={10}
            maxValue={maxValue}
            enableRadialGrid={false}
            enableCircularGrid={false}
            endAngle={360}
            enableTracks={true}
            radialAxisStart={null}
            circularAxisOuter={null}
        />
    </div>
);

interface RingChartProps {
    data: RingChartData[];
    currentValue: number;
    maxValue: number;
    className?: string | undefined;
}

function getColor(currentValue: number, maxValue: number) {
    const colors = new Map([
        ["under", "#00ace2"],
        ["maxed", "#e20600"],
    ]);
    return colors.get(currentValue === maxValue ? "maxed" : "under");
}
