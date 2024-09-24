import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { User } from "../types/types"
import { ApiException } from "../services/api/apiException"
import { toast } from "sonner"
import { FaChevronLeft } from "react-icons/fa6";
import imgDefault from '../assets/user-default.jpg'
import { usersService } from "../services/api/users/usersService"

const UserContent = () => {
  const { id } = useParams()
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    if(id) {
      usersService.getById(id)
      .then(result => {
        if(result instanceof ApiException) {
          toast.error("Erro ao abrir perfil do usuário")

          return
        }

        setUser(result)
      })
    }
  }, [id])

  return (
    <div className="flex justify-center items-center gap-12 bg-white p-8 w-[50rem] rounded-xl relative mx-auto" id="createForm">
      <img src={user?.profileImage || imgDefault} alt="Imagem de perfil" className="rounded-full w-[16rem] aspect-square object-cover" />

      <div className="flex flex-col gap-2">
        <h3 className="font-bold italic text-2xl mb-4">{user?.name}</h3>
        <p><span className="font-semibold">Age</span>: {user?.age} years</p>
        <p><span className="font-semibold">Email: </span>{user?.email}</p>
        <p><span className="font-semibold">Sex</span>: {user?.sex === "male" ? "Male" : "Female"}</p>
        <p><span className="font-semibold">Height</span>: {user?.height}m</p>
        <p><span className="font-semibold">Weight</span>: {user?.weight}kg</p>
      </div>

      <div className="w-10 h-10 bg-black transition-all hover:bg-blackHover text-white rounded-full mt-10 flex justify-center items-center absolute right-10 -top-4 cursor-pointer" onClick={() => navigate("/")}>
        <FaChevronLeft className="text-xl" title="Voltar" />
      </div>
    </div>
  )
}

export default UserContent