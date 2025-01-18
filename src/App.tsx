import { Button } from "./components/ui/button"
import { Video } from "./components/video"

function App() {
  return (
    <div className="flex place-items-center min-h-screen min-w-full justify-center flex-col gap-8">
      <Video url="https://www.youtube.com/embed/DfcWOPpmw14?si=uGsABRrXT37IiC5U"></Video>
      <Button>Click Me</Button>
    </div>
  )
}

export default App
