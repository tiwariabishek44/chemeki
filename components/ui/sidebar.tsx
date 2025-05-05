"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"

const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isOpen: false,
  setIsOpen: () => { },
})

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(true) // Default to open for desktop

  // Initialize based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768) // Open by default on desktop (md breakpoint)
    }

    handleResize() // Set initial state
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <SidebarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SidebarContext.Provider>
}

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen } = React.useContext(SidebarContext)

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen border-r border-border bg-background transition-transform",
        "w-72", // Increased width for better readability and to match the NextDoor UI
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        className,
      )}
    >
      <div className="flex h-full flex-col">{children}</div>
    </aside>
  )
}

export function SidebarTrigger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { setIsOpen } = React.useContext(SidebarContext)

  return (
    <button className={cn("", className)} onClick={() => setIsOpen((prev) => !prev)}>
      {children}
    </button>
  )
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-4 py-3 border-b border-border", className)}>{children}</div>
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-4 py-3 mt-auto border-t border-border", className)}>{children}</div>
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex-1 overflow-y-auto py-2", className)}>{children}</div>
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("space-y-0.5 px-2", className)}>{children}</ul>
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("", className)}>{children}</li>
}

export function SidebarMenuButton({
  children,
  className,
  isActive,
  asChild,
}: {
  children: React.ReactNode
  className?: string
  isActive?: boolean
  asChild?: boolean
}) {
  if (asChild) {
    return <>{children}</>
  }

  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
        isActive
          ? "bg-muted font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  )
}

// Add new components for better section organization like in NextDoor

export function SidebarSection({
  children,
  title,
  className
}: {
  children: React.ReactNode;
  title?: string;
  className?: string
}) {
  return (
    <div className={cn("mt-6 mb-1", className)}>
      {title && (
        <h3 className="px-4 mb-2 text-xs font-medium text-muted-foreground tracking-wider uppercase">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

export function SidebarProfile({
  name,
  email,
  imageSrc,
  fallback,
  className,
}: {
  name: string;
  email: string;
  imageSrc?: string;
  fallback: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 p-4", className)}>
      <div className="flex-shrink-0">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {imageSrc ? (
              <img src={imageSrc} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-medium text-muted-foreground">{fallback}</span>
            )}
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-sm font-medium truncate">{name}</span>
        <span className="text-xs text-muted-foreground truncate">{email}</span>
      </div>
    </div>
  )
}

export function SidebarBadge({ count }: { count: number }) {
  if (!count) return null;

  return (
    <div className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
      {count > 99 ? '99+' : count}
    </div>
  );
}

export {
  useSidebar,
}
