import { cn } from "@/lib/utils"
import React, { useRef, useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Check, Edit, Link, Trash } from "lucide-react"

type ListItemProps = {
  title?: string
  url?: string
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemProps
>(({ title, url, className, ...props }, ref) => {
  const [isEditing, setIsEditing] = useState(true)
  const [itemProps, setItemProps] = useState<ListItemProps>({ title, url })

  function handleSave(title: undefined | string, url: undefined | string) {
    setIsEditing(false)
    setItemProps({ title, url })
  }

  return (
    <>
      {isEditing ? (
        <ListItemEditor
          className={cn("w-[256px]", className)}
          {...props}
          ref={ref}
          onSave={handleSave}
          title={itemProps.title}
          url={itemProps.url}
        />
      ) : (
        <ListItemView
          className={cn("w-[256px]", className)}
          {...props}
          ref={ref}
          onEdit={() => setIsEditing(true)}
          title={itemProps.title}
          url={itemProps.url}
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
>(({ title, url, onEdit, className, ...props }, ref) => {
  return (
    <div
      className={cn("flex gap-4 items-center", className)}
      {...props}
      ref={ref}
    >
      <p className="overflow-ellipsis text-nowrap flex-grow">{title}</p>
      <a href={url} target="_blank">
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
  onSave: (title: undefined | string, url: undefined | string) => void
}

const ListItemEditor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemEditorProps & ListItemProps
>(({ title, url, onSave, className, ...props }, ref) => {
  const titleRef = useRef<HTMLInputElement>(null)
  const urlRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn("flex gap-4", className)} {...props} ref={ref}>
      <Input placeholder="Title" defaultValue={title} ref={titleRef} />
      <Input placeholder="Video URL" defaultValue={url} ref={urlRef} />
      <Button
        size="icon"
        onClick={() => onSave(titleRef.current?.value, urlRef.current?.value)}
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
