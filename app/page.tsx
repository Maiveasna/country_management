import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/container/container"

export default function IndexPage() {
  return (
    <Container>
      {/*<Skeleton className="w-[100px] h-[30px] rounded-lg" />
      <Button size="sm">
        <span>Click Me</span>
      </Button>*/}
      <div>Home</div>
    </Container>
  )
}
