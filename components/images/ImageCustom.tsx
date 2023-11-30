"use client"

import Image, { ImageProps } from "next/image"

const ImageCustom = (data: ImageProps) => {
  return <Image {...data} />
}

export default ImageCustom
