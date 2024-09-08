import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../types/types";
import { usersService } from "../services/api/users/usersService";
import { ApiException } from "../services/api/apiException";

interface UsersContext {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>
}

interface Props {
  children: ReactNode
}

const UsersContext = createContext({} as UsersContext)

export const UsersProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    usersService.getAll()
    .then((result) => {
      if(result instanceof ApiException) {
        alert(result.message)

        return 
      }

      setUsers(result.reverse())
    })
  }, [])

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export function useUsersContext() {
  return useContext(UsersContext)
}