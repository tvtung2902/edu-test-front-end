import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import ReduxProvider from '@/providers/redux-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "edu-test",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReduxProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  )
}


import './globals.css'
