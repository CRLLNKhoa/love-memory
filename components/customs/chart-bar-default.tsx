"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { analyzeRelationship } from "@/lib/moodsanalyze";

const chartConfig: ChartConfig = {
  happy: { label: "Hạnh phúc", color: "#FFC83D" },
  miss: { label: "Nhớ", color: "#A78BFA" },
  calm: { label: "Bình yên", color: "#60A5FA" },
  jealous: { label: "Ghen", color: "#F43F5E" },
  sad: { label: "Buồn", color: "#64748B" },
  angry: { label: "Giận", color: "#F97316" },
};

export function ChartBarDefault({ data, ...props }: any) {
  const moodArray = Object.entries(data).map(([key, mood]: any) => ({
    mood: key,
    value: mood?.total ?? 0,
    name: mood?.label ?? "",
  }));

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nhật ký cảm xúc</CardTitle>
          <CardDescription>30/10/2025 - Hiện tại</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={moodArray}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={true}
              />

              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              <Bar dataKey="value" radius={8}>
                {moodArray.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      chartConfig[entry.mood as keyof typeof chartConfig].color
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 justify-between leading-none font-medium w-full">
            <h2>{analyzeRelationship(data)?.status}</h2>{" "}
            <p className={`text-red-500`}>
              {analyzeRelationship(data)?.score}
              {"  "}Điểm
            </p>
          </div>
          <div className="text-muted-foreground leading-none">
            {analyzeRelationship(data)?.message}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
