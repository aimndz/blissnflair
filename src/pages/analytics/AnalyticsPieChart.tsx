import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

interface AnalyticsPieChartProps {
  title: string;
  className?: string;
  data: string[];
  label: string;
  colorMapping: Record<string, string>; // Mapping of categories to colors
  dataKey: string; // Key to use for the data (e.g., "status" or "venue")
}

export function AnalyticsPieChart({
  title,
  label,
  className,
  data,
  colorMapping,
  dataKey,
}: AnalyticsPieChartProps) {
  // Count occurrences of each category
  const categoryCounts = data.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Prepare chart data
  const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
    [dataKey]: category,
    visitors: count,
    fill: colorMapping[category] || "var(--color-default)", // Default color if category not found
  }));

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
  } satisfies ChartConfig;

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="mx-auto aspect-square max-h-48"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey={dataKey}
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex justify-center gap-3">
          {chartData.map(({ [dataKey]: category, fill }) => (
            <div key={category} className="flex items-center">
              <div className="mr-2 h-4 w-4" style={{ backgroundColor: fill }} />
              <span className="text-xs uppercase">{category}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
