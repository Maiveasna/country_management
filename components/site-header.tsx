import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import Container from "./container/container"
import MenuSidebar from "./modal/MenuSidebar"
import SearchBottomSheet from "./modal/SearchBottomSheet"

export function SiteHeader() {
  return (
    <Container className=" border-b">
      <header className="bg-background sticky top-0 z-40 w-full">
        <div className=" w-full flex  items-center justify-between">
          <MainNav items={siteConfig.mainNav} />
          <div className="md:flex flex-1 items-center justify-end space-x-4 hidden">
            <nav className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                >
                  <Icons.twitter className="h-5 w-5 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ThemeToggle />
              <Image
                alt="avarta"
                height={30}
                width={30}
                className=" rounded-full border border-gray-100"
                src={"https://avatars.githubusercontent.com/u/59038294?v=4"}
              />
            </nav>
          </div>
          <div className="md:hidden items-center justify-center flex space-x-2">
            {/*<SearchBottomSheet />*/}
            <Link href={"/images"}>
              <Icons.image className="w-5 h-5 " />
            </Link>
            <Link href={"/search"}>
              <Icons.search className="w-5 h-5 " />
            </Link>
            <ThemeToggle />
            <MenuSidebar />
          </div>
        </div>
      </header>
    </Container>
  )
}
