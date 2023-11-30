"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"



import { Button } from "@/components/ui/button";





export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <>
     <Button
      variant="ghost"
      size="icon"
       className="md:flex hidden"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
    <div
      className="md:hidden flex p-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.6rem] w-[1.4rem] dark:hidden" />
      <Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </div>
    </>
   
  )
}