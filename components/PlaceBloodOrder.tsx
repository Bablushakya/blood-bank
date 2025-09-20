"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

export default function PlaceBloodOrder() {
  const [orderData, setOrderData] = useState({
    bloodType: "",
    quantity: 1,
    urgency: "normal",
    reason: "",
    preferredHospital: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/user/blood-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
      if (response.ok) {
        setOrderData({
          bloodType: "",
          quantity: 1,
          urgency: "normal",
          reason: "",
          preferredHospital: "",
        })
        alert("Blood order placed successfully!")
      } else {
        alert("Failed to place blood order")
      }
    } catch (error) {
      console.error("Error placing order:", error)
      alert("An error occurred while placing the order")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Place Blood Order</h2>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
          <div>
            <p className="text-sm text-yellow-700">
              <strong>Important:</strong> Blood orders require medical verification and approval. Please ensure you have
              proper medical documentation.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-1">
            Blood Type Required
          </label>
          <select
            id="bloodType"
            name="bloodType"
            value={orderData.bloodType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
            Quantity (units)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            value={orderData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <select
            id="urgency"
            name="urgency"
            value={orderData.urgency}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Medical Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            value={orderData.reason}
            onChange={handleChange}
            placeholder="Please provide medical reason for blood requirement..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label htmlFor="preferredHospital" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Hospital
          </label>
          <input
            type="text"
            id="preferredHospital"
            name="preferredHospital"
            value={orderData.preferredHospital}
            onChange={handleChange}
            placeholder="Enter preferred hospital name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Place Blood Order
        </button>
      </form>
    </div>
  )
}
