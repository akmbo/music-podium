import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import React from "react"
import { ListItem } from "./list-item"
import { Button } from "./ui/button"

const ListEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("flex place-items-center w-full flex-col gap-4", className)}
      {...props}
      ref={ref}
    >
      <ListItem className="w-full" item={{ id: "1" }} />
      <ListItem className="w-full" item={{ id: "2" }} />
      <ListItem className="w-full" item={{ id: "3" }} />
      <Button className="flex gap-1 mt-6">
        <Plus />
        <span>Add</span>
      </Button>
    </div>
  )
})

ListEditor.displayName = "ListEditor"

export { ListEditor }
