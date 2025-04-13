"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  // Map paths to readable names
  const pathMap: Record<string, string> = {
    admin: "Admin",
    teacher: "Teacher",
    dashboard: "Dashboard",
    users: "Users",
    groups: "Groups",
    categories: "Categories",
    tests: "Tests",
    comments: "Comments",
    questions: "Questions",
    students: "Students",
    history: "History",
    "my-groups": "My Groups",
    rankings: "Rankings",
    discussions: "Discussions",
  }

  return (
    <nav className="mb-4 flex items-center text-sm text-muted-foreground">
      <ol className="flex items-center gap-1">
        <li>
          <Link
            href={segments[0] === "admin" ? "/admin" : segments[0] === "teacher" ? "/teacher" : "/dashboard"}
            className="flex items-center gap-1 hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1

          return (
            <li key={path} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              {isLast ? (
                <span className="font-medium text-foreground">{pathMap[segment] || segment}</span>
              ) : (
                <Link href={path} className="hover:text-foreground">
                  {pathMap[segment] || segment}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
