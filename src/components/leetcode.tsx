"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Badge } from "@/components/ui/badge";

interface Props {
  username?: string;
}

const stats = {
  totalSolved: 382,
  easySolved: 253,
  mediumSolved: 124,
  hardSolved: 5,
};

const chartData = [
  {
    name: "Easy",
    value: stats.easySolved,
    fill: "#22c55e",
  },
  {
    name: "Medium",
    value: stats.mediumSolved,
    fill: "#eab308",
  },
  {
    name: "Hard",
    value: stats.hardSolved,
    fill: "#ef4444",
  },
];

const chartConfig = {
  value: {
    label: "Solved",
  },
  Easy: {
    label: "Easy",  
    color: "#22c55e", // Tailwind green-500
  },
  Medium: {
    label: "Medium",
    color: "#eab308", // Tailwind yellow-500
  },
  Hard: {
    label: "Hard",
    color: "#ef4444", // Tailwind red-500
  },
} satisfies ChartConfig;

export default function LeetCodeCard({}: Props) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle>LeetCode</CardTitle>
        <CardDescription>Problem Solving Progress</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-8">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[260px]"
        >
          <RadialBarChart
            data={chartData}
            innerRadius={70}
            outerRadius={120}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, stats.totalSolved]}
              tick={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <RadialBar
              background
              dataKey="value"
              cornerRadius={10}
            />

            <text
              x="50%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-4xl font-bold"
            >
              {stats.totalSolved}
            </text>

            <text
              x="50%"
              y="60%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-sm"
            >
              Solved
            </text>
          </RadialBarChart>
        </ChartContainer>

        <div className="grid w-full grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-green-500/15 text-green-500 hover:bg-green-500/15"
            >
              Easy
            </Badge>

            <span className="text-2xl font-semibold">
              {stats.easySolved}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/15"
            >
              Medium
            </Badge>

            <span className="text-2xl font-semibold">
              {stats.mediumSolved}
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-red-500/15 text-red-500 hover:bg-red-500/15"
            >
              Hard
            </Badge>

            <span className="text-2xl font-semibold">
              {stats.hardSolved}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}