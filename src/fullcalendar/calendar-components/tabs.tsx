"use client";
import { DashboardIcon, GridIcon } from "@radix-ui/react-icons";
type TabTypes = "month" | "year"; // Add more tab types if necessary

export function Tabs(props: any) {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-2 sm:w-[240px]">
      <div className="inline-flex h-full w-full items-center justify-between rounded-md border border-input bg-transparent p-1">
        {/* Tab: Month */}
        <button
          onClick={() => props.setActiveTab("month")}
          className={`relative inline-flex h-full w-full items-center justify-center gap-3 whitespace-nowrap rounded-md px-2 text-sm font-medium ring-offset-background transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
            props.activeTab === ("month" as TabTypes)
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50 hover:text-secondary-foreground"
          } cursor-pointer`}
        >
          <DashboardIcon width={15} height={15} />
          <span
            className={`transition-all duration-500 ease-in-out ${
              props.activeTab === ("month" as TabTypes)
                ? "max-w-xs opacity-100"
                : "max-w-0 overflow-hidden opacity-0"
            }`}
          >
            Month
          </span>
        </button>

        {/* Tab: Year */}
        <button
          onClick={() => props.setActiveTab("year")}
          className={`relative inline-flex h-full w-full items-center justify-center gap-3 whitespace-nowrap rounded-md px-2 text-sm font-medium ring-offset-background transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
            props.activeTab === "year"
              ? "bg-secondary text-secondary-foreground"
              : "hover:bg-secondary/50 hover:text-secondary-foreground"
          } cursor-pointer`}
        >
          <GridIcon width={15} height={15} />

          <span
            className={`transition-all duration-500 ease-in-out ${
              props.activeTab === "year"
                ? "max-w-xs opacity-100"
                : "max-w-0 overflow-hidden opacity-0"
            }`}
          >
            Year
          </span>
        </button>
      </div>
    </div>
  );
}
