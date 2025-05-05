"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, ShoppingBag, Calendar, MessageSquare, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Feed",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Groups",
      href: "/dashboard/groups",
      icon: Users,
    },
    {
      title: "Market",
      href: "/dashboard/marketplace",
      icon: ShoppingBag,
    },
    {
      title: "Jobs",
      href: "/dashboard/jobs",
      icon: Briefcase,
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: Calendar,
    },
    {
      title: "Messages",
      href: "/dashboard/messages",
      icon: MessageSquare,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs",
                isActive ? "text-green-600" : "text-muted-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-green-600" : "text-muted-foreground")} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
