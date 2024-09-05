import { useForm } from "react-hook-form"
import Input from "../components/Input"
import { User } from "../types/types"
import { FaUser, FaUpload } from "react-icons/fa6";
import { usersService } from "../services/api/users/usersService";
import { ApiException } from "../services/api/apiException";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import React, { useState } from "react";
import { convertFileToBase64 } from "../utils/convertFileToBase64";
import { Select } from "../components/Select";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../contexts/UsersContext";
import { convertDate } from "../utils/convertDate";

const Create = () => {
  const { 
    handleSubmit, 
    register,
    formState: { errors },
    reset,
    setValue,
    clearErrors
  } = useForm<User>({
    resolver: zodResolver(userSchema)
  })
  const [image, setImage] = useState<File>()
  const navigate = useNavigate()
  const { setUsers } = useUsersContext()

  const handleImageChange = async(ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]

    if(file) {
      const base64Image = await convertFileToBase64(file)
      setImage(file)
      setValue("profileImage", base64Image)
      clearErrors("profileImage")
    }
  }

  const onSubmit = async (data: User) => {
    const date = new Date()

    const fullData = {
      ...data,
      createdAt: convertDate(`${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`)
    }

    usersService.createUser(fullData)
    .then(result => {
      console.log(result)

      if(result instanceof ApiException) {
        return toast.error("Ocorreu um erro ao criar usuário")
      }

      toast.success("Usuário criado com sucesso")
      reset()
      setImage(undefined)
      setUsers(prevUsers => [...prevUsers, result])
    })
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-[6rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-[30rem] py-6 px-4 flex flex-col gap-4 rounded-[0.3rem]" id="createForm">
        <h2 className="font-semibold text-2xl mb-4 flex justify-center items-center gap-3 text-[#083A50]">
          Create User Form <FaUser/>
        </h2>

        <Input 
          {...register("name")}
          label="Name"
          placeholder="Enter your name"
          name="name"
          error={errors.name}
        />

        <Input 
          {...register("age", { valueAsNumber: true })}
          type="number"
          label="Age"
          placeholder="Enter your age"
          name="age"
          error={errors.age}
        />

        <Input 
          {...register("email")}
          label="E-mail"
          placeholder="Enter your e-mail"
          name="email"
          error={errors.email}
        />

        <Input 
          {...register("height", { valueAsNumber: true })}
          type="number"
          label="Height"
          placeholder="Enter your height"
          name="height"
          error={errors.height}
          step={0.01}
        />

        <Select
          {...register("sex")}
          label="Sex"
          name="sex"
          error={errors.sex}
          defaultValue=""
          className="rounded px-2 py-2 border text-md text-[#8b8a8a]"
        >
          <option value="" disabled>Select your gender</option>
          <option key="male" value="male">Male</option>
          <option key="female" value="female">Female</option>
        </Select>

        <div className="flex items-center justify-center cursor-pointer mt-6 bg-gray-200 hover:bg-gray-300">
          <input
            type="file"
            id="fileUpload"
            name="profileImage"
            className="absolute opacity-0 cursor-pointer"
            onChange={(ev) => handleImageChange(ev)}
          />

          <label
            htmlFor="fileUpload"
            className="flex justify-center items-center gap-4 w-full py-1.5 border-2 border-dashed border-gray-400 cursor-pointer"
          >
            <FaUpload className="text-xl text-gray-600" />
            <span className="text-gray-600">Foto do usuário</span>
          </label>
        </div>

        {image && <span className="text-center text-[0.8rem] font-semibold -mt-1.5">{image.name}</span>}

        <div className="flex justify-between">
          <button type="button" className="bg-black text-white py-2 w-44 rounded mt-4 transition" onClick={() => navigate("/")}>Back</button>
          <button type="submit" className="bg-black text-white py-2 w-44 rounded mt-4 transition">Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create