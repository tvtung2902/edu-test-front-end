"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { FileQuestion, FolderKanban, BookOpen, LayoutDashboard, Users, ClipboardList } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeacherSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/teacher",
      icon: LayoutDashboard,
    },
    {
      title: "Tests",
      href: "/teacher/tests",
      icon: ClipboardList,
    },
    {
      title: "Categories",
      href: "/teacher/categories",
      icon: BookOpen,
    },
    {
      title: "Questions",
      href: "/teacher/questions",
      icon: FileQuestion,
    },
    {
      title: "Groups",
      href: "/teacher/groups",
      icon: FolderKanban,
    },
    {
      title: "Students",
      href: "/teacher/students",
      icon: Users,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">EduTest</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <button 
          className="flex gap-2 items-center text-red-500"
          onClick={() => {
            console.log("Logout clicked");
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
