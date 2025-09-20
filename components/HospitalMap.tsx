"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"

interface Hospital {
  id: string
  name: string
  address: string
  bloodTypes: string[]
  distance: number
  phone: string
  availability: "24/7" | "Business Hours"
}

interface HospitalMapProps {
  className?: string
}

export default function HospitalMap({ className = "" }: HospitalMapProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)

  useEffect(() => {
    // Mock hospital data
    setHospitals([
      {
        id: "1",
        name: "Central Hospital",
        address: "123 Main St, Downtown",
        bloodTypes: ["A+", "A-", "B+", "O+", "O-"],
        distance: 2.3,
        phone: "+1-555-0101",
        availability: "24/7",
      },
      {
        id: "2",
        name: "East Side Medical Center",
        address: "456 Oak Ave, East District",
        bloodTypes: ["A+", "B+", "B-", "AB+", "O+"],
        distance: 4.1,
        phone: "+1-555-0102",
        availability: "Business Hours",
      },
      {
        id: "3",
        name: "West End Clinic",
        address: "789 Pine Rd, West Side",
        bloodTypes: ["A-", "B-", "AB-", "O-"],
        distance: 6.7,
        phone: "+1-555-0103",
        availability: "Business Hours",
      },
      {
        id: "4",
        name: "North Valley Hospital",
        address: "321 Elm St, North Valley",
        bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        distance: 8.2,
        phone: "+1-555-0104",
        availability: "24/7",
      },
    ])
  }, [])

  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold mb-4">Nearby Hospitals & Blood Banks</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hospital List */}
        <div className="lg:col-span-2 space-y-4">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedHospital?.id === hospital.id
                  ? "border-red-500 bg-red-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
              onClick={() => setSelectedHospital(hospital)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{hospital.name}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hospital.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Navigation className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hospital.distance} km away</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hospital.availability}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      hospital.availability === "24/7" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {hospital.availability === "24/7" ? "Open 24/7" : "Limited Hours"}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Available Blood Types:</p>
                <div className="flex flex-wrap gap-1">
                  {hospital.bloodTypes.map((type) => (
                    <span key={type} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hospital Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
            {selectedHospital ? (
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{selectedHospital.name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Address:</p>
                    <p className="text-gray-600">{selectedHospital.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Distance:</p>
                    <p className="text-gray-600">{selectedHospital.distance} km away</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Phone:</p>
                    <p className="text-gray-600">{selectedHospital.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Availability:</p>
                    <p className="text-gray-600">{selectedHospital.availability}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Available Blood Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedHospital.bloodTypes.map((type) => (
                        <span key={type} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Call Hospital
                    </button>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                      <Navigation className="h-4 w-4 inline mr-2" />
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Hospital Directory</p>
                <p className="text-sm">
                  Select a hospital from the list to view detailed information and contact options.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
