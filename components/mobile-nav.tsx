"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingBag, Briefcase, User2, Bell } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const items = [
    {
      title: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Marketplace",
      href: "/dashboard/marketplace",
      icon: ShoppingBag,
    },
    {
      title: "Jobs",
      href: "/dashboard/jobs",
      icon: Briefcase,
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Profile",
      href: "/dashboard/settings",
      icon: User2,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-background border-t md:hidden">
      <div className="grid h-full grid-cols-5 mx-auto">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`inline-flex flex-col items-center justify-center px-5 group ${
              pathname === item.href
                ? "text-blue-600 dark:text-blue-500"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
