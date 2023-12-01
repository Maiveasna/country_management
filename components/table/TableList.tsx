"use client";

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import _ from "lodash"

import { CountryTpe } from "@/lib/types/CountryTypeApi"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import ModalCountryDetail from "../modal/ModalCountryDetail"
import Pagination from "../pagination/Pagination"
import { Input } from "../ui/input"

const dataSort = ["default", "asc", "desc"]

type Props = {
  data?: CountryTpe[]
  searchQuery?: string
  useApi?: number
}

let PageSize = 25
function TableList({ data = [], useApi, searchQuery }: Props) {
  const [dataLocal, setDataLocal] = useState(() => data)
  const [useSearchWithApi, setSearchApi] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [countryDetail, setCountryDetail] = useState<{
    data?: CountryTpe | {}
    open: boolean
  }>({ data: {}, open: false })
  const [sort, setSort] = useState<"asc" | "desc" | "default" | string>(
    "default"
  )

  useEffect(() => {
    /// initial state
    if (Number(useApi) == 1) {
      setSearchApi(true)
    } else {
      setSearchApi(false)
    }
    setDataLocal(data)
    setSearch(searchQuery || "")
  }, [JSON.stringify(data), useApi, searchQuery])

  ///  bind data by search, sort, pagination
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return dataLocal?.slice(firstPageIndex, lastPageIndex).sort((a, b) => {
      // sort data
      if (sort == "asc") return a.name.official > b.name.official ? 1 : -1
      else if (sort == "desc") {
        return a.name.official < b.name.official ? 1 : -1
      } else return 0
    })
  }, [currentPage, dataLocal, sort])

  //  set search value and filter data by search
  const handleSearch = (e: any) => {
    const val = e.target.value
    if (useSearchWithApi) {
      router.replace(`?use_api=${useApi}&s=${val}`) ///for server-side
    } else {
      setCurrentPage(1)
      const searchData = !_.isEmpty(val)
        ? data?.filter((item: CountryTpe) =>
            item.name.official.toLowerCase().includes(val.toLowerCase().trim())
          )
        : data
      setDataLocal(searchData)
    }
    setSearch(val)
  }

  // the debounce use for user typing... with delay timeout
  const handleChange = _.debounce(async (e) => {
    await handleSearch(e)
  }, 300)

  const handleSort = (e: string) => {
    setCurrentPage(1) // reset to page 1
    setSort(e)
  }

  const handleCountryDetail = (data?: CountryTpe | {}) => {
    setCountryDetail({ data: data, open: true })
  }

  const handleUseApi = (e: boolean) => {
    // this function handle checked using api. if this value equal 1 then use api and if equal 0 then not use api (search data in local)
    if (search) {
      router.replace(`?s=${search}&use_api=${e ? 1 : 0}`)
    } else {
      if (search) {
      } else {
        router.replace(`?use_api=${e ? 1 : 0}`)
      }
    }
  }

  return (
    <Table className="w-full flex  flex-col">
      <ModalCountryDetail
        onClose={() => setCountryDetail({ ...countryDetail, open: false })}
        open={countryDetail?.open}
        data={countryDetail?.data}
      />
      <TableHeader className="w-full flex flex-col space-y-4 ">
        <TableRow className=" flex justify-end pb-4 border-none bg-background hover:bg-background">
          <TableHead className="py-2 flex justify-end items-center space-x-4 ">
            <div
              className={`flex items-center space-x-2 ${
                _.isEmpty(search) ? "" : "opacity-50 pointer-events-none"
              }`}
            >
              <Checkbox
                onCheckedChange={(e) => handleUseApi(e as boolean)}
                checked={useSearchWithApi}
                className=" w-6 h-6"
                id="use_api"
              />
              <label
                htmlFor="use_api"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Search With API
              </label>
            </div>
            <Input
              type="text"
              defaultValue={search}
              onChange={(e) => handleChange(e)}
              placeholder="Search..."
              className="w-72"
            />
          </TableHead>
          <TableHead className="py-2 pr-2 flex items-center justify-center">
            <Select defaultValue={sort} onValueChange={(e) => handleSort(e)}>
              <SelectTrigger className="capitalize">
                <span className="pr-2"> Sort Name By: </span>
                <SelectValue placeholder="Sort By Country Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="capitalize">{sort}</SelectLabel>
                  {dataSort?.map((s, index) => {
                    return (
                      <SelectItem key={index} className="capitalize" value={s}>
                        {s}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableHead>
        </TableRow>
        <TableRow className="grid grid-cols-7 bg-background hover:bg-background">
          <TableHead className=" whitespace-nowrap">Flags</TableHead>
          <TableHead className=" text-left">Country Name(Official)</TableHead>
          <TableHead className="  text-left">Country code (cca2)</TableHead>
          <TableHead className="  text-left">Country code (cca3)</TableHead>
          <TableHead className="  text-left ">Native Country Name</TableHead>
          <TableHead className="  text-left whitespace-nowrap">
            Altermative Country Name
          </TableHead>
          <TableHead className="text-right">Country Calling Code</TableHead>
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
            <TableCell
              onClick={() => handleCountryDetail(coun)}
              className="font-medium cursor-pointer hover:text-primary"
            >
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
        {currentTableData?.length == 0 && (
          <div className=" flex items-center justify-center py-4">No Data</div>
        )}
      </TableBody>
      <TableFooter className=" w-full">
        <TableRow className="  w-full flex justify-between items-center">
          <TableCell className=" flex w-full ">
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