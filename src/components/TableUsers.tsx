import { useState } from "react"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "./ui/table"
import { User } from "../types/types"
import { Link } from "react-router-dom"
import ModalUpdate from "./ModalUpdate"
import ModalConfirm from "./ModalConfirm"
import { BsPlusCircleFill } from "react-icons/bs";
import { useUsersContext } from "../contexts/UsersContext"
import { getCurrentPageUsers } from "../utils/pagination"
import PaginationButtons from "./PaginationButtons"

const TableUsers = () => {
  const { users, setUsers } = useUsersContext()
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [modalConfirm, setModalConfirm] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User>({ name: "", age: 0, email: "", profileImage: "", height: 0, sex: "" ,createdAt: "" })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalUsers = users?.length || 0
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  const handleButtonClick = (isEdit: boolean, user: User) => {
    setSelectedUser(user)

    if(isEdit) 
      return setModalEdit(true)                     
    
    setModalConfirm(true)
  }
  
  return (
    <div className="max-w-[68rem] mx-auto">
      <Link to={"/create"} className="bg-green-600 text-white rounded py-2.5 flex justify-center items-center gap-2 w-[11rem] transition-all hover:bg-green-700">
        Create User <BsPlusCircleFill />
      </Link>

      {users.length > 0 ? (
        <Table className="text-center mt-6 border border-gray-400 rounded">
          <TableHeader>
            <TableRow className="border border-gray-400 text-[1rem]">
              <TableHead className="w-[25%] text-center border-y border-gray-400 py-3">Name</TableHead>
              <TableHead className="w-[20%] text-center border-y border-gray-400 py-3">Age</TableHead>
              <TableHead className="w-[25%] text-center border-y border-gray-400 py-3">Email</TableHead>
              <TableHead className="w-[30%] text-center border border-gray-400 py-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {users && users.length > 0 && getCurrentPageUsers(currentPage, itemsPerPage, users).map((user, index) => (
              <TableRow key={index} className={`border border-gray-400 ${index % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}>
                <TableCell className="border-y border-gray-400 py-3">{user.name}</TableCell>
                <TableCell className="border-y border-gray-400 py-3">{user.age}</TableCell>
                <TableCell className="border-r border-gray-400 py-3">{user.email}</TableCell>
                <TableCell className="flex justify-center gap-3 py-3">
                  <button type="button" className="bg-blue-500 text-white rounded w-[4.5rem] py-1.5 font-medium transition-all hover:bg-blue-700" onClick={() => handleButtonClick(true, user)}>Update</button>
                  <Link to={`/user/${user.id}`} className="bg-emerald-900 text-white rounded w-[4.5rem] py-1.5 font-medium transition-all hover:bg-emerald-950">Show</Link>
                  <button type="button" className="bg-red-500 text-white rounded w-[4.5rem] py-1.5 font-medium transition-all hover:bg-red-700" onClick={() => handleButtonClick(false, user)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="mt-12 font-semibold italic text-center text-lg">Sem usuário cadastrado. Cadastre clicando no botão acima!</p>
      )}

      <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />

      {modalEdit && (
        <ModalUpdate isOpen={modalEdit} onClose={() => setModalEdit(false)} user={selectedUser} setUsers={setUsers} />
      )}

      {modalConfirm && (
        <ModalConfirm isOpen={modalConfirm} onClose={() => setModalConfirm(false)} user={selectedUser} setUsers={setUsers} />
      )}
    </div> 
  )
}

export default TableUsers