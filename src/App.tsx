import { Medal } from "lucide-react"
import { ListEditor } from "./components/list-editor"
import { Item } from "./lib/types"
import { useEffect, useState } from "react"

const defaultItems: Item[] = [
  { id: String(Date.now() - 3) },
  { id: String(Date.now() - 2) },
  { id: String(Date.now() - 1) },
]

function App() {
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

  function handleAdd() {
    setItems((prevItems) => [...prevItems, { id: String(Date.now()) }])
  }

  return (
    <div className="flex place-items-center min-w-full my-24 space-y-16 flex-col px-12">
      <div className="flex justify-center items-center gap-4">
        <Medal className="size-6 sm:size-7" />
        <h1 className="text-2xl sm:text-4xl font-bold text-nowrap">
          Music Podium
        </h1>
      </div>
      <ListEditor
        className="max-w-[512px]"
        items={items}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onReset={handleReset}
        onUpdate={handleUpdate}
      />
    </div>
  )
}

export default App
