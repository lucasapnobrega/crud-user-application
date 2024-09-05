import { Dispatch, SetStateAction } from "react"
import { User } from "../types/types"

export const handlePageChange = (page: number, totalPages: number, setCurrentPage: Dispatch<SetStateAction<number>>) => {
  if(page > 0 && page <= totalPages) {
    setCurrentPage(page)
  }
}

export const getCurrentPageUsers = (currentPage: number, itemsPerPage: number, users: User[]) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return users.slice(startIndex, endIndex)
}

export const getPinaginationButtons = (currentPage: number, totalPages: number) => {
  const buttons: number[] = []

  let startPage = Math.max(1, currentPage - 2)
  let endPage = Math.min(totalPages, currentPage + 2)

  if(currentPage <= 3) {
    endPage = Math.min(totalPages, 5)
  }

  if(currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - 4)
  }

  for(let page = startPage; page <= endPage; page++) {
    buttons.push(page)
  }

  return buttons
}