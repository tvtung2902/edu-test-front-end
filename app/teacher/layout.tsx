"use client"
import type React from "react"
import { TeacherSidebar } from "@/components/sidebar/teacher-sidebar"
import { TeacherHeader } from "@/components/header/teacher-header"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import ShowMessage from "./show-message"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <ShowMessage />
        <TeacherSidebar />
        <SidebarInset className="flex flex-col">
          <TeacherHeader />
          <main style={{backgroundColor: '#F5F5F5'}} className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
    </SidebarProvider>
  )
}