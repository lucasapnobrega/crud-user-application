import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { UsersProvider } from "./contexts/UsersContext"
import { SidebarProvider } from "./contexts/SidebarContext"
import Sidebar from "./components/Sidebar/Sidebar"

function App() {
  return (
    <UsersProvider>
      <SidebarProvider>
        <div className="flex">
          <Sidebar />

          <main className="px-[6%] my-10 flex-1">
            <Outlet />
          </main>

          <Toaster richColors expand duration={2500} />
        </div>
      </SidebarProvider>
    </UsersProvider>
  )
}

export default App
