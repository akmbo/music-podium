import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Check, Edit, Link, Trash } from "lucide-react"
import { Item } from "@/lib/types"

type ListItemProps = {
  item: Item
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemProps
>(({ item, className, ...props }, ref) => {
  const [isEditing, setIsEditing] = useState(true)
  const [itemProps, setItemProps] = useState<ListItemProps>({ item })

  function handleSave(item: Item) {
    setIsEditing(false)
    setItemProps({ item })
  }

  return (
    <>
      {isEditing ? (
        <ListItemEditor
          className={cn("w-[256px]", className)}
          {...props}
          ref={ref}
          onSave={handleSave}
          item={itemProps.item}
        />
      ) : (
        <ListItemView
          className={cn("w-[256px]", className)}
          {...props}
          ref={ref}
          onEdit={() => setIsEditing(true)}
          item={itemProps.item}
        />
      )}
    </>
  )
})

ListItem.displayName = "ListItem"

type ListItemViewProps = {
  onEdit: () => void
}

const ListItemView = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemViewProps & ListItemProps
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
  onSave: (item: Item) => void
}

const ListItemEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemEditorProps & ListItemProps
>(({ item, onSave, className, ...props }, ref) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn("flex gap-4", className)} {...props} ref={ref}>
      <Input placeholder="Title" defaultValue={item.title} ref={titleRef} />
      <Input placeholder="Video URL" defaultValue={item.url} ref={urlRef} />
      <Button
        size="icon"
        onClick={() =>
          onSave({
            title: titleRef.current?.value,
            url: urlRef.current?.value,
            id: item.id,
          })
        }
      >
        <Check />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash />
      </Button>
    </div>
  )
})

ListItemEditor.displayName = "ListItemEditor"

export { ListItem }
