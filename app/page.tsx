import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { getCountryList } from "@/lib/fetch/fetch-list"
import { CountryTpe } from "@/lib/types/CountryTypeApi"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
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
