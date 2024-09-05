import { Dispatch, SetStateAction, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../components/ui/dialog"
import useOutsideClick from "../hooks/useOutsideClick";
import { User } from "../types/types";
import { usersService } from "../services/api/users/usersService";
import { ApiException } from "../services/api/apiException";
import { toast } from "sonner";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User | undefined;
  setUsers: Dispatch<SetStateAction<User[]>>
}

const ModalConfirm = ({ isOpen, onClose, user, setUsers }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, isOpen, onClose)

  const deleteUser = () => {
    usersService.deleteUser(user?.id!)
    .then((result) => {
      if(result instanceof ApiException) {
        return toast.error("Erro ao excluir usuário")
      }

      toast.success("Usuário deletado")
      setUsers(prevUsers => {
        return prevUsers?.filter(u => u.id !== user?.id)
      })
      onClose()
    })
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-white !rounded-[0.5rem] h-[14rem]" ref={ref} aria-describedby={undefined}>
        <DialogTitle className="mb-4 text-xl tracking-wider text-[#083A50] text-center">Confirmação de exclusão</DialogTitle>

        <p className="-mt-6">Você tem certeza que deseja deletar o usuário <span className="font-semibold">{user?.name}</span> ?</p>

        <div className="flex justify-center items-center gap-4">
          <button type="button" className="bg-green-600 text-white w-24 h-11 rounded" onClick={() => deleteUser()}>Sim</button>
          <button type="button" className="bg-red-600 text-white w-24 h-11 rounded" onClick={onClose}>Não</button>
        </div>

        <IoCloseOutline className="absolute top-2 right-2 text-4xl cursor-pointer" onClick={onClose} />
      </DialogContent>
    </Dialog>
  )
}

export default ModalConfirm