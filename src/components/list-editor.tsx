import { cn } from "@/lib/utils"
import { Delete, Plus } from "lucide-react"
import React, { useEffect, useState } from "react"
import { ListItem } from "./list-item"
import { Button } from "./ui/button"
import { Item } from "@/lib/types"

const defaultItems: Item[] = [
  { id: String(Date.now() - 3) },
  { id: String(Date.now() - 2) },
  { id: String(Date.now() - 1) },
]

const ListEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("items")
    return savedItems ? JSON.parse(savedItems) : [...defaultItems]
  })

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

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

  function handleReset() {
    setItems(() => [...defaultItems])
  }

  const itemsView = items.map((item, i) => (
    <div className="w-full flex items-center gap-4">
      <p className="font-bold text-muted-foreground opacity-50">
        {i + 1 + "."}
      </p>
      <ListItem
        key={item.id}
        className="w-full grow"
        item={item}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
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
      <div className="relative flex items-center justify-center w-full">
        <Button className="flex gap-1 mt-6" onClick={handleItemAdd}>
          <Plus />
          <span>Add</span>
        </Button>
        <Button
          className="flex gap-1 mt-6 absolute right-0"
          onClick={handleReset}
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
