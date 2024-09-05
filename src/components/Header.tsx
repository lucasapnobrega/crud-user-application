import { FaGithub, FaLinkedin  } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mb-16 px-[5%] bg-black text-white w-full py-4 flex justify-between items-center">
      <Link to={"/"} className="font-bold text-xl tracking-wider">Crud User Application</Link>

      <div className="flex gap-5">
        <div className="link-container inline-block relative">
          <Link to="/">Home</Link>
          <span className="block absolute bottom-0 left-0 h-[0.15rem] bg-white transition-bar"></span>
        </div>

        <div className="link-container inline-block relative mr-8">
          <Link to="/charts">User Analytics</Link>
          <span className="block absolute bottom-0 left-0 h-[0.15rem] bg-white transition-bar"></span>
        </div>
        

        <a href="https://github.com/lucasapnobrega" target="_blank">
          <FaGithub className="text-2xl transition-all duration-300 hover:scale-[1.18] hover:text-slate-400 cursor-pointer" />
        </a>
        <a href="https://www.linkedin.com/in/lucas-alc%C3%A2ntara-b46245278/" target="_blank">
          <FaLinkedin className="text-2xl transition-all duration-300 hover:scale-[1.18] hover:text-slate-400 cursor-pointer" />
        </a>
      </div>
    </div>
  )
}

export default Header