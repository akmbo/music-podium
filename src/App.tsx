import { Medal } from "lucide-react"
import { ListEditor } from "./components/list-editor"

function App() {
  return (
    <div className="flex place-items-center min-w-full my-24 space-y-16 flex-col px-12">
      <div className="flex justify-center items-center gap-4">
        <Medal className="size-6 sm:size-7" />
        <h1 className="text-2xl sm:text-4xl font-bold text-nowrap">
          Music Podium
        </h1>
      </div>
      <ListEditor className="max-w-[512px]" />
    </div>
  )
}

export default App
