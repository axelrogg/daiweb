export type RingChartDataPoint = {
    x: string;
    y: number;
};

export type RingChartData = {
    id: string;
    data: RingChartDataPoint[];
};
