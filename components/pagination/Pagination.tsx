import React from "react"
import clsx from "clsx"

import { DOTS, usePagination } from "../../lib/hook/usePagination"

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
    <ul className={clsx("flex space-x-4 w-full", className)}>
      <li
        className={clsx(
          " flex items-center justify-center",
          currentPage === 1
            ? "pointer-events-none text-gray-200"
            : "  cursor-pointer"
        )}
        onClick={onPrevious}
      >
        Prev
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>
        }

        return (
          <li
            className={clsx(
              " w-10 h-10 rounded-full border flex items-center justify-center",
              pageNumber === currentPage
                ? " text-teal-500 border-teal-500 "
                : "text-black"
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={clsx(
          " flex items-center justify-center",
          currentPage === lastPage
            ? " pointer-events-none text-gray-200"
            : " cursor-pointer"
        )}
        onClick={onNext}
      >
        Next
      </li>
    </ul>
  )
}

export default Pagination
