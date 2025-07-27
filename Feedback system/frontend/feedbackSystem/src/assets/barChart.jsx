"use client"

import { TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function ChartBarDefault({data}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="w-full h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="desktop"
                fill="#3b82f6" // Tailwind blue-500
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing overall rateing for the users last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}

// Optional: Custom tooltip component
function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const item = payload[0]

  return (
    <div className="rounded-md border bg-white px-3 py-2 shadow-sm text-sm">
      <div className="font-medium">{item.payload.month}</div>
      <div>
        <span className="text-muted-foreground">{item.dataKey}:</span>{" "}
        <span className="font-bold">{item.value}</span>
      </div>
    </div>
  )
}
