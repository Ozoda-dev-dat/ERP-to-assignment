"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcherSimple } from "@/components/language-switcher-simple"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  Menu,
  X,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  Settings,
  LogOut,
  Search,
  BarChart2,
  Truck,
  Tag,
  FileText,
  HelpCircle,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "@/lib/translations"
import { useAuth } from "@/components/auth-provider"

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

export function TopNavigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations()
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const allNavItems = [...mainNavItems, ...secondaryNavItems, ...supportNavItems]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-teal-600 text-white p-1 rounded-md">
                <Package className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold hidden md:inline-block">{t("appName")}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                {t(item.name)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t("search")}</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-700 dark:text-slate-300">
              <Bell className="h-5 w-5" />
              <span className="sr-only">{t("notifications")}</span>
            </Button>
            <LanguageSwitcherSimple />
            <ModeToggle />
            <UserMenu onLogout={handleLogout} />

            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden text-slate-700 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">{t("toggleMenu")}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {allNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {t(item.name)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function UserMenu({ onLogout }: { onLogout: () => void }) {
  const t = useTranslations()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@admin" />
            <AvatarFallback className="bg-teal-100 text-teal-800">OZ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Ozoda</p>
            <p className="text-xs leading-none text-muted-foreground">ozoda@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            {t("settings")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
