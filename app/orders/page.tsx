import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, Download, Calendar, Clock, Package, CreditCard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    customer: "Acme Corp",
    customerInitials: "AC",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-05-10",
    status: "processing",
    items: 12,
    total: "$1,245.00",
  },
  {
    id: "ORD-002",
    customer: "Global Textiles",
    customerInitials: "GT",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-05-08",
    status: "shipped",
    items: 8,
    total: "$2,345.00",
  },
  {
    id: "ORD-003",
    customer: "Fashion Outlet",
    customerInitials: "FO",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-05-05",
    status: "delivered",
    items: 5,
    total: "$845.00",
  },
  {
    id: "ORD-004",
    customer: "Style Boutique",
    customerInitials: "SB",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-04-28",
    status: "processing",
    items: 10,
    total: "$1,450.00",
  },
  {
    id: "ORD-005",
    customer: "Trendy Threads",
    customerInitials: "TT",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-04-25",
    status: "pending",
    items: 6,
    total: "$950.00",
  },
  {
    id: "ORD-006",
    customer: "Elegant Apparel",
    customerInitials: "EA",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-04-20",
    status: "delivered",
    items: 4,
    total: "$650.00",
  },
  {
    id: "ORD-007",
    customer: "Fashion Forward",
    customerInitials: "FF",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-04-15",
    status: "cancelled",
    items: 7,
    total: "$1,150.00",
  },
  {
    id: "ORD-008",
    customer: "Chic Clothing Co.",
    customerInitials: "CC",
    customerImage: "/placeholder.svg?height=32&width=32",
    date: "2023-04-10",
    status: "delivered",
    items: 3,
    total: "$550.00",
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track your sales orders</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create Order
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search orders..." className="pl-8 w-full" />
          </div>
          <Button variant="outline" className="w-full md:w-auto flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((order) => order.status === "pending")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((order) => order.status === "processing")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="shipped" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((order) => order.status === "shipped")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="delivered" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders
              .filter((order) => order.status === "delivered")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface OrderCardProps {
  order: {
    id: string
    customer: string
    customerInitials: string
    customerImage: string
    date: string
    status: string
    items: number
    total: string
  }
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">{order.id}</div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={order.customerImage || "/placeholder.svg"} alt={order.customer} />
            <AvatarFallback className="bg-teal-100 text-teal-800">{order.customerInitials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{order.customer}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              {order.date}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 mb-1">
              <Package className="h-4 w-4" />
            </div>
            <div className="text-sm text-muted-foreground">Items</div>
            <div className="font-medium">{order.items}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 text-teal-700 mb-1">
              <CreditCard className="h-4 w-4" />
            </div>
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="font-medium">{order.total}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-700 mb-1">
              <Clock className="h-4 w-4" />
            </div>
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="font-medium capitalize">{order.status}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 flex justify-between items-center">
        <Button variant="ghost" size="sm">
          View Details
        </Button>
        <Button variant="outline" size="sm">
          Update Status
        </Button>
      </div>
    </Card>
  )
}

function OrderStatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Pending",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    processing: {
      label: "Processing",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    shipped: {
      label: "Shipped",
      className: "bg-violet-100 text-violet-800 border-violet-200",
    },
    delivered: {
      label: "Delivered",
      className: "bg-teal-100 text-teal-800 border-teal-200",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-red-100 text-red-800 border-red-200",
    },
  }

  const { label, className } = statusMap[status] || {
    label: status,
    className: "bg-slate-100 text-slate-800 border-slate-200",
  }

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}
