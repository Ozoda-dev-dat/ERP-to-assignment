"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Plus, Search, Filter, Download, MoreHorizontal, Check, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "@/lib/translations"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import * as XLSX from "xlsx"

// Sample customer data
const customers = [
  {
    id: "CUST-001",
    name: "Acme Corp",
    contact: "John Smith",
    email: "john@acmecorp.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    orders: 24,
    spent: "$12,500.00",
    lastOrder: "2023-05-10",
    image: "/placeholder.svg?height=40&width=40",
    initials: "AC",
    country: "USA",
    joinDate: "2022-01-15",
  },
  {
    id: "CUST-002",
    name: "Global Textiles",
    contact: "Sarah Johnson",
    email: "sarah@globaltextiles.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    orders: 18,
    spent: "$10,200.00",
    lastOrder: "2023-05-08",
    image: "/placeholder.svg?height=40&width=40",
    initials: "GT",
    country: "Canada",
    joinDate: "2022-02-20",
  },
  {
    id: "CUST-003",
    name: "Fashion Outlet",
    contact: "Michael Brown",
    email: "michael@fashionoutlet.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    orders: 15,
    spent: "$8,750.00",
    lastOrder: "2023-05-05",
    image: "/placeholder.svg?height=40&width=40",
    initials: "FO",
    country: "UK",
    joinDate: "2022-03-10",
  },
  {
    id: "CUST-004",
    name: "Style Boutique",
    contact: "Emily Davis",
    email: "emily@styleboutique.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    orders: 12,
    spent: "$7,300.00",
    lastOrder: "2023-04-28",
    image: "/placeholder.svg?height=40&width=40",
    initials: "SB",
    country: "France",
    joinDate: "2022-04-05",
  },
  {
    id: "CUST-005",
    name: "Trendy Threads",
    contact: "David Wilson",
    email: "david@trendythreads.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    orders: 10,
    spent: "$5,800.00",
    lastOrder: "2023-04-25",
    image: "/placeholder.svg?height=40&width=40",
    initials: "TT",
    country: "Germany",
    joinDate: "2022-05-12",
  },
  {
    id: "CUST-006",
    name: "Elegant Apparel",
    contact: "Jessica Martinez",
    email: "jessica@elegantapparel.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    orders: 8,
    spent: "$4,200.00",
    lastOrder: "2023-04-20",
    image: "/placeholder.svg?height=40&width=40",
    initials: "EA",
    country: "Italy",
    joinDate: "2022-06-18",
  },
]

// Get unique countries for filtering
const countries = Array.from(new Set(customers.map((customer) => customer.country)))

export default function CustomersPage() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [countryFilter, setCountryFilter] = useState<string[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState(customers)
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "id",
    "name",
    "contact",
    "email",
    "phone",
    "status",
    "orders",
    "spent",
    "lastOrder",
    "country",
  ])

  // Apply filters when search query or filters change
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      // Search filter
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase())

      // Status filter
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(customer.status)

      // Country filter
      const matchesCountry = countryFilter.length === 0 || countryFilter.includes(customer.country)

      return matchesSearch && matchesStatus && matchesCountry
    })

    setFilteredCustomers(filtered)
  }, [searchQuery, statusFilter, countryFilter])

  // Handle export to Excel
  const handleExport = () => {
    try {
      // Prepare data for export based on selected columns
      const exportData = filteredCustomers.map((customer) => {
        const exportRow: Record<string, any> = {}

        if (selectedColumns.includes("id")) exportRow[t("id")] = customer.id
        if (selectedColumns.includes("name")) exportRow[t("name")] = customer.name
        if (selectedColumns.includes("contact")) exportRow[t("contactPerson")] = customer.contact
        if (selectedColumns.includes("email")) exportRow[t("email")] = customer.email
        if (selectedColumns.includes("phone")) exportRow[t("phone")] = customer.phone
        if (selectedColumns.includes("status")) exportRow[t("status")] = customer.status
        if (selectedColumns.includes("orders")) exportRow[t("orders")] = customer.orders
        if (selectedColumns.includes("spent")) exportRow[t("spent")] = customer.spent
        if (selectedColumns.includes("lastOrder")) exportRow[t("lastOrder")] = customer.lastOrder
        if (selectedColumns.includes("country")) exportRow[t("country")] = customer.country
        if (selectedColumns.includes("joinDate")) exportRow[t("joinDate")] = customer.joinDate

        return exportRow
      })

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Create workbook
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Customers")

      // Generate Excel binary string
      const excelBinary = XLSX.write(workbook, { bookType: "xlsx", type: "binary" })

      // Convert binary string to ArrayBuffer
      const buffer = new ArrayBuffer(excelBinary.length)
      const view = new Uint8Array(buffer)
      for (let i = 0; i < excelBinary.length; i++) {
        view[i] = excelBinary.charCodeAt(i) & 0xff
      }

      // Create Blob from ArrayBuffer
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `customers_export_${new Date().toISOString().split("T")[0]}.xlsx`

      // Append to document, trigger click, and clean up
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try the CSV export option instead.")
    }
  }

  // Alternative CSV export function as backup
  const handleCSVExport = () => {
    try {
      // Prepare headers based on selected columns
      const headers: string[] = []
      if (selectedColumns.includes("id")) headers.push(t("id"))
      if (selectedColumns.includes("name")) headers.push(t("name"))
      if (selectedColumns.includes("contact")) headers.push(t("contactPerson"))
      if (selectedColumns.includes("email")) headers.push(t("email"))
      if (selectedColumns.includes("phone")) headers.push(t("phone"))
      if (selectedColumns.includes("status")) headers.push(t("status"))
      if (selectedColumns.includes("orders")) headers.push(t("orders"))
      if (selectedColumns.includes("spent")) headers.push(t("spent"))
      if (selectedColumns.includes("lastOrder")) headers.push(t("lastOrder"))
      if (selectedColumns.includes("country")) headers.push(t("country"))
      if (selectedColumns.includes("joinDate")) headers.push(t("joinDate"))

      // Prepare data rows
      const rows = filteredCustomers.map((customer) => {
        const row: string[] = []
        if (selectedColumns.includes("id")) row.push(customer.id)
        if (selectedColumns.includes("name")) row.push(customer.name)
        if (selectedColumns.includes("contact")) row.push(customer.contact)
        if (selectedColumns.includes("email")) row.push(customer.email)
        if (selectedColumns.includes("phone")) row.push(customer.phone)
        if (selectedColumns.includes("status")) row.push(customer.status)
        if (selectedColumns.includes("orders")) row.push(customer.orders.toString())
        if (selectedColumns.includes("spent")) row.push(customer.spent)
        if (selectedColumns.includes("lastOrder")) row.push(customer.lastOrder)
        if (selectedColumns.includes("country")) row.push(customer.country)
        if (selectedColumns.includes("joinDate")) row.push(customer.joinDate || "")
        return row
      })

      // Create CSV content
      const csvContent = [headers.join(","), ...rows.map((row) => row.map((field) => `"${field}"`).join(","))].join(
        "\n",
      )

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `customers_export_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("CSV Export failed:", error)
      alert("Export failed. Please try again.")
    }
  }

  // Toggle column selection for export
  const toggleColumn = (column: string) => {
    setSelectedColumns((prev) => (prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]))
  }

  // Toggle status filter
  const toggleStatusFilter = (status: string) => {
    setStatusFilter((prev) => (prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]))
  }

  // Toggle country filter
  const toggleCountryFilter = (country: string) => {
    setCountryFilter((prev) => (prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("customers")}</h1>
          <p className="text-muted-foreground">{t("manageCustomers")}</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> {t("addCustomer")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchCustomers")}
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t("filter")}
                {(statusFilter.length > 0 || countryFilter.length > 0) && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {statusFilter.length + countryFilter.length}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t("filter")} {t("customers")}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="font-medium">{t("status")}</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-active"
                        checked={statusFilter.includes("active")}
                        onCheckedChange={() => toggleStatusFilter("active")}
                      />
                      <Label htmlFor="status-active" className="flex items-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800 mr-2">
                          <Check className="h-3 w-3 mr-1" />
                          {t("active")}
                        </Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="status-inactive"
                        checked={statusFilter.includes("inactive")}
                        onCheckedChange={() => toggleStatusFilter("inactive")}
                      />
                      <Label htmlFor="status-inactive" className="flex items-center">
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 mr-2">
                          <X className="h-3 w-3 mr-1" />
                          {t("inactive")}
                        </Badge>
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">{t("country")}</h3>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                    {countries.map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={`country-${country}`}
                          checked={countryFilter.includes(country)}
                          onCheckedChange={() => toggleCountryFilter(country)}
                        />
                        <Label htmlFor={`country-${country}`}>{country}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatusFilter([])
                    setCountryFilter([])
                  }}
                >
                  {t("clearFilters")}
                </Button>
                <Button onClick={() => setIsFilterDialogOpen(false)}>{t("applyFilters")}</Button>
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                {t("export")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t("exportOptions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2">
                <div className="mb-2 text-sm font-medium">{t("selectColumns")}</div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-id"
                      checked={selectedColumns.includes("id")}
                      onCheckedChange={() => toggleColumn("id")}
                    />
                    <Label htmlFor="col-id">ID</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-name"
                      checked={selectedColumns.includes("name")}
                      onCheckedChange={() => toggleColumn("name")}
                    />
                    <Label htmlFor="col-name">{t("name")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-contact"
                      checked={selectedColumns.includes("contact")}
                      onCheckedChange={() => toggleColumn("contact")}
                    />
                    <Label htmlFor="col-contact">{t("contactPerson")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-email"
                      checked={selectedColumns.includes("email")}
                      onCheckedChange={() => toggleColumn("email")}
                    />
                    <Label htmlFor="col-email">{t("email")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-phone"
                      checked={selectedColumns.includes("phone")}
                      onCheckedChange={() => toggleColumn("phone")}
                    />
                    <Label htmlFor="col-phone">{t("phone")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-status"
                      checked={selectedColumns.includes("status")}
                      onCheckedChange={() => toggleColumn("status")}
                    />
                    <Label htmlFor="col-status">{t("status")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-orders"
                      checked={selectedColumns.includes("orders")}
                      onCheckedChange={() => toggleColumn("orders")}
                    />
                    <Label htmlFor="col-orders">{t("orders")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-spent"
                      checked={selectedColumns.includes("spent")}
                      onCheckedChange={() => toggleColumn("spent")}
                    />
                    <Label htmlFor="col-spent">{t("spent")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-lastOrder"
                      checked={selectedColumns.includes("lastOrder")}
                      onCheckedChange={() => toggleColumn("lastOrder")}
                    />
                    <Label htmlFor="col-lastOrder">{t("lastOrder")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-country"
                      checked={selectedColumns.includes("country")}
                      onCheckedChange={() => toggleColumn("country")}
                    />
                    <Label htmlFor="col-country">{t("country")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-joinDate"
                      checked={selectedColumns.includes("joinDate")}
                      onCheckedChange={() => toggleColumn("joinDate")}
                    />
                    <Label htmlFor="col-joinDate">{t("joinDate")}</Label>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExport} className="cursor-pointer flex justify-center font-medium">
                <Download className="mr-2 h-4 w-4" />
                {t("exportToExcel")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCSVExport} className="cursor-pointer flex justify-center font-medium">
                <Download className="mr-2 h-4 w-4" />
                {t("exportToCSV")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Results summary */}
      <div className="text-sm text-muted-foreground">
        {filteredCustomers.length === 1
          ? t("showingOneResult")
          : t("showingResults").replace("{count}", filteredCustomers.length.toString())}
        {(statusFilter.length > 0 || countryFilter.length > 0 || searchQuery) && (
          <Button
            variant="link"
            className="px-2 h-auto"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter([])
              setCountryFilter([])
            }}
          >
            {t("clearAll")}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}

        {filteredCustomers.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-800">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{t("noCustomersFound")}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">{t("noCustomersFoundDescription")}</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface CustomerCardProps {
  customer: {
    id: string
    name: string
    contact: string
    email: string
    phone: string
    status: string
    orders: number
    spent: string
    lastOrder: string
    image: string
    initials: string
    country: string
  }
}

function CustomerCard({ customer }: CustomerCardProps) {
  const t = useTranslations()

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={customer.image || "/placeholder.svg"} alt={customer.name} />
              <AvatarFallback className="bg-teal-100 text-teal-800">{customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-lg">{customer.name}</div>
              <div className="text-sm text-muted-foreground">{customer.id}</div>
            </div>
          </div>
          <Badge variant={customer.status === "active" ? "default" : "secondary"}>
            {customer.status === "active" ? t("active") : t("inactive")}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <div className="text-sm text-muted-foreground">{t("contactPerson")}</div>
            <div>{customer.contact}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t("email")}</div>
            <div>{customer.email}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t("phone")}</div>
            <div>{customer.phone}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t("country")}</div>
            <div>{customer.country}</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">{t("orders")}</div>
            <div className="font-medium">{customer.orders}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t("spent")}</div>
            <div className="font-medium">{customer.spent}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{t("lastOrder")}</div>
            <div className="font-medium">{customer.lastOrder}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 flex justify-between items-center">
        <Link href={`/customers/${customer.id}`}>
          <Button variant="ghost" size="sm">
            {t("viewDetails")}
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
            <DropdownMenuItem>{t("editCustomer")}</DropdownMenuItem>
            <DropdownMenuItem>{t("viewOrders")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">{t("deleteCustomer")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  )
}
