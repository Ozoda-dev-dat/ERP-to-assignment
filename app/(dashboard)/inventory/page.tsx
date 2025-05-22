"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Package,
  Edit,
  Trash,
  RefreshCw,
  Tag,
  Truck,
  DollarSign,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { useTranslations } from "@/lib/translations"

// Sample inventory data
const inventory = [
  {
    id: "PROD-001",
    name: "Basic T-Shirt",
    category: "T-Shirts",
    sku: "TS-BAS-001",
    stock: 120,
    lowStock: 20,
    price: "$24.99",
    cost: "$12.50",
    status: "in-stock",
    supplier: "Cotton Suppliers Inc.",
    lastUpdated: "2023-05-10",
  },
  {
    id: "PROD-002",
    name: "Premium Jeans",
    category: "Jeans",
    sku: "JN-PRE-002",
    stock: 85,
    lowStock: 15,
    price: "$89.99",
    cost: "$45.00",
    status: "in-stock",
    supplier: "Denim Masters Co.",
    lastUpdated: "2023-05-08",
  },
  {
    id: "PROD-003",
    name: "Summer Dress",
    category: "Dresses",
    sku: "DR-SUM-003",
    stock: 65,
    lowStock: 10,
    price: "$59.99",
    cost: "$30.00",
    status: "in-stock",
    supplier: "Fashion Fabrics Ltd.",
    lastUpdated: "2023-05-05",
  },
  {
    id: "PROD-004",
    name: "Winter Jacket",
    category: "Jackets",
    sku: "JK-WIN-004",
    stock: 45,
    lowStock: 10,
    price: "$129.99",
    cost: "$65.00",
    status: "in-stock",
    supplier: "Outerwear Specialists",
    lastUpdated: "2023-04-28",
  },
  {
    id: "PROD-005",
    name: "Wool Sweater",
    category: "Sweaters",
    sku: "SW-WOL-005",
    stock: 30,
    lowStock: 8,
    price: "$79.99",
    cost: "$40.00",
    status: "in-stock",
    supplier: "Wool Works Inc.",
    lastUpdated: "2023-04-25",
  },
  {
    id: "PROD-006",
    name: "Pleated Skirt",
    category: "Skirts",
    sku: "SK-PLE-006",
    stock: 25,
    lowStock: 5,
    price: "$49.99",
    cost: "$25.00",
    status: "in-stock",
    supplier: "Fashion Fabrics Ltd.",
    lastUpdated: "2023-04-20",
  },
  {
    id: "PROD-007",
    name: "Slim Fit Shirt",
    category: "Shirts",
    sku: "SH-SLM-007",
    stock: 5,
    lowStock: 10,
    price: "$54.99",
    cost: "$27.50",
    status: "low-stock",
    supplier: "Cotton Suppliers Inc.",
    lastUpdated: "2023-04-15",
  },
  {
    id: "PROD-008",
    name: "Cargo Pants",
    category: "Pants",
    sku: "PT-CRG-008",
    stock: 0,
    lowStock: 12,
    price: "$69.99",
    cost: "$35.00",
    status: "out-of-stock",
    supplier: "Casual Clothing Co.",
    lastUpdated: "2023-04-10",
  },
  {
    id: "PROD-009",
    name: "Leather Belt",
    category: "Accessories",
    sku: "AC-BLT-009",
    stock: 3,
    lowStock: 8,
    price: "$34.99",
    cost: "$17.50",
    status: "low-stock",
    supplier: "Leather Goods Ltd.",
    lastUpdated: "2023-04-05",
  },
  {
    id: "PROD-010",
    name: "Wool Scarf",
    category: "Accessories",
    sku: "AC-SCF-010",
    stock: 4,
    lowStock: 10,
    price: "$29.99",
    cost: "$15.00",
    status: "low-stock",
    supplier: "Wool Works Inc.",
    lastUpdated: "2023-04-01",
  },
  {
    id: "PROD-011",
    name: "Denim Jacket",
    category: "Jackets",
    sku: "JK-DNM-011",
    stock: 2,
    lowStock: 5,
    price: "$89.99",
    cost: "$45.00",
    status: "low-stock",
    supplier: "Denim Masters Co.",
    lastUpdated: "2023-03-28",
  },
  {
    id: "PROD-012",
    name: "Cotton Socks",
    category: "Accessories",
    sku: "AC-SCK-012",
    stock: 150,
    lowStock: 30,
    price: "$9.99",
    cost: "$5.00",
    status: "in-stock",
    supplier: "Cotton Suppliers Inc.",
    lastUpdated: "2023-03-25",
  },
]

// Get unique categories from inventory
const categories = Array.from(new Set(inventory.map((item) => item.category)))

export default function InventoryPage() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [stockFilter, setStockFilter] = useState("all")

  // Filter inventory based on search query, category, and stock status
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "" || item.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in-stock" && item.status === "in-stock") ||
      (stockFilter === "low-stock" && item.status === "low-stock") ||
      (stockFilter === "out-of-stock" && item.status === "out-of-stock")

    return matchesSearch && matchesCategory && matchesStock
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("inventory")}</h1>
          <p className="text-muted-foreground">{t("manageInventory")}</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> {t("addProduct")}
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">{t("allStock")}</TabsTrigger>
            <TabsTrigger value="in-stock">{t("inStock")}</TabsTrigger>
            <TabsTrigger value="low-stock">{t("lowStock")}</TabsTrigger>
            <TabsTrigger value="out-of-stock">{t("outOfStock")}</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {t("dateRange")}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {t("filter")}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              {t("export")}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("searchProducts")}
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <select
                className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">{t("allCategories")}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("product")}</TableHead>
                    <TableHead>{t("sku")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("price")}</TableHead>
                    <TableHead>{t("stock")}</TableHead>
                    <TableHead>{t("supplier")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
                            {product.category === "T-Shirts" && <Tag className="h-5 w-5" />}
                            {product.category === "Jeans" && <Package className="h-5 w-5" />}
                            {product.category === "Dresses" && <Tag className="h-5 w-5" />}
                            {product.category === "Jackets" && <Package className="h-5 w-5" />}
                            {product.category === "Sweaters" && <Package className="h-5 w-5" />}
                            {product.category === "Skirts" && <Tag className="h-5 w-5" />}
                            {product.category === "Shirts" && <Tag className="h-5 w-5" />}
                            {product.category === "Pants" && <Package className="h-5 w-5" />}
                            {product.category === "Accessories" && <Tag className="h-5 w-5" />}
                            {![
                              "T-Shirts",
                              "Jeans",
                              "Dresses",
                              "Jackets",
                              "Sweaters",
                              "Skirts",
                              "Shirts",
                              "Pants",
                              "Accessories",
                            ].includes(product.category) && <Package className="h-5 w-5" />}
                          </div>
                          <div>{product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-slate-400" />
                          {product.price.replace("$", "")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StockStatusBadge status={product.status} stock={product.stock} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Truck className="h-4 w-4 text-slate-400" />
                          {product.supplier}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                              <Edit className="h-4 w-4" />
                              {t("edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                              <RefreshCw className="h-4 w-4" />
                              {t("restock")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                              <Trash className="h-4 w-4" />
                              {t("delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredInventory.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="in-stock" className="mt-6">
          <Card>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("product")}</TableHead>
                    <TableHead>{t("sku")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("price")}</TableHead>
                    <TableHead>{t("stock")}</TableHead>
                    <TableHead>{t("supplier")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory
                    .filter((product) => product.status === "in-stock")
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
                              <Package className="h-5 w-5" />
                            </div>
                            <div>{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <StockStatusBadge status={product.status} stock={product.stock} />
                        </TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Edit className="h-4 w-4" />
                                {t("edit")}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <RefreshCw className="h-4 w-4" />
                                {t("restock")}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-red-600">
                                <Trash className="h-4 w-4" />
                                {t("delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock" className="mt-6">
          <Card>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("product")}</TableHead>
                    <TableHead>{t("sku")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("price")}</TableHead>
                    <TableHead>{t("stock")}</TableHead>
                    <TableHead>{t("supplier")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory
                    .filter((product) => product.status === "low-stock")
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
                              <Package className="h-5 w-5" />
                            </div>
                            <div>{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <StockStatusBadge status={product.status} stock={product.stock} />
                        </TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            {t("restock")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="out-of-stock" className="mt-6">
          <Card>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("product")}</TableHead>
                    <TableHead>{t("sku")}</TableHead>
                    <TableHead>{t("category")}</TableHead>
                    <TableHead>{t("price")}</TableHead>
                    <TableHead>{t("stock")}</TableHead>
                    <TableHead>{t("supplier")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory
                    .filter((product) => product.status === "out-of-stock")
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
                              <Package className="h-5 w-5" />
                            </div>
                            <div>{product.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <StockStatusBadge status={product.status} stock={product.stock} />
                        </TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="default" size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            {t("restock")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StockStatusBadge({ status, stock }: { status: string; stock: number }) {
  const t = useTranslations()
  if (status === "out-of-stock") {
    return (
      <Badge variant="destructive" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        <span>{t("outOfStock")}</span>
      </Badge>
    )
  }

  if (status === "low-stock") {
    return (
      <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        <span>
          {stock} - {t("lowStock")}
        </span>
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200 flex items-center gap-1">
      <CheckCircle className="h-3 w-3" />
      {stock}
    </Badge>
  )
}
