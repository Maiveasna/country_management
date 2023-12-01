
import { Metadata, ResolvingMetadata } from "next"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { getCountryList } from "@/lib/fetch/fetch-list"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/container/container"

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
  }
}) {
  const { query } = searchParams ?? {}
  const { data } = await getCountryList()

  return (
    <Container>
      <div className=" flex flex-col">
        {data?.map((coun: any, index: number) => {
          return (
              <Link
              key={index}
                className="flex grid grid-cols-5 gap-4"
                href={`/images/${coun?.idd?.root}`}
              >
                 <span> idd: {coun?.idd?.root}</span>
                <span> name official: {coun?.name?.official}</span>
                <span> / cca2:{coun?.cca2}</span>
                <span> / cca3:{coun?.cca3}</span>
                <span> / cca3:{coun?.altSpellings?.join(",")}</span>
              </Link>
          )
        })}{" "}
        </div>
    </Container>
  )
}
