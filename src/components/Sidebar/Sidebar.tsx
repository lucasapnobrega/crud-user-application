import { IoMdHome } from "react-icons/io";
import { FaChartSimple, FaUser } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSidebar } from "../../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";
import logo from '../../assets/logo2.jpeg'
import logo2 from '../../assets/logo3.jpeg'

const Sidebar = () => {
  const { expanded, toggleExpanded } = useSidebar()
  const { pathname } = useLocation()

  return (
    <>
      <span 
        className={`bg-darkBlue  bg-black text-white rounded-full p-2 cursor-pointer transition-all duration-400 absolute top-4  hover:bg-blackHover ${expanded ? 'left-[15.3rem]' : 'left-[5.2rem]'}`} 
        onClick={toggleExpanded}
      >
        {expanded ? <FaChevronLeft /> : <FaChevronRight />}
      </span>

      <aside className={`transition-all duration-400 shadow-[6px_0px_16px_-8px_rgba(0,0,0,0.4)] flex flex-col bg-white ${expanded ? 'w-[260px]' : 'w-[100px]'} min-h-screen h-auto`}>
        
        <img src={expanded ? logo : logo2} alt="Logo" className={`object-cover ${expanded ? 'h-[12rem]' : 'h-[8rem]'} `}/>

        <div className="pt-10 px-1 flex flex-col  gap-3">
          <SidebarItem
            icon={<IoMdHome />}
            text="Home"
            active={pathname === "/"}
            linkTo="/"
          />

          <SidebarItem
            icon={<FaUser />}
            text="Create User"
            active={pathname === "/create"}
            linkTo="/create"
            fontSizeIcon="text-[1.35rem]"
          />

          <SidebarItem
            icon={<FaChartSimple />}
            text="Users Analysis"
            active={pathname === "/charts"}
            linkTo="/charts"
          />
        </div>
      </aside>

    </>
  )
}

export default Sidebar