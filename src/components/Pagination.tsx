interface PaginationProps {
 currentPage: number;
 totalPages: number;
 onPageChange: (page: number) => void;
}

export default function Pagination({
 currentPage,
 totalPages,
 onPageChange,
}: PaginationProps) {
 return (
  <div className='flex justify-center items-center gap-2 mt-4 mb-8'>
   <button
    onClick={() => onPageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-3 py-1 rounded ${
     currentPage === 1
      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
      : 'bg-[#FFD823] text-black hover:bg-[#e6c31f]'
    }`}>
    Previous
   </button>
   <span className='text-white'>
    Page {currentPage} of {totalPages}
   </span>
   <button
    onClick={() => onPageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 rounded ${
     currentPage === totalPages
      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
      : 'bg-[#FFD823] text-black hover:bg-[#e6c31f]'
    }`}>
    Next
   </button>
  </div>
 );
}
