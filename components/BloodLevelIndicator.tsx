"use client"

import { useState, useEffect } from "react"
import type { BloodStock } from "@/types/bloodStock"

interface BloodLevelIndicatorProps {
  className?: string
}

export default function BloodLevelIndicator({ className = "" }: BloodLevelIndicatorProps) {
  const [bloodLevels, setBloodLevels] = useState<Record<string, number>>({})

  useEffect(() => {
    const eventSource = new EventSource("/api/blood-stock-sse")

    eventSource.onmessage = (event) => {
      const data: BloodStock[] = JSON.parse(event.data)
      const levels: Record<string, number> = {}
      data.forEach((stock) => {
        levels[stock.bloodType] = (levels[stock.bloodType] || 0) + stock.quantity
      })
      setBloodLevels(levels)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">Blood Level Indicator</h2>
      <div className="grid grid-cols-4 gap-4">
        {bloodTypes.map((type) => (
          <div key={type} className="text-center">
            <div className="text-lg font-semibold">{type}</div>
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <div
                className="bg-red-500 rounded-full"
                style={{
                  width: `${Math.min(100, (bloodLevels[type] || 0) / 2)}%`,
                  height: `${Math.min(100, (bloodLevels[type] || 0) / 2)}%`,
                  transition: "all 0.5s ease-in-out",
                }}
              ></div>
            </div>
            <div className="mt-2">{bloodLevels[type] || 0} units</div>
          </div>
        ))}
      </div>
    </div>
  )
}
