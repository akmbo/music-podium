import { Medal, Plus } from "lucide-react"
import { ListItem } from "./components/list-item"
import { Button } from "./components/ui/button"

function App() {
  return (
    <div className="flex place-items-center min-w-full mt-24 space-y-16 flex-col">
      <div className="flex justify-center items-center gap-4">
        <Medal className="size-7" />
        <h1 className="text-4xl font-bold">Music Podium</h1>
      </div>
      <div className="flex place-items-center flex-col gap-4">
        <ListItem className="w-[512px]" />
        <ListItem className="w-[512px]" />
        <ListItem className="w-[512px]" />
        <Button className="flex gap-1 mt-6">
          <Plus />
          <span>Add</span>
        </Button>
      </div>
    </div>
  )
}

export default App
