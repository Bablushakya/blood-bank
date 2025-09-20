"use client"

import { useState } from "react"

interface BloodRequestFormProps {
  className?: string
}

export default function BloodRequestForm({ className = "" }: BloodRequestFormProps) {
  const [formData, setFormData] = useState({
    bloodType: "",
    quantity: 0,
    hospital: "",
    urgency: "normal",
    isEmergency: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const endpoint = formData.isEmergency ? "/api/emergency-alert" : "/api/blood-request"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setFormData({ bloodType: "", quantity: 0, hospital: "", urgency: "normal", isEmergency: false })
        alert(formData.isEmergency ? "Emergency alert sent successfully!" : "Blood request submitted successfully!")
      } else {
        alert("Failed to submit request")
      }
    } catch (error) {
      console.error("Error submitting request:", error)
      alert("An error occurred while submitting the request")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4">Request Blood</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="bloodType" className="block mb-2">
            Blood Type
          </label>
          <select
            id="bloodType"
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2">
            Quantity (units)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hospital" className="block mb-2">
            Requesting Hospital
          </label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="urgency" className="block mb-2">
            Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isEmergency"
              checked={formData.isEmergency}
              onChange={(e) => setFormData({ ...formData, isEmergency: e.target.checked })}
              className="mr-2"
            />
            <span className="text-red-600 font-semibold">This is an emergency request</span>
          </label>
        </div>
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Submit Request
        </button>
      </form>
    </div>
  )
}
