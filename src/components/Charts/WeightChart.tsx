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
    label: "-65",
    color: "hsl(27 87% 67%)",
  },
  i2: {
    label: "66 - 76",
    color: "hsl(197 37% 24%)",
  },
  i3: {
    label: "77 - 85",
    color: "hsl(43 74% 66%)",
  },
  i4: {
    label: "86 - 94",
    color: "hsl(160 60% 45%)",
  },
  i5: {
    label: "95 - 105",
    color: "hsl(220 70% 50%)",
  },
  i6: {
    label: "106 +",
    color: "hsl(340 75% 55%)",
  },
} satisfies ChartConfig

const WeightChart = () => {
  const { users } = useUsersContext()
  const [weightQuantity, setWeightQuantity] = useState({
    i1: 0, i2: 0, i3: 0, i4: 0, i5: 0, i6: 0
  })
  
  useEffect(() => {
    if(users) {
      const usersI1 = users.filter(user => user.weight <= 65)
      const usersI2 = users.filter(user => user.weight >= 66 && user.weight <= 76)
      const usersI3 = users.filter(user => user.weight >= 77 && user.weight <= 85)
      const usersI4 = users.filter(user => user.weight >= 86 && user.weight <= 94)
      const usersI5 = users.filter(user => user.weight >= 95 && user.weight <= 105)
      const usersI6 = users.filter(user => user.weight >= 106)

      setWeightQuantity({
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
    { interval: "i1", persons: weightQuantity.i1, fill: "hsl(27 87% 67%)" },
    { interval: "i2", persons: weightQuantity.i2, fill: "hsl(197 37% 24%)" },
    { interval: "i3", persons: weightQuantity.i3, fill: "hsl(43 74% 66%)" },
    { interval: "i4", persons: weightQuantity.i4, fill: "hsl(160 60% 45%)" },
    { interval: "i5", persons: weightQuantity.i5, fill: "hsl(220 70% 50%)" },
    { interval: "i6", persons: weightQuantity.i6, fill: "hsl(340 75% 55%)" },
  ]

  return (
    <Card className="2xl:flex-1 md:w-[48%] w-[100%] bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Weight Range</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0 h-full">
        {users && users.length === 0 ? (
          <div className="text-center text-gray-500 -mt-[15%] flex justify-center items-center h-full">
            Nenhum dado disponível
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

export default WeightChart