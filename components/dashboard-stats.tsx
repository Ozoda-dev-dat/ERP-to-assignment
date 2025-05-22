import type React from "react"
import { Card } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSign, ShoppingBag, Users, AlertCircle } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Jami daromad"
        value="$45,231.89"
        change={20.1}
        trend="up"
        icon={<DollarSign className="h-5 w-5 text-teal-600" />}
      />
      <StatCard
        title="Yangi buyurtmalar"
        value="12"
        change={19}
        trend="up"
        icon={<ShoppingBag className="h-5 w-5 text-blue-600" />}
      />
      <StatCard
        title="Faol mijozlar"
        value="42"
        change={10.5}
        trend="up"
        icon={<Users className="h-5 w-5 text-violet-600" />}
      />
      <StatCard
        title="Kam qolgan mahsulotlar"
        value="7"
        change={-3}
        trend="down"
        icon={<AlertCircle className="h-5 w-5 text-amber-600" />}
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: number
  trend: "up" | "down"
  icon: React.ReactNode
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-2">{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpIcon className="h-4 w-4 text-emerald-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 text-rose-500 mr-1" />
          )}
          <span className={trend === "up" ? "text-emerald-500" : "text-rose-500"}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-muted-foreground ml-1">o'tgan oyga nisbatan</span>
        </div>
      </div>
    </Card>
  )
}
