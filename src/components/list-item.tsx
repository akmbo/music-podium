import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Check, Edit, Link, Trash } from "lucide-react"
import { Item } from "@/lib/types"

type ListItemProps = {
  item: Item
  onDelete: (item: Item) => void
  onUpdate: (item: Item) => void
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemProps
>(({ item, onDelete, onUpdate, className, ...props }, ref) => {
  const [isEditing, setIsEditing] = useState(true)

  function handleUpdate(item: Item) {
    onUpdate(item)
    setIsEditing(false)
  }

  return (
    <>
      {isEditing ? (
        <ListItemEditor
          className={cn("w-[256px]", className)}
          {...props}
          ref={ref}
          onUpdate={handleUpdate}
          onDelete={() => onDelete(item)}
          item={item}
        />
      ) : (
        <ListItemView
          className={cn("w-[256px]", className)}
          {...props}
          ref={ref}
          onEdit={() => setIsEditing(true)}
          item={item}
        />
      )}
    </>
  )
})

ListItem.displayName = "ListItem"

type ListItemViewProps = {
  item: Item
  onEdit: () => void
}

const ListItemView = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemViewProps
>(({ item, onEdit, className, ...props }, ref) => {
  return (
    <div
      className={cn("flex gap-4 items-center", className)}
      {...props}
      ref={ref}
    >
      <p className="overflow-ellipsis text-nowrap flex-grow">{item.title}</p>
      <a href={item.url} target="_blank">
        <Button size="icon" variant="ghost">
          <Link />
        </Button>
      </a>
      <Button size="icon" onClick={onEdit}>
        <Edit />
      </Button>
    </div>
  )
})

ListItemView.displayName = "ListItemView"

type ListItemEditorProps = {
  item: Item
  onDelete: (item: Item) => void
  onUpdate: (item: Item) => void
}

const ListItemEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemEditorProps
>(({ item, onDelete, onUpdate, className, ...props }, ref) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn("flex gap-4", className)} {...props} ref={ref}>
      <Input placeholder="Title" defaultValue={item.title} ref={titleRef} />
      <Input placeholder="Video URL" defaultValue={item.url} ref={urlRef} />
      <Button
        size="icon"
        onClick={() =>
          onUpdate({
            title: titleRef.current?.value,
            url: urlRef.current?.value,
            id: item.id,
          })
        }
      >
        <Check />
      </Button>
      <Button size="icon" variant="destructive" onClick={() => onDelete(item)}>
        <Trash />
      </Button>
    </div>
  )
})

ListItemEditor.displayName = "ListItemEditor"

export { ListItem }
