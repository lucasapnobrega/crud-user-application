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
    label: "0-12",
    color: "hsl(220 70% 50%)",
  },
  i2: {
    label: "13-18",
    color: "hsl(160 60% 45%)",
  },
  i3: {
    label: "19-30",
    color: "hsl(30 80% 55%)",
  },
  i4: {
    label: "31-45",
    color: "hsl(280 65% 60%)",
  },
  i5: {
    label: "46+",
    color: "hsl(340 75% 55%)",
  },
} satisfies ChartConfig

const AgeChart = () => {
  const { users } = useUsersContext()
  const [ages, setAges] = useState({
    i1: 0, i2: 0, i3: 0, i4: 0, i5: 0
  })
  
  useEffect(() => {
    if(users) {
      const usersI1 = users.filter(user => user.age < 12)
      const usersI2 = users.filter(user => user.age >= 13 && user.age <= 18)
      const usersI3 = users.filter(user => user.age >= 19 && user.age <= 30)
      const usersI4 = users.filter(user => user.age >= 31 && user.age <= 45)
      const usersI5 = users.filter(user => user.age >= 46)

      setAges({
        i1: usersI1.length,
        i2: usersI2.length,
        i3: usersI3.length,
        i4: usersI4.length,
        i5: usersI5.length,
      })
    }
  }, [users])

  const chartData = [
    { interval: "i1", persons: ages.i1, fill: "hsl(220 70% 50%)" },
    { interval: "i2", persons: ages.i2, fill: "hsl(160 60% 45%)" },
    { interval: "i3", persons: ages.i3, fill: "hsl(30 80% 55%)" },
    { interval: "i4", persons: ages.i4, fill: "hsl(280 65% 60%)" },
    { interval: "i5", persons: ages.i5, fill: "hsl(340 75% 55%)" },
  ]

  return (
    <Card className="w-[23rem] bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Age Range</CardTitle>
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

export default AgeChart