import { promises as fs } from "fs"
import path from "path"
import React from "react"
import getConfig from "next/config"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import Container from "@/components/container/container"
import ImageCustom from "@/components/images/ImageCustom"

export default async function Images() {
  const imageDirectory = path.join(process.cwd(), "/public/pizza")
  const imageFilenames = await fs.readdir(imageDirectory)
  //console.log(imageFilenames)
  return (
    <Container>
      <div className="w-full  grid grid-cols-2 gap-4 lg:grid lg:grid-cols-3">
        {imageFilenames?.map((filename) => {
          if (filename.includes(".DS_Store")) return
          return (
            <div key={filename} className="w-full h-32 lg:h-72">
              <ImageCustom
                src={`/pizza/${filename}`}
                alt={filename}
                width={1200}
                height={1200}
                loading="eager"
                className=" rounded-md object-cover w-full h-full "
                placeholder="blur"
                blurDataURL="/pizza/blur.jpeg"
              />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
