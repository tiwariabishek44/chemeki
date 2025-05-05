import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300">
        <main className="p-4 md:p-6 max-w-7xl mx-auto pb-20 md:pb-6">{children}</main>
      </div>
      <MobileNav />
      <Toaster />
    </div>
  )
}
