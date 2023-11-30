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

export function MenuSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Icons.menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent className="w-[100vw] md:w-[200px]">
        <SheetHeader>
          <SheetTitle className=" text-left">Menu</SheetTitle>
          <SheetDescription className=" text-left leading-4">
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-full">Hello</div>
        <SheetFooter className="flex justify-end">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default MenuSidebar
