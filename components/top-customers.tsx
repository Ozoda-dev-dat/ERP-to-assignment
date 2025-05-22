import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const topCustomers = [
  {
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    initials: "AC",
    image: "/placeholder.svg?height=40&width=40",
    spent: 12500,
    orders: 24,
    percentOfTotal: 100,
  },
  {
    name: "Global Textiles",
    email: "orders@globaltextiles.com",
    initials: "GT",
    image: "/placeholder.svg?height=40&width=40",
    spent: 10200,
    orders: 18,
    percentOfTotal: 82,
  },
  {
    name: "Fashion Outlet",
    email: "purchasing@fashionoutlet.com",
    initials: "FO",
    image: "/placeholder.svg?height=40&width=40",
    spent: 8750,
    orders: 15,
    percentOfTotal: 70,
  },
  {
    name: "Style Boutique",
    email: "hello@styleboutique.com",
    initials: "SB",
    image: "/placeholder.svg?height=40&width=40",
    spent: 7300,
    orders: 12,
    percentOfTotal: 58,
  },
  {
    name: "Trendy Threads",
    email: "orders@trendythreads.com",
    initials: "TT",
    image: "/placeholder.svg?height=40&width=40",
    spent: 5800,
    orders: 10,
    percentOfTotal: 46,
  },
]

export function TopCustomers() {
  return (
    <div className="space-y-8">
      {topCustomers.map((customer) => (
        <div key={customer.name} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
            <AvatarFallback>{customer.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{customer.name}</p>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
          </div>
          <div className="ml-auto text-sm font-medium">${customer.spent.toLocaleString()}</div>
          <div className="ml-2 w-24">
            <Progress value={customer.percentOfTotal} className="h-2" />
          </div>
        </div>
      ))}
    </div>
  )
}
