import { Item } from "@/lib/types"
import { cn } from "@/lib/utils"
import React from "react"
import { Video } from "./video"
import { Button } from "./ui/button"

type ComparisonProps = {
  item1: Item
  item2: Item
  onChoice: (item: Item) => void
}

const Comparison = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ComparisonProps
>(({ item1, item2, onChoice, className, ...props }, ref) => {
  function itemView(item: Item) {
    return (
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-lg">{item.title}</h2>
        {item.videoId && <Video videoId={item.videoId} />}
        <Button
          variant="outline"
          size="lg"
          className="mt-4"
          onClick={() => onChoice(item)}
        >
          Choose
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-8", className)} {...props} ref={ref}>
      {itemView(item1)}
      {itemView(item2)}
    </div>
  )
})

Comparison.displayName = "Comparison"

export { Comparison }
