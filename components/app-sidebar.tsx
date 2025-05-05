"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShoppingBag,
  Briefcase,
  Users,
  Calendar,
  HelpCircle,
  MoreHorizontal,
  Send,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AppSidebar() {
  const pathname = usePathname()

  // Keep the same navigation items but style them like X.com
  const mainNavItems = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
      notifications: 0,
    },
    {
      title: "Marketplace",
      href: "/dashboard/marketplace",
      icon: ShoppingBag,
      notifications: 0,
    },
    {
      title: "Groups",
      href: "/dashboard/groups",
      icon: Users,
      notifications: 3,
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: Calendar,
      notifications: 0,
    },
  ]

  return (
    <Sidebar className="w-16 md:w-64 border-r-0 bg-background">
      <SidebarContent className="flex flex-col h-full py-2">
        {/* Logo styled like Gab logo - just a simple letter */}
        <div className="px-3 mb-6">
          <Link href="/dashboard" className="flex items-center justify-center md:justify-start">
            <div className="flex items-center">

              <span className="ml-2 text-3xl font-bold text-green-500 dark:text-green-400 hidden md:block">
                Chemiki
              </span>
            </div>
          </Link>
        </div>

        {/* Main Navigation with X.com style */}
        <SidebarMenu className="space-y-1">
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link
                  href={item.href}
                  className="flex items-center px-3 py-3 rounded-full transition-colors hover:bg-gray-200/80 dark:hover:bg-gray-800/80"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <item.icon className="h-6 w-6" />
                      {item.notifications > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-500 dark:bg-green-400 text-white text-xs font-medium px-1.5">
                          {item.notifications > 99 ? '99+' : item.notifications}
                        </span>
                      )}
                    </div>
                    <span className="text-xl font-normal hidden md:block">{item.title}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          {/* Help Center styled like X.com menu item but without a link */}
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="flex w-full items-center px-3 py-3 rounded-full transition-colors hover:bg-gray-200/80 dark:hover:bg-gray-800/80"
            >
              <div className="flex items-center gap-4">
                <HelpCircle className="h-6 w-6" />
                <span className="text-xl font-normal hidden md:block">Help Center</span>
              </div>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Post Button styled like Gab's green buttons */}
        <div className="px-3 mt-4">
          <Button
            variant="default"
            size="lg"
            className="w-full rounded-md py-3 text-lg font-medium hidden md:flex justify-center bg-green-500 hover:bg-green-600 text-white dark:bg-green-500 dark:hover:bg-green-600 dark:text-white border-0"
          >
            Post
          </Button>

          {/* Round button for mobile */}
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full flex items-center justify-center md:hidden mx-auto bg-green-500 hover:bg-green-600 text-white dark:bg-green-500 dark:hover:bg-green-600 dark:text-white border-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Spacer to push profile to bottom */}
        <div className="flex-grow"></div>

        {/* Profile Section at bottom styled like X.com */}
        <SidebarFooter className="px-3 pb-3">
          <Button variant="ghost" className="w-full px-2 py-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-gray-800/80 flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-user.jpg" alt="Abishek Tiwari" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm hidden md:block">
                <span className="font-semibold">Abishek Tiwari</span>
                <span className="text-muted-foreground">@Abishek39073471</span>
              </div>
            </div>
            <MoreHorizontal className="h-5 w-5 text-muted-foreground hidden md:block" />
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}