import { Dispatch, SetStateAction } from "react";
import { getPinaginationButtons, handlePageChange } from "../utils/pagination"

interface Props {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const PaginationButtons = ({ currentPage, totalPages, setCurrentPage }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
      <button 
        type="button" 
        className="px-4 py-2 rounded-[0.35rem] bg-black text-white w-[6.5rem] cursor-pointer hover:bg-blackHover" 
        onClick={() => handlePageChange(currentPage - 1, totalPages, setCurrentPage)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <div className="flex flex-wrap justify-center">
        {getPinaginationButtons(currentPage, totalPages).map(page => (
          <button 
            type="button" 
            key={page} 
            onClick={() => handlePageChange(page, totalPages, setCurrentPage)}
            className={`border-2 px-4 py-2 mx-1 rounded-full transition-none ${page === currentPage ? 'bg-black text-white ' : "hover:border-black"}`}
          >
            {page}
          </button>
        ))}
      </div>

      <button 
        type="button" 
        className="px-4 py-2 rounded-[0.35rem] bg-black text-white w-[6.5rem] cursor-pointer hover:bg-blackHover" 
        onClick={() => handlePageChange(currentPage + 1, totalPages, setCurrentPage)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationButtons