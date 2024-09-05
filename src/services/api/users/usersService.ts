import { User } from "../../../types/types";
import { Api } from "../apiConfig"
import { ApiException } from "../apiException";

const getAll = async(): Promise<User[] | ApiException> => {
  try {
    const { data } = await Api().get("/teste")

    return data
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao pegar os usuários")
  }
}

const getById = async(id: string): Promise<User | ApiException> => {
  try {
    const { data } = await Api().get(`/teste/${id}`)

    return data
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao buscar usuário")
  }
}


const createUser = async(values: User): Promise<User | ApiException> => {
  try {
    const { data } = await Api().post("/teste", values)

    return data
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao criar usuário")
  }
}

const updateUser = async(values: User): Promise<User | ApiException> => {
  try {
    const { data } = await Api().put(`/teste/${values.id}`, values)

    return data
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao atualizar usuário")
  }
}

const deleteUser = async(id: string): Promise<number | ApiException> => {
  try {
    const { status } = await Api().delete(`/teste/${id}`)

    return status
  } catch (error: any) {
    return new ApiException(error.message || "Erro ao deletar usuário")
  }
}

export const usersService = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
}