import { useEffect, useState } from "react"
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
import { toast } from "sonner"

const TableUsers = () => {
  const { users, setUsers } = useUsersContext()
  const [search, setSearch] = useState("")
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [modalConfirm, setModalConfirm] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User>({ name: "", age: 0, email: "", profileImage: "", height: 0, sex: "" ,createdAt: "", weight: 0 })
  const [filteredData, setFilteredData] = useState<User[]>([])
  const [filterBy, setFilterBy] = useState<string>("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalUsers = filteredData?.length || 0
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  const handleButtonClick = (isEdit: boolean, user: User) => {
    setSelectedUser(user)

    if(isEdit) 
      return setModalEdit(true)                     
    
    setModalConfirm(true)
  }

  useEffect(() => {
    if(search === "") return setFilteredData(users)

    if(search) {
      const usersSearch = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
      setFilteredData(usersSearch)
      setCurrentPage(1)
    }
  }, [search])

  useEffect(() => {
    if(users) setFilteredData(users)
  }, [users])

  useEffect(() => {
    if(filterBy === "" || filterBy === "clear") {
      setFilteredData(users)

      if(filterBy === "clear") toast.info("All Filters Clean", { duration: 1750 })

      return
    }

    if(filterBy === "nameAsc") {
      setFilteredData(data => [...data].sort((a, b) => a.name.localeCompare(b.name)))
      toast.info("Filtering by Ascending Name", { duration: 1750 })
      return
    }

    if(filterBy === "nameDesc") {
      setFilteredData(data => [...data].sort((a, b) => b.name.localeCompare(a.name)))
      toast.info("Filtering by Descending Name", { duration: 1750 })
      return
    }

    if(filterBy === "ageAsc") {
      setFilteredData(data => [...data].sort((a, b) => a.age - b.age))
      toast.info("Filtering by Ascending Age", { duration: 1750 })
      return
    }

    if(filterBy === "ageDesc") {
      setFilteredData(data => [...data].sort((a, b) => b.age - a.age))
      toast.info("Filtering by Descending Age", { duration: 1750 })
      return
    }
  }, [filterBy])
  
  return (
    <div className="max-w-[68rem] mx-auto">
      <div className="flex justify-between">
        <Link to={"/create"} className="bg-green-600 text-white rounded py-2.5 flex justify-center items-center gap-2 w-[11rem] transition-all hover:bg-green-700">
          Create User <BsPlusCircleFill />
        </Link>

        {filteredData.length > 0 && (
          <select name="filter" id="filter" className="w-[10rem] rounded px-1 text-[0.92rem] cursor-pointer" onChange={(ev) => setFilterBy(ev.target.value)}>
            <option value="" disabled selected>Filter By</option>
            <option value="clear">Clear Filters</option>
            <option value="nameAsc">Name Ascending</option>
            <option value="nameDesc">Name Descending </option>
            <option value="ageAsc">Age Ascending</option>
            <option value="ageDesc">Age Descending </option>
          </select>
        )}

        {users && users.length > 0 && (
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by Name"
            className="rounded-[0.4rem] w-[14rem] border text-sm pl-2"
            onChange={(ev) => setSearch(ev.target.value)}
          />
        )}
      </div>

      {filteredData.length > 0 ? (
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
            {users && users.length > 0 && getCurrentPageUsers(currentPage, itemsPerPage, filteredData).map((user, index) => (
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
      ) : search.length > 0 ? (
        <p className="mt-12 font-semibold italic text-center text-lg">We couldn't find any user with that name</p>
      ) : (
        <p className="mt-12 font-semibold italic text-center text-lg">No user found. Register by clicking the button above!</p>
      )}

      {filteredData.length > 0 && (
        <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      )}
      

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