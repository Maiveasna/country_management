"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Icons } from "../icons"

export function SearchBottomSheet() {
  return (
    <Sheet key="bottom">
      <SheetTrigger asChild>
        <Icons.search className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        //iconClose={<Icons.x className="h-5 w-5 mr-4 mt-4" color="red" />}
        className="w-[100vw]"
      >
        <SheetHeader>
          <SheetTitle className=" text-left">
            <Input placeholder="Search ...." color="primary" />
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-full h-[80vh]">Hello</div>
      </SheetContent>
    </Sheet>
  )
}

export default SearchBottomSheet
