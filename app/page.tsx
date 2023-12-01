import { Metadata, ResolvingMetadata } from "next"
import _ from "lodash"

import { getCountryList } from "@/lib/fetch/fetch-list"
import Container from "@/components/container/container"
import TableList from "@/components/table/TableList"

export async function generateMetadata(
  props: { params?: { id?: string }; searchParams?: { query?: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Country Management",
    icons: [{ url: "/assets/flag.png" }],
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id?: string }
  searchParams?: {
    query?: string
    s?: string // search ,
    use_api?: number
  }
}) {
  const { query, s, use_api } = searchParams ?? {}
  const search = decodeURIComponent(s || "").trim()
  const data = (await getCountryList({ search: search })) || []
  console.log("pppp::", data)
  return (
    <Container>
      <TableList useApi={use_api} searchQuery={search} data={data} />
    </Container>
  )
}
