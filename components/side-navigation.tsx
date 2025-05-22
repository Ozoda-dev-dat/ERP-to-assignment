"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslations } from "@/lib/translations"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Settings,
  BarChart2,
  Truck,
  Tag,
  FileText,
  HelpCircle,
  MessageSquare,
} from "lucide-react"

const mainNavItems = [
  { name: "dashboard", href: "/", icon: LayoutDashboard },
  { name: "customers", href: "/customers", icon: Users },
  { name: "orders", href: "/orders", icon: ShoppingCart },
  { name: "inventory", href: "/inventory", icon: Package },
  { name: "finances", href: "/finances", icon: DollarSign },
]

const secondaryNavItems = [
  { name: "reports", href: "/reports", icon: BarChart2 },
  { name: "suppliers", href: "/suppliers", icon: Truck },
  { name: "marketing", href: "/marketing", icon: Tag },
  { name: "documents", href: "/documents", icon: FileText },
]

const supportNavItems = [
  { name: "settings", href: "/settings", icon: Settings },
  { name: "help", href: "/help", icon: HelpCircle },
  { name: "support", href: "/support", icon: MessageSquare },
]

export function SideNavigation() {
  const pathname = usePathname()
  const t = useTranslations()

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-white dark:bg-slate-950 p-4 shrink-0">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t("mainNavigation")}
          </h3>
          <nav className="flex flex-col space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                <item.icon className="h-5 w-5" />
                {t(item.name)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t("management")}
          </h3>
          <nav className="flex flex-col space-y-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                <item.icon className="h-5 w-5" />
                {t(item.name)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {t("support")}
          </h3>
          <nav className="flex flex-col space-y-1">
            {supportNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                <item.icon className="h-5 w-5" />
                {t(item.name)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}
