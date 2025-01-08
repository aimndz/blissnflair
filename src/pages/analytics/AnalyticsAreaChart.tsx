import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const chartConfig = {
  events: {
    label: "Events",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function AnalyticsAreaChart({
  title,
  className,
  dates,
}: {
  title: string;
  className?: string;
  dates: string[];
}) {
  const [selectedRange, setSelectedRange] = useState("all");

  // Function to filter dates based on the selected range
  const filterDates = (dates: string[], range: string) => {
    const now = new Date();
    return dates.filter((date) => {
      const eventDate = new Date(date);
      switch (range) {
        case "one_day":
          return eventDate.toDateString() === now.toDateString();
        case "one_month":
          return (
            eventDate.getMonth() === now.getMonth() &&
            eventDate.getFullYear() === now.getFullYear()
          );
        case "one_year":
          return eventDate.getFullYear() === now.getFullYear();
        case "all":
        default:
          return true; // No filtering
      }
    });
  };

  // Get filtered dates based on the selected range
  const filteredDates = filterDates(dates, selectedRange);

  // Generate chart data based on filtered dates
  let chartData: { timeLabel: string; events: number }[] = [];

  if (selectedRange === "one_year") {
    // Create an array for all months
    chartData = Array.from({ length: 12 }, (_, index) => {
      const month = index;
      const monthName = new Date(0, month).toLocaleString("default", {
        month: "short",
      });
      const eventsCount = filteredDates.filter((date) => {
        const eventDate = new Date(date);
        return eventDate.getMonth() === month;
      }).length;
      return { timeLabel: monthName, events: eventsCount };
    });
  } else if (selectedRange === "one_month") {
    // Group by day
    const now = new Date();
    const daysInMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    chartData = Array.from({ length: daysInMonth }, (_, day) => {
      const dayDate = new Date(now.getFullYear(), now.getMonth(), day + 1);
      const dayLabel = dayDate.toLocaleDateString("default", {
        month: "short",
        day: "numeric",
      });
      const eventsCount = filteredDates.filter((date) => {
        const eventDate = new Date(date);
        return (
          eventDate.getDate() === dayDate.getDate() &&
          eventDate.getMonth() === dayDate.getMonth()
        );
      }).length;
      return { timeLabel: dayLabel, events: eventsCount };
    });
  } else if (selectedRange === "one_day") {
    // Group by hour
    const hoursInDay = Array.from({ length: 24 }, (_, hour) => {
      const hourLabel = `${hour}:00`;
      const eventsCount = filteredDates.filter((date) => {
        const eventDate = new Date(date);
        return (
          eventDate.getHours() === hour &&
          eventDate.toDateString() === new Date().toDateString()
        );
      }).length;
      return { timeLabel: hourLabel, events: eventsCount };
    });
    chartData = hoursInDay;
  } else {
    // For "all" or any other case, you can define a default behavior
    chartData = filteredDates.reduce(
      (acc, date) => {
        const eventDate = new Date(date);
        const monthYear = eventDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        const existingMonth = acc.find((item) => item.timeLabel === monthYear);
        if (existingMonth) {
          existingMonth.events += 1; // Increment the event count
        } else {
          acc.push({ timeLabel: monthYear, events: 1 }); // Add new monthYear entry
        }
        return acc;
      },
      [] as { timeLabel: string; events: number }[],
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <Select defaultValue="all" onValueChange={setSelectedRange}>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="w-[80px]">
              <SelectGroup>
                <SelectItem value="one_day">1D</SelectItem>
                <SelectItem value="one_month">1M</SelectItem>
                <SelectItem value="one_year">1Y</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-48 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timeLabel"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={5}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="1" y1="0" x2="1" y2="1">
                <stop offset="5%" stopColor="#31E17A" stopOpacity={1} />
                <stop offset="95%" stopColor="#31E17A" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0.5" y2="1">
                <stop offset="5%" stopColor="#31E17A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#31E17A" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="events"
              type="linear"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="#31E17A"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default AnalyticsAreaChart;
