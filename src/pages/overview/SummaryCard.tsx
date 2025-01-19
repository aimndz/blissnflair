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
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

// const chartData = [
//   { day: 1, events: 3 },
//   { day: 2, events: 4 },
//   { day: 3, events: 5 },
//   { day: 4, events: 2 },
//   { day: 5, events: 0 },
//   { day: 6, events: 2 },
//   { day: 7, events: 2 },
// ];

const chartConfig = {
  label: "Data",
  color: "rgb(49 225 122)", // Default color
} satisfies ChartConfig;

function SummaryCard({
  title,
  value,
  chartData,
  dataKey = "events",
  chartColor = "rgb(49 225 122)",
}: {
  title: string;
  value: number;
  chartData: any[];
  dataKey?: string;
  chartLabel?: string;
  chartColor?: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 px-3 py-5 text-3xl font-semibold">
        <p className="w-3/5">{value}</p>
        <div className="w-2/5">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              {/* <CartesianGrid vertical={false} /> */}
              {/* <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              /> */}
              {/* <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              /> */}
              <Line
                dataKey={dataKey}
                type="natural"
                stroke={chartColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
          <p className="mt-3 text-center text-xs font-normal text-secondary-800">
            Past 7 Days
          </p>
        </div>
      </CardContent>
      <CardHeader className="px-3 pb-3 pt-0">
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default SummaryCard;
