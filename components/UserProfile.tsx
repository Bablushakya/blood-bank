"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, Calendar, Droplet } from "lucide-react"
import type { UserProfile as UserProfileType } from "@/types/user"

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfileType | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserProfileType | null>(null)

  useEffect(() => {
    // Fetch user profile data
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setEditData(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      })
      if (response.ok) {
        setProfile(editData)
        setIsEditing(false)
        alert("Profile updated successfully!")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editData) {
      setEditData({ ...editData, [e.target.name]: e.target.value })
    }
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <User className="h-5 w-5 text-gray-500" />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData?.name || ""}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-gray-500" />
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData?.email || ""}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-gray-500" />
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={editData?.phone || ""}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
            />
          ) : (
            <span>{profile.phone}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-gray-500" />
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editData?.address || ""}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
            />
          ) : (
            <span>{profile.address}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Droplet className="h-5 w-5 text-red-500" />
          {isEditing ? (
            <select
              name="bloodType"
              value={editData?.bloodType || ""}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
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
          ) : (
            <span className="font-semibold text-red-600">{profile.bloodType}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-gray-500" />
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={editData?.dateOfBirth || ""}
              onChange={handleChange}
              className="flex-1 p-2 border rounded"
            />
          ) : (
            <span>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mt-6">
          <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}
