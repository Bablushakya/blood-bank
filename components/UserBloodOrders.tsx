"use client"

import { useState, useEffect } from "react"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { BloodOrder } from "@/types/user"

interface UserBloodOrdersProps {
  className?: string
}

export default function UserBloodOrders({ className = "" }: UserBloodOrdersProps) {
  const [orders, setOrders] = useState<BloodOrder[]>([])

  useEffect(() => {
    fetchUserOrders()
  }, [])

  const fetchUserOrders = async () => {
    try {
      const response = await fetch("/api/user/blood-orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "fulfilled":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "fulfilled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">My Blood Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No blood orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="font-semibold">
                    {order.bloodType} - {order.quantity} units
                  </span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.toUpperCase()}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Urgency:</strong> {order.urgency}
                </p>
                <p>
                  <strong>Reason:</strong> {order.reason}
                </p>
                {order.preferredHospital && (
                  <p>
                    <strong>Preferred Hospital:</strong> {order.preferredHospital}
                  </p>
                )}
                <p>
                  <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
                </p>
                {order.fulfilledAt && (
                  <p>
                    <strong>Fulfilled Date:</strong> {new Date(order.fulfilledAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
