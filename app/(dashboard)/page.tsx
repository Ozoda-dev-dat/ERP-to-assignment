import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import { LowStockProducts } from "@/components/low-stock-products"
import { ArrowRight, BarChart3, Clock, Package, ShoppingCart, Users } from "lucide-react"
import { SalesOverview } from "@/components/sales-overview"
import { InventoryStatus } from "@/components/inventory-status"
import { RecentOrders } from "@/components/recent-orders"
import { TopCustomers } from "@/components/top-customers"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your business.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 30 days
          </Button>
          <Button size="sm">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Recent Orders</h2>
              <p className="text-sm text-muted-foreground">Latest transactions</p>
            </div>
            <Link href="/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <RecentOrders />
        </Card>

        <Card className="p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Low Stock Products</h2>
              <p className="text-sm text-muted-foreground">Items that need attention</p>
            </div>
            <Link href="/inventory">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <LowStockProducts />
        </Card>
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Sales</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span>Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Customers</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="mt-0">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Sales Overview</h3>
            <SalesOverview />
          </Card>
        </TabsContent>
        <TabsContent value="inventory" className="mt-0">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Inventory Overview</h3>
            <InventoryStatus />
          </Card>
        </TabsContent>
        <TabsContent value="customers" className="mt-0">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Customer Overview</h3>
            <TopCustomers />
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Top Selling Products</h3>
            <Badge variant="outline">This Month</Badge>
          </div>
          <div className="space-y-4">
            {[
              { name: "Basic T-Shirt", category: "T-Shirts", sold: 245, revenue: "$6,112.50" },
              { name: "Premium Jeans", category: "Jeans", sold: 187, revenue: "$16,829.13" },
              { name: "Summer Dress", category: "Dresses", sold: 156, revenue: "$9,358.44" },
              { name: "Slim Fit Shirt", category: "Shirts", sold: 134, revenue: "$7,369.46" },
            ].map((product, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.revenue}</p>
                  <p className="text-sm text-muted-foreground">{product.sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Top Customers</h3>
            <Badge variant="outline">This Month</Badge>
          </div>
          <div className="space-y-4">
            {[
              { name: "Acme Corp", orders: 24, spent: "$12,500.00" },
              { name: "Global Textiles", orders: 18, spent: "$10,200.00" },
              { name: "Fashion Outlet", orders: 15, spent: "$8,750.00" },
              { name: "Style Boutique", orders: 12, spent: "$7,300.00" },
            ].map((customer, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{customer.spent}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Activities</h3>
            <Badge variant="outline">Today</Badge>
          </div>
          <div className="space-y-4">
            {[
              { action: "New order placed", details: "Order #ORD-001 from Acme Corp", time: "2 hours ago" },
              { action: "Payment received", details: "$2,345.00 from Global Textiles", time: "4 hours ago" },
              { action: "Product restocked", details: "Winter Jacket (+50 units)", time: "6 hours ago" },
              { action: "New customer registered", details: "Trendy Threads", time: "8 hours ago" },
            ].map((activity, i) => (
              <div key={i} className="border-l-2 border-teal-500 pl-4 py-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
