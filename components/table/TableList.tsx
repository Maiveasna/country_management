"use client"

import {
  Table,
  TableBody, TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { CountryTpe } from "@/lib/types/CountryTypeApi"
import _ from "lodash"
import Image from "next/image"
import { useCallback, useMemo, useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import Pagination from "../pagination/Pagination"
import { Input } from "../ui/input"

const dataSort = [
  "default" ,
  "asc" ,
  "desc"
]

type Props = {
  data?: CountryTpe[]
  searchQuery?: string
}

let PageSize = 25
function TableList({ data = [] , searchQuery }: Props) {
  const [ dataLocal ,  setDataLocal] = useState( () => data)
  const [currentPage, setCurrentPage] = useState(1)
   const [ sort , setSort ] = useState<"asc" | "desc" | "default"  | string>("default")
  const [search, setSearch] =useState("");
  
  ///  bind data by search, sort, pagination
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return dataLocal?.slice(firstPageIndex, lastPageIndex).sort((a, b) => {
      // sort data 
      if(sort == "asc")
     return   a.name.official  >   b.name.official  ? 1 : -1
     else if (sort == "desc") {
       return   a.name.official  <   b.name.official  ? 1 : -1
     }else return 0
   })
  }, [currentPage , dataLocal , sort])
  
  
//  set search value and filter data by search
   const handleSearch = (e: any) => {
    const search = e.target.value
     setCurrentPage(1)
    const searchData = e.target.value ? data?.filter((item: CountryTpe) =>
    [item.name.official].join(" ").toLowerCase().includes(search.toLowerCase().trim())) : data
     setSearch(e.target.value)
     setDataLocal(searchData)
     //router.replace(`?s=${search}` for server-side
   }
   
  // the debounce use for user typing... with delay timeout
   const handleChange = useCallback(
    _.debounce(e => handleSearch(e), 100) , [search]
    );
  
     const handleSort = (e:string) => {
      setCurrentPage(1) // reset to page 1
      setSort(e)
     }
    
  return (
    <Table className="w-full flex  flex-col">
      <TableHeader className="w-full flex flex-col space-y-4 ">
         <TableRow  className=" flex justify-end pb-4 border-none">
           <TableHead className="py-2 flex justify-end " >
            <Input type="text" defaultValue={search} onChange={(e) => handleChange(e)} placeholder="Search..." className="w-72" />
          </TableHead>
          <TableHead className="py-2 pl-0 pr-2 flex items-center justify-center">
          <Select  defaultValue={sort} onValueChange={e =>  handleSort(e)}>
          
            <SelectTrigger className="capitalize">
               <span className="pr-2"> Sort Name By: </span>
              <SelectValue placeholder="Sort By Country Name" />
            </SelectTrigger>
            <SelectContent >
              <SelectGroup >
                <SelectLabel className="capitalize">{sort}</SelectLabel>
                {
                  dataSort?.map((s , index) => {
                    return <SelectItem  key={index} className="capitalize" value={s}>{s}</SelectItem>
                  })
                }
              </SelectGroup>
            </SelectContent>
         </Select>
          </TableHead>
         </TableRow>
        <TableRow  className="grid grid-cols-7">
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
              totalCount={dataLocal.length}
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
