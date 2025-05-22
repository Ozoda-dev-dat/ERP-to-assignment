"use client"

import { useState } from "react"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Button } from "@/components/ui/button"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

// Sample data
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 15000, 18000, 22000, 25000, 32000, 38000, 42000, 45000, 48000, 52000, 58000],
      borderColor: "rgb(20, 184, 166)",
      backgroundColor: "rgba(20, 184, 166, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
}

const inventoryData = {
  labels: ["T-Shirts", "Jeans", "Dresses", "Jackets", "Sweaters", "Skirts"],
  datasets: [
    {
      label: "Current Stock",
      data: [120, 85, 65, 45, 30, 25],
      backgroundColor: [
        "rgba(20, 184, 166, 0.7)",
        "rgba(56, 189, 248, 0.7)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(236, 72, 153, 0.7)",
        "rgba(245, 158, 11, 0.7)",
        "rgba(16, 185, 129, 0.7)",
      ],
    },
  ],
}

const customerData = {
  labels: ["New", "Returning", "Regular", "VIP"],
  datasets: [
    {
      label: "Customer Segments",
      data: [25, 35, 30, 10],
      backgroundColor: [
        "rgba(20, 184, 166, 0.7)",
        "rgba(56, 189, 248, 0.7)",
        "rgba(168, 85, 247, 0.7)",
        "rgba(236, 72, 153, 0.7)",
      ],
      borderColor: ["rgba(20, 184, 166, 1)", "rgba(56, 189, 248, 1)", "rgba(168, 85, 247, 1)", "rgba(236, 72, 153, 1)"],
      borderWidth: 1,
    },
  ],
}

type ChartType = "sales" | "inventory" | "customers"

interface DashboardChartsProps {
  type: ChartType
}

export function DashboardCharts({ type }: DashboardChartsProps) {
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("month")

  const renderChart = () => {
    switch (type) {
      case "sales":
        return (
          <div className="h-[350px] flex items-center justify-center">
            <Line
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value}`,
                    },
                  },
                },
              }}
            />
          </div>
        )
      case "inventory":
        return (
          <div className="h-[350px] flex items-center justify-center">
            <Bar
              data={inventoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top" as const,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        )
      case "customers":
        return (
          <div className="h-[350px] flex items-center justify-center">
            <div className="w-[350px]">
              <Pie
                data={customerData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right" as const,
                    },
                  },
                }}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={timeframe === "week" ? "default" : "outline"}
            size="sm"
            className="rounded-l-md rounded-r-none"
            onClick={() => setTimeframe("week")}
          >
            Week
          </Button>
          <Button
            variant={timeframe === "month" ? "default" : "outline"}
            size="sm"
            className="rounded-none border-l-0 border-r-0"
            onClick={() => setTimeframe("month")}
          >
            Month
          </Button>
          <Button
            variant={timeframe === "year" ? "default" : "outline"}
            size="sm"
            className="rounded-r-md rounded-l-none"
            onClick={() => setTimeframe("year")}
          >
            Year
          </Button>
        </div>
      </div>
      {renderChart()}
    </div>
  )
}
