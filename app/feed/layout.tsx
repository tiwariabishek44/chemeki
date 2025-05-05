import type { ReactNode } from "react"
import FeedSidebar from "./sidebar"

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <FeedSidebar />
      <main className="flex-1 ml-0 md:ml-64">{children}</main>
    </div>
  )
}
