import { cn } from "@/lib/utils"
import { Delete, Plus } from "lucide-react"
import { ListItem } from "./list-item"
import { Button } from "./ui/button"
import { Item } from "@/lib/types"
import React from "react"

type ListEditorProps = {
  items: Item[]
  onAdd: () => void
  onDelete: (item: Item) => void
  onUpdate: (item: Item) => void
  onReset: () => void
}

const ListEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListEditorProps
>(({ items, onAdd, onDelete, onUpdate, onReset, className, ...props }, ref) => {
  const itemsView = items.map((item, i) => (
    <div key={item.id} className="w-full flex items-center gap-4">
      <p className="font-bold text-muted-foreground opacity-50">
        {i + 1 + "."}
      </p>
      <ListItem
        className="w-full grow"
        item={item}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  ))

  return (
    <div
      className={cn("flex place-items-center w-full flex-col gap-4", className)}
      {...props}
      ref={ref}
    >
      {itemsView}
      <div className="relative flex items-center justify-center w-full">
        <Button className="flex gap-1 mt-6" onClick={onAdd}>
          <Plus />
          <span>Add</span>
        </Button>
        <Button
          className="flex gap-1 mt-6 absolute right-0"
          onClick={onReset}
          variant="ghost"
        >
          <Delete />
          <span>Reset</span>
        </Button>
      </div>
    </div>
  )
})

ListEditor.displayName = "ListEditor"

export { ListEditor }
