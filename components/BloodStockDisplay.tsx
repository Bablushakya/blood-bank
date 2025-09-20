"use client"

import { useState, useEffect } from "react"
import type { BloodStock } from "@/types/bloodStock"

export default function BloodStockDisplay() {
  const [bloodStock, setBloodStock] = useState<BloodStock[]>([])

  useEffect(() => {
    const eventSource = new EventSource("/api/blood-stock-sse")

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setBloodStock(data)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const getStatusColor = (quantity: number) => {
    if (quantity > 50) return "bg-green-500"
    if (quantity > 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Current Blood Stock</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bloodStock.map((stock, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg">
            <div className="text-lg font-semibold">{stock.bloodType}</div>
            <div className="text-2xl font-bold">{stock.quantity} units</div>
            <div className="text-sm text-gray-600">{stock.hospital}</div>
            <div className={`h-2 mt-2 rounded-full ${getStatusColor(stock.quantity)}`}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
