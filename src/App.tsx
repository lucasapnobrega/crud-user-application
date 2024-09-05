import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { Toaster } from "sonner"
import { UsersProvider } from "./contexts/UsersContext"

function App() {
  return (
    <UsersProvider>
      <div className="mb-20">
        <Header />

        <main className="px-[10%]">
          <Outlet />
        </main>

        <Toaster richColors expand duration={2500} />
      </div>
    </UsersProvider>
  )
}

export default App
