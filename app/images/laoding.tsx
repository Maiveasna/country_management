import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/container/container"

export default async function Loading() {
  return (
    <Container>
      <div className="w-full  grid grid-cols-1 gap-4">
        {[1, 2, 3, 4]?.map((ske) => {
          return (
            <div key={ske} className="w-full h-32 lg:h-72">
              <Skeleton className="w-full h-24" />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
