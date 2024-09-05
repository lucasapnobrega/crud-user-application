import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart"
import { useEffect, useState } from "react"
import { useUsersContext } from "../../contexts/UsersContext"

const chartConfig = {
  i1: {
    label: "-1.50",
    color: "hsl(220 70% 50%)",
  },
  i2: {
    label: "1.51 - 1.60",
    color: "hsl(160 60% 45%)",
  },
  i3: {
    label: "1.61 - 1.70",
    color: "hsl(30 80% 55%)",
  },
  i4: {
    label: "1.71 - 1.80",
    color: "hsl(280 65% 60%)",
  },
  i5: {
    label: "1.81 - 1.95",
    color: "hsl(340 75% 55%)",
  },
  i6: {
    label: "1.96 +",
    color: "hsl(197 37% 24%)",
  },
} satisfies ChartConfig

const HeightChart = () => {
  const { users } = useUsersContext()
  const [heightQuantity, setHeightQuantity] = useState({
    i1: 0, i2: 0, i3: 0, i4: 0, i5: 0, i6: 0
  })
  
  useEffect(() => {
    if(users) {
      const usersI1 = users.filter(user => user.height <= 1.50)
      const usersI2 = users.filter(user => user.height >= 1.51 && user.height <= 1.60)
      const usersI3 = users.filter(user => user.height >= 1.61 && user.height <= 1.70)
      const usersI4 = users.filter(user => user.height >= 1.71 && user.height <= 1.80)
      const usersI5 = users.filter(user => user.height >= 1.81 && user.height <= 1.95)
      const usersI6 = users.filter(user => user.height >= 1.96)

      setHeightQuantity({
        i1: usersI1.length,
        i2: usersI2.length,
        i3: usersI3.length,
        i4: usersI4.length,
        i5: usersI5.length,
        i6: usersI6.length,
      })
    }
  }, [users])

  const chartData = [
    { interval: "i1", persons: heightQuantity.i1, fill: "hsl(220 70% 50%)" },
    { interval: "i2", persons: heightQuantity.i2, fill: "hsl(160 60% 45%)" },
    { interval: "i3", persons: heightQuantity.i3, fill: "hsl(30 80% 55%)" },
    { interval: "i4", persons: heightQuantity.i4, fill: "hsl(280 65% 60%)" },
    { interval: "i5", persons: heightQuantity.i5, fill: "hsl(340 75% 55%)" },
    { interval: "i6", persons: heightQuantity.i6, fill: "hsl(197 37% 24%)" },
  ]

  return (
    <Card className="w-[23rem] bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Height Range</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="interval" hideLabel />}
            />

            <Pie data={chartData} dataKey="persons" />

            <ChartLegend
              content={<ChartLegendContent nameKey="interval" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default HeightChart