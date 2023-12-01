import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}
export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2 justify-center">
        <Image
          height="18"
          width="30"
          alt="/assets/flag.png"
          src="/assets/flag.png"
        />
        <span className="inline-block text-lg font-bold text-teal-500">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
