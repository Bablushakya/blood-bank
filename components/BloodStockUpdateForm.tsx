"use client"

import { useState } from "react"
import type { BloodStock } from "@/types/bloodStock"

export default function BloodStockUpdateForm() {
  const [formData, setFormData] = useState<BloodStock>({
    bloodType: "",
    quantity: 0,
    hospital: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/update-blood-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setFormData({ bloodType: "", quantity: 0, hospital: "" })
        alert("Blood stock updated successfully")
      } else {
        alert("Failed to update blood stock")
      }
    } catch (error) {
      console.error("Error updating blood stock:", error)
      alert("An error occurred while updating blood stock")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Update Blood Stock</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">
            Blood Type
          </label>
          <select
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
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
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity (units)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
            Hospital
          </label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Update Stock
        </button>
      </form>
    </div>
  )
}
