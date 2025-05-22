"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { TopNavigation } from "@/components/top-navigation"
import { SideNavigation } from "@/components/side-navigation"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  // Don't show navigation on login page
  if (pathname === "/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavigation />
      <div className="flex flex-1">
        <SideNavigation />
        <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8 max-w-none">{children}</main>
      </div>
      <footer className="border-t bg-white dark:bg-slate-950 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
            <p>© 2024 ClothWholesale Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
