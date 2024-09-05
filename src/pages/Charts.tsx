import AgeChart from "../components/Charts/AgeChart";
import { IoStatsChart } from "react-icons/io5";
import SexChart from "../components/Charts/SexChart";
import HeightChart from "../components/Charts/HeightChart";
import QuantityPerMonthChart from "../components/Charts/QuantityPerMonthChart";

const Charts = () => {
  return (
    <div>
      <h2 className="text-[1.95rem] font-semibold mb-12 flex items-center gap-2">
        Charts <IoStatsChart className="text-[1.55rem]" />
      </h2>

      <div className="flex flex-wrap justify-between gap-12">
        <AgeChart />

        <SexChart />

        <HeightChart />
      </div>

      <div className="w-full mt-14">
        <QuantityPerMonthChart />
      </div>
    </div>
  )
}

export default Charts