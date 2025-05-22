import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, Download, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample supplier data
const suppliers = [
  {
    id: "SUP-001",
    name: "Cotton Suppliers Inc.",
    contact: "Alice Johnson",
    email: "alice@cottonsuppliers.com",
    phone: "+1 (555) 111-2222",
    address: "123 Cotton Street, TX 75001",
    status: "active",
    products: 45,
    lastOrder: "2023-05-15",
    rating: 4.8,
    initials: "CS",
  },
  {
    id: "SUP-002",
    name: "Denim Masters Co.",
    contact: "Bob Smith",
    email: "bob@denimmasters.com",
    phone: "+1 (555) 222-3333",
    address: "456 Denim Ave, CA 90210",
    status: "active",
    products: 32,
    lastOrder: "2023-05-12",
    rating: 4.6,
    initials: "DM",
  },
  {
    id: "SUP-003",
    name: "Fashion Fabrics Ltd.",
    contact: "Carol Davis",
    email: "carol@fashionfabrics.com",
    phone: "+1 (555) 333-4444",
    address: "789 Fashion Blvd, NY 10001",
    status: "active",
    products: 67,
    lastOrder: "2023-05-10",
    rating: 4.9,
    initials: "FF",
  },
  {
    id: "SUP-004",
    name: "Outerwear Specialists",
    contact: "David Wilson",
    email: "david@outerwearspec.com",
    phone: "+1 (555) 444-5555",
    address: "321 Winter Lane, CO 80202",
    status: "inactive",
    products: 28,
    lastOrder: "2023-04-20",
    rating: 4.3,
    initials: "OS",
  },
]

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Supplier
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search suppliers..." className="pl-8 w-full" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  )
}

interface SupplierCardProps {
  supplier: {
    id: string
    name: string
    contact: string
    email: string
    phone: string
    address: string
    status: string
    products: number
    lastOrder: string
    rating: number
    initials: string
  }
}

function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt={supplier.name} />
              <AvatarFallback className="bg-blue-100 text-blue-800">{supplier.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg">{supplier.name}</div>
              <div className="text-sm text-muted-foreground">{supplier.id}</div>
            </div>
          </div>
          <Badge variant={supplier.status === "active" ? "default" : "secondary"}>{supplier.status}</Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{supplier.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{supplier.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{supplier.address}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Products</div>
            <div className="font-medium">{supplier.products}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Rating</div>
            <div className="font-medium">{supplier.rating}/5</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Last Order</div>
            <div className="font-medium">{supplier.lastOrder}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 flex justify-between items-center">
        <Button variant="ghost" size="sm">
          View Details
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
            <DropdownMenuItem>View Products</DropdownMenuItem>
            <DropdownMenuItem>Contact Supplier</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Remove Supplier</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
