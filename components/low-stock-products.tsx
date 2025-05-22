import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, Package } from "lucide-react"

const lowStockProducts = [
  {
    id: "PROD-007",
    name: "Slim Fit ko'ylak",
    category: "Ko'ylaklar",
    sku: "SH-SLM-007",
    stock: 5,
    lowStock: 10,
    price: "$54.99",
    status: "low-stock",
  },
  {
    id: "PROD-008",
    name: "Kargo shim",
    category: "Shimlar",
    sku: "PT-CRG-008",
    stock: 0,
    lowStock: 12,
    price: "$69.99",
    status: "out-of-stock",
  },
  {
    id: "PROD-012",
    name: "Charm kamar",
    category: "Aksessuarlar",
    sku: "AC-BLT-012",
    stock: 3,
    lowStock: 8,
    price: "$34.99",
    status: "low-stock",
  },
  {
    id: "PROD-015",
    name: "Jun sharf",
    category: "Aksessuarlar",
    sku: "AC-SCF-015",
    stock: 4,
    lowStock: 10,
    price: "$29.99",
    status: "low-stock",
  },
  {
    id: "PROD-023",
    name: "Jinsi kurtka",
    category: "Kurtkalar",
    sku: "JK-DNM-023",
    stock: 2,
    lowStock: 5,
    price: "$89.99",
    status: "low-stock",
  },
]

export function LowStockProducts() {
  return (
    <div className="space-y-4">
      {lowStockProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 text-amber-800">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-muted-foreground">{product.category}</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <StockStatusBadge status={product.status} />
              <span className="text-sm font-medium">{product.stock}</span>
            </div>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Qayta to'ldirish
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function StockStatusBadge({ status }: { status: string }) {
  if (status === "out-of-stock") {
    return (
      <Badge variant="destructive" className="flex items-center gap-1 h-5">
        <AlertCircle className="h-3 w-3" />
        <span>Tugagan</span>
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 h-5">
      Kam qolgan
    </Badge>
  )
}
