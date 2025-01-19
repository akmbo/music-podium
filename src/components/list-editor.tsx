import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { ListItem } from "./list-item"
import { Button } from "./ui/button"
import { Item } from "@/lib/types"

const ListEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [items, setItems] = useState<Item[]>([
    { id: String(Date.now() - 3) },
    { id: String(Date.now() - 2) },
    { id: String(Date.now() - 1) },
  ])

  function handleDelete(deletedItem: Item) {
    setItems((prevItems) =>
      prevItems.filter((item) => item.id !== deletedItem.id),
    )
  }

  function handleUpdate(updatedItem: Item) {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === updatedItem.id) {
          return updatedItem
        }
        return item
      }),
    )
  }

  const itemsView = items.map((item) => (
    <ListItem
      key={item.id}
      className="w-full"
      item={item}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  ))

  function handleItemAdd() {
    setItems((prevItems) => [...prevItems, { id: String(Date.now()) }])
  }

  return (
    <div
      className={cn("flex place-items-center w-full flex-col gap-4", className)}
      {...props}
      ref={ref}
    >
      {itemsView}
      <Button className="flex gap-1 mt-6" onClick={handleItemAdd}>
        <Plus />
        <span>Add</span>
      </Button>
    </div>
  )
})

ListEditor.displayName = "ListEditor"

export { ListEditor }
