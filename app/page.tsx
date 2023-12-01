import { Metadata, ResolvingMetadata } from "next"

import Container from "@/components/container/container"
import TableList from "@/components/table/TableList"
import { getCountryList } from "@/lib/fetch/fetch-list"

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
    s?: string // search
  }
}) {
  const { query, s } = searchParams ?? {}
  const data = (await getCountryList()) || []
  return (
    <Container>
      <TableList searchQuery={s} data={data} />
    </Container>
  )
}
