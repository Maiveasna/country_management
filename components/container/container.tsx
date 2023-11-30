import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

type Props = {
  className?: any
  children: JSX.Element
  ref?: any
  asChild?: boolean
}

const containerVariants = cva("flex flex-col space-y-4 w-full", {
  variants: {
    flex: {},
    grid: {
      default: "w-full",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline text-primary",
    },
    size: {
      default: "w-full px-4 py-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    grid: "default",
    size: "default",
  },
})

export interface ContainerProps
  extends Props,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

const Container = ({
  children,
  asChild,
  ref,
  grid,
  size,
  className,
}: ContainerProps) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      className={cn(containerVariants({ grid, size, className }))}
      ref={ref}
    >
      {children}
    </Comp>
  )
}

export default Container
