import React from "react"
import clsx from "clsx"

import { DOTS, usePagination } from "../../lib/hook/usePagination"
import { Button } from "../ui/button"

type Props = {
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
  onPageChange: (page: number) => void
}
const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  let lastPage = paginationRange[paginationRange.length - 1]

  //  return <div> page</div>
  return (
    <div className=" w-full flex justify-between items-center">
        <div className=" flex ">Per page : {pageSize}</div>
       <ul className={clsx("flex space-x-2 ", className)}>
      <Button  variant={  currentPage === 1 ?  "secondary" :  "default" }   onClick={onPrevious} disabled={ currentPage === 1}>
      Prev
      </Button>
      {paginationRange.map((pageNumber , index) => {
        if (pageNumber === DOTS) {
          return <li key={index} className="pagination-item dots">&#8230;</li>
        }
        return (
          <Button  key={index} onClick={() => onPageChange(pageNumber)}  variant={ pageNumber === currentPage ?  "default" : "outline"} disabled={ pageNumber === currentPage}>  {pageNumber}</Button>
        )
      })}
      
      <Button   variant={ currentPage === lastPage ?  "secondary" :  "default" }   onClick={onNext} disabled={ currentPage === lastPage}>
      Next
      </Button>
    </ul>
    </div>
    
  )
}

export default Pagination
