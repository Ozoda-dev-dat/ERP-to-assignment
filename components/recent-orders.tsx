import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={order.customerImage || "/placeholder.svg"} alt={order.customer} />
            <AvatarFallback>{order.customerInitials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.id}</p>
          </div>
          <div className="ml-auto font-medium">{order.total}</div>
          <div className="ml-2">
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
      label: "Pending",
      variant: "outline",
    },
    processing: {
      label: "Processing",
      variant: "secondary",
    },
    shipped: {
      label: "Shipped",
      variant: "default",
    },
    delivered: {
      label: "Delivered",
      variant: "default",
    },
    cancelled: {
      label: "Cancelled",
      variant: "destructive",
    },
  }

  const { label, variant } = statusMap[status] || { label: status, variant: "outline" }

  return <Badge variant={variant}>{label}</Badge>
}
