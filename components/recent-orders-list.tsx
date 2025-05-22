import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Acme Corp",
    customerInitials: "AC",
    customerImage: "/placeholder.svg?height=32&width=32",
    status: "processing",
    total: "$1,245.00",
    date: "2023-05-16",
  },
  {
    id: "ORD-002",
    customer: "Global Textiles",
    customerInitials: "GT",
    customerImage: "/placeholder.svg?height=32&width=32",
    status: "shipped",
    total: "$2,345.00",
    date: "2023-05-15",
  },
  {
    id: "ORD-003",
    customer: "Fashion Outlet",
    customerInitials: "FO",
    customerImage: "/placeholder.svg?height=32&width=32",
    status: "delivered",
    total: "$845.00",
    date: "2023-05-14",
  },
  {
    id: "ORD-004",
    customer: "Style Boutique",
    customerInitials: "SB",
    customerImage: "/placeholder.svg?height=32&width=32",
    status: "processing",
    total: "$1,450.00",
    date: "2023-05-13",
  },
  {
    id: "ORD-005",
    customer: "Trendy Threads",
    customerInitials: "TT",
    customerImage: "/placeholder.svg?height=32&width=32",
    status: "pending",
    total: "$950.00",
    date: "2023-05-12",
  },
]

export function RecentOrdersList() {
  return (
    <div className="space-y-4">
      {recentOrders.map((order) => (
        <div
          key={order.id}
          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border">
              <AvatarImage src={order.customerImage || "/placeholder.svg"} alt={order.customer} />
              <AvatarFallback className="bg-teal-100 text-teal-800">{order.customerInitials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{order.customer}</div>
              <div className="text-sm text-muted-foreground">{order.id}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-medium">{order.total}</div>
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
      ))}
    </div>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    pending: {
      label: "Kutilmoqda",
      variant: "outline",
    },
    processing: {
      label: "Ishlanmoqda",
      variant: "secondary",
    },
    shipped: {
      label: "Jo'natilgan",
      variant: "default",
    },
    delivered: {
      label: "Yetkazilgan",
      variant: "default",
    },
    cancelled: {
      label: "Bekor qilingan",
      variant: "destructive",
    },
  }

  const { label, variant } = statusMap[status] || { label: status, variant: "outline" }

  return <Badge variant={variant}>{label}</Badge>
}
