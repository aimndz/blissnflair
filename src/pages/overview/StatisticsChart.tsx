import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

// Chart configuration for different statuses
const chartConfig = {
  approved: {
    label: "Approved",
    color: "hsl(152, 100%, 50%)",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-4))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface Event {
  status: string;
}

function StatisticsChart({ events }: { events: Event[] }) {
  // Define the predefined statuses
  const predefinedStatuses = [
    "Approved",
    "Pending",
    "Rejected",
    "Cancelled",
    "Completed",
  ];

  // Calculate counts for each status
  const chartData = predefinedStatuses.map((status) => ({
    status,
    count: events.filter(
      (event) => event.status.toLowerCase() === status.toLowerCase(),
    ).length,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="#03F484" radius={8} barSize={30}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default StatisticsChart;
