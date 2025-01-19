import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Check, Edit, Trash } from "lucide-react"
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
  const [isEditing, setIsEditing] = useState(
    item.title === undefined ||
      item.videoId === undefined ||
      item.title === "" ||
      item.videoId === "",
  )

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
      <div className="flex gap-4 flex-grow items-center min-w-0">
        {item.videoId !== "" && item.videoId !== undefined && (
          <a
            href={`https://www.youtube.com/watch?v=${item.videoId}`}
            target="_blank"
          >
            <img
              src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`}
              alt=""
              className="object-cover h-9 aspect-square rounded-sm"
            />
          </a>
        )}
        <p className="overflow-ellipsis text-nowrap flex-grow overflow-hidden max-w-full min-w-0">
          {item.title}
        </p>
      </div>
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
  const videoIdRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn("flex gap-4", className)} {...props} ref={ref}>
      <Input placeholder="Title" defaultValue={item.title} ref={titleRef} />
      <Input
        placeholder="Video ID"
        defaultValue={item.videoId}
        ref={videoIdRef}
      />
      <Button size="icon" variant="ghost" onClick={() => onDelete(item)}>
        <Trash />
      </Button>
      <Button
        size="icon"
        onClick={() =>
          onUpdate({
            title: titleRef.current?.value,
            videoId: videoIdRef.current?.value,
            id: item.id,
          })
        }
      >
        <Check />
      </Button>
    </div>
  )
})

ListItemEditor.displayName = "ListItemEditor"

export { ListItem }
