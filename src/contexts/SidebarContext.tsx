import { createContext, ReactNode, useContext, useState } from "react";

interface SidebarContext {
  expanded: boolean;
  toggleExpanded: () => void;
}

interface Props {
  children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContext)

export const  SidebarProvider = ({ children }: Props) => {
  const [expanded, setExpanded] = useState<boolean>(true)

  const toggleExpanded = () => {
    setExpanded(currentState => !currentState)
  }

  return (
    <SidebarContext.Provider value={{ expanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}
