import * as React from "react"

import { cn } from "@/lib/utils"

type VideoProps = {
  url: string
  width?: number
  height?: number
}

const Video = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VideoProps
>(({ url, width = 560, height = 315, className, ...props }, ref) => {
  return (
    <div className={cn(className)} ref={ref} {...props}>
      <iframe
        width={width}
        height={height}
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  )
})
Video.displayName = "Video"

export { Video }
