import { useState } from "react";
import { Link } from "react-router-dom"
import { useSidebar } from "../../contexts/SidebarContext";

interface Props {
  icon: any;
  text: string;
  active: boolean;
  linkTo: string;
  fontSizeIcon?: string;
}

const SidebarItem = ({ icon, text, active, linkTo, fontSizeIcon }: Props) => {
  const { expanded } = useSidebar()
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Link 
      to={linkTo}
      className={`flex justify-center items-center p-4 font-medium rounded-xl mb-2.5 whitespace-nowrap relative transition-all duration-300  ${!expanded ? 'pl-5' : 'pl-3'} ${active ? 'bg-[#1C4192] text-white' : ''} hover:bg-[#1C4192] hover:text-white`} 
      style={{ position: 'relative', marginTop: `${text === "Sair" && "2rem"}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      <span className={`relative mr-3 ${fontSizeIcon ? fontSizeIcon : "text-2xl"}`}>{icon}</span>

      <span className={`overflow-hidden ${expanded ? 'w-48' : 'w-0'}`}>
        {text}
      </span>
      
      {isHovered && !expanded && (
        <div 
          style={{ position: 'absolute', left: '6.3rem', backgroundColor: '#1C4192' , color: 'white', borderRadius: '12px', padding: '0.9rem 1.5rem', letterSpacing: '1px', zIndex: '999', minWidth: '7rem', textAlign: 'center' }}
        >
          {text}
        </div>
      )}
    </Link>
  )
}

export default SidebarItem