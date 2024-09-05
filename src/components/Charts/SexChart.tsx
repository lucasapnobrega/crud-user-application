import { Label, Pie, PieChart } from "recharts"
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
import { useUsersContext } from "../../contexts/UsersContext"
import { useEffect, useMemo, useState } from "react"

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(hsl(220 70% 50%))",
  },
  female: {
    label: "Female",
    color: "hsl(hsl(340 75% 55%))",
  },
} satisfies ChartConfig

const HeightChart = () => {
  const { users } = useUsersContext()
  const [sexQuantity, setSexQuantity] = useState({ male: 0, female: 0 })
  
  useEffect(() => {
    if(users) {
      const maleUsers = users.filter(user => user.sex === "male")
      const femaleUsers = users.filter(user => user.sex === "female")

      setSexQuantity({
        male: maleUsers.length,
        female: femaleUsers.length
      })
    }
  }, [users])

  const chartData = [
    { sex: "male", persons: sexQuantity.male, fill: "hsl(220 70% 50%)" },
    { sex: "female", persons: sexQuantity.female, fill: "hsl(340 75% 55%)" },
  ]

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.persons, 0)
  }, [sexQuantity])
  
  return (
    <Card className="w-[23rem] bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sex Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="persons"
              nameKey="sex"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Persons
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey="sex" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default HeightChart


/*
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
import { useUsersContext } from "../../contexts/UsersContext"
import { useEffect, useState } from "react"

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(hsl(220 70% 50%))",
  },
  female: {
    label: "Female",
    color: "hsl(hsl(340 75% 55%))",
  },
} satisfies ChartConfig

const SexChart = () => {
  const { users } = useUsersContext()
  const [sexQuantity, setSexQuantity] = useState({ male: 0, female: 0 })
  
  useEffect(() => {
    if(users) {
      const maleUsers = users.filter(user => user.sex === "male")
      const femaleUsers = users.filter(user => user.sex === "female")

      setSexQuantity({
        male: maleUsers.length,
        female: femaleUsers.length
      })
    }
  }, [users])
  
  console.log(sexQuantity)

  const chartData = [
    { sex: "male", persons: sexQuantity.male, fill: "hsl(220 70% 50%)" },
    { sex: "female", persons: sexQuantity.female, fill: "hsl(340 75% 55%)" },
  ]

  return (
    <Card className="w-[23rem] bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Sexo</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="sex" />}
            />

            <Pie data={chartData} dataKey="persons" nameKey="sex" />

            <ChartLegend
              content={<ChartLegendContent nameKey="sex" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default SexChart
*/