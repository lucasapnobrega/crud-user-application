import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "../ui/chart"
import { useUsersContext } from "../../contexts/UsersContext"
import { useEffect, useState } from "react"
export const description = "A bar chart with a label"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const QuantityPerMonthChart = () => {
  const { users } = useUsersContext()
  const [months, setMonths] = useState({
    jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, 
    jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dez: 0
  })
  
  useEffect(() => {
    if (users) {
      const monthsMap = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dez']

      const updatedMonths = users.reduce((acc, user) => {
        const monthIndex = user.createdAt.split("/")[1]
        const monthKey = monthsMap[Number(monthIndex)] as keyof typeof acc
        acc[monthKey] += 1

        return acc
      }, {
        jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, 
        jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dez: 0
      });

    setMonths(updatedMonths)
    }
  }, [users])


  const chartData = [
    { month: "jan", persons: months.jan },
    { month: "feb", persons: months.feb },
    { month: "mar", persons: months.mar },
    { month: "apr", persons: months.apr },
    { month: "may", persons: months.may },
    { month: "jun", persons: months.jun },
    { month: "jul", persons: months.jul },
    { month: "aug", persons: months.aug },
    { month: "sep", persons: months.sep },
    { month: "oct", persons: months.oct },
    { month: "nov", persons: months.nov },
    { month: "dez", persons: months.dez },
  ]

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-center">Quantity Users Per Month - 2024</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[32rem] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toUpperCase().slice(0, 3)}
              className="font-medium"
            />

            <Bar dataKey="persons" fill="hsl(220 70% 50%)" radius={8} barSize={70}>
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
  )
}

export default QuantityPerMonthChart