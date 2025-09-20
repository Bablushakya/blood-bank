"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

interface Alert {
  id: string
  bloodType: string
  hospital: string
  quantity: number
  createdAt: string
}

export default function EmergencyAlert() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const eventSource = new EventSource("/api/emergency-alerts-sse")

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setAlerts(data)
    }

    return () => {
      eventSource.close()
    }
  }, [])

  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
      <div className="flex items-center mb-2">
        <AlertCircle className="h-6 w-6 mr-2" />
        <p className="font-bold text-lg">Emergency Blood Requests</p>
      </div>
      <ul className="list-disc list-inside">
        {alerts.map((alert) => (
          <li key={alert.id} className="mb-2">
            <span className="font-semibold">{alert.hospital}</span> urgently needs
            <span className="font-semibold"> {alert.quantity} units</span> of
            <span className="font-semibold"> {alert.bloodType}</span> blood.
            <span className="text-sm text-red-600 ml-2">Posted: {new Date(alert.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
