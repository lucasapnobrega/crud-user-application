import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../components/ui/dialog"
import useOutsideClick from "../hooks/useOutsideClick";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { User } from "../types/types";
import { usersService } from "../services/api/users/usersService";
import { ApiException } from "../services/api/apiException";
import { toast } from "sonner";
import { IoCloseOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import { convertFileToBase64 } from "../utils/convertFileToBase64";
import { FaCameraRetro  } from "react-icons/fa";
import imgDefault from '../assets/user-default.jpg'
import { Select } from "./Select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  setUsers: Dispatch<SetStateAction<User[]>>
}

const ModalUpdate = ({ isOpen, onClose, user, setUsers }: Props) => {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: user?.name, age: user?.age, email: user?.email, sex: user?.sex }
  })
  const [image, setImage] = useState<string>(user.profileImage)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, isOpen, onClose)

  const onSubmit = (data: User) => {
    const newUser = {
      ...user,
      ...data,
      profileImage: image
    }

    usersService.updateUser(newUser)
    .then(result => {
      if(result instanceof ApiException) {
        return toast.error("Erro ao atualizar usuário")
      }

      console.log(result)

      toast.success("Usuário editado com sucesso")
      onClose()
      setUsers(prevUsers => {
        return prevUsers.map(user => user.id === newUser.id ? newUser : user)
      })
    })
  }

  const handleImageChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]

    if (file) {
      const base64Image = await convertFileToBase64(file)
      setImage(base64Image)
      setValue("profileImage", base64Image)
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-white !rounded-[0.5rem]" ref={ref} aria-describedby={undefined}>
        <DialogTitle className="mb-4 text-xl tracking-wider text-[#083A50]">Update User</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <img
            src={image || user?.profileImage || imgDefault} alt="Imagem de perfil"
            className="rounded-full w-[13.5rem] aspect-square mx-auto object-cover"
          />

          <div className="relative -mb-8">
            <input
              type="file"
              id="fileUpload"
              name="profileImage"
              className="opacity-0 cursor-pointer"
              onChange={(ev) => handleImageChange(ev)}
              accept="image/*"
            />

            <label
              htmlFor="fileUpload"
              className="absolute right-36 bottom-14 bg-black text-white p-2 rounded-full cursor-pointer"
              title="Change Profile Image"
            >
              <FaCameraRetro  className="text-[1.15rem]" />
            </label>
          </div>

          <Input
            {...register("name")}
            label="Name"
            name="name"
            error={errors.name}
          />

          <Input
            {...register("age", { valueAsNumber: true })}
            type="number"
            label="Age"
            name="age"
            error={errors.age}
          />

          <Input
            {...register("email")}
            type="email"
            label="Email"
            error={errors.email}
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

          <button type="submit" className="bg-black text-white py-2.5 mt-5 rounded">Update</button>
        </form>

        <IoCloseOutline className="absolute top-2 right-2 text-4xl cursor-pointer" onClick={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default ModalUpdate