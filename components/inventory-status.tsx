"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "T-Shirts",
    stock: 120,
    lowStock: 20,
  },
  {
    name: "Jeans",
    stock: 85,
    lowStock: 15,
  },
  {
    name: "Dresses",
    stock: 65,
    lowStock: 10,
  },
  {
    name: "Jackets",
    stock: 45,
    lowStock: 10,
  },
  {
    name: "Sweaters",
    stock: 30,
    lowStock: 8,
  },
  {
    name: "Skirts",
    stock: 25,
    lowStock: 5,
  },
]

export function InventoryStatus() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                      <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Stock</span>
                      <span className="font-bold">{payload[0].value} units</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Bar dataKey="stock" fill="#7c3aed" radius={[4, 4, 0, 0]} />
        <Bar dataKey="lowStock" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
