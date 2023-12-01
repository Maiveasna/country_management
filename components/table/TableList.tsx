"use client"

import { useMemo, useState } from "react"
import Image from "next/image"

import { CountryTpe } from "@/lib/types/CountryTypeApi"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Pagination from "../pagination/Pagination"
import { Input } from "../ui/input"

type Props = {
  data?: CountryTpe[]
}

let PageSize = 25
function TableList({ data = [] }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return data?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  console.log("pppp page", currentTableData)

  return (
    <Table className="w-full flex  flex-col">
      <TableHeader className=" bg-white w-full space-y-4">
        {/*<TableHead colSpan={1} className=" whitespace-nowrap">
          <Input placeholder="Search" />
        </TableHead>*/}
        <TableRow className=" grid grid-cols-7">
          <TableHead colSpan={1} className=" whitespace-nowrap">
            Flags
          </TableHead>
          <TableHead className=" text-left">Country Name(Official)</TableHead>
          <TableHead className="  text-left">Country code (cca2)</TableHead>
          <TableHead className="  text-left">Country code (cca3)</TableHead>
          <TableHead className="  text-left ">Native Country Name</TableHead>
          <TableHead className="  text-left whitespace-nowrap">
            Altermative Country Name
          </TableHead>
          <TableHead className="  text-right">Country Calling Code</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-scroll w-full">
        {currentTableData?.map((coun: any, index: number) => (
          <TableRow className="grid grid-cols-7" key={index}>
            <TableCell className=" flex items-center justify-start">
              <Image
                alt={coun?.flags?.png}
                src={coun?.flags?.png}
                height={50}
                width={50}
              />
            </TableCell>
            <TableCell className="font-medium">
              {coun?.name?.official}
            </TableCell>
            <TableCell>{coun?.cca2}</TableCell>
            <TableCell>{coun?.cca3}</TableCell>
            <TableCell>
              {[
                coun?.name?.nativeName?.eng?.common,
                coun?.name?.nativeName?.eng?.official,
              ].join("")}
            </TableCell>
            <TableCell className=" ">
              <div className="line-clamp-3">
                {coun?.altSpellings.join(", ")}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className=" line-clamp-3 ">
                {[coun?.idd?.root, ...coun?.idd?.suffixes].join(", ")}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className=" w-full">
        <TableRow className="  w-full flex justify-between items-center">
          <TableCell className=" flex ">Per page : {PageSize}</TableCell>
          <TableCell
            colSpan={9}
            className=" flex justify-end 
          "
          >
            <Pagination
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default TableList
