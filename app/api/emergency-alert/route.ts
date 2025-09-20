import { NextResponse } from "next/server"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

interface EmergencyAlert {
  id: string
  bloodType: string
  quantity: number
  hospital: string
  createdAt: string
}

// Shared emergency alerts data - in a real app, this would be in a database
const emergencyAlerts: EmergencyAlert[] = [
  {
    id: "alert-1",
    bloodType: "O-",
    quantity: 5,
    hospital: "Central Hospital",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newAlert: EmergencyAlert = {
      id: `alert-${Date.now()}`,
      bloodType: body.bloodType,
      quantity: Number.parseInt(body.quantity),
      hospital: body.hospital,
      createdAt: new Date().toISOString(),
    }

    emergencyAlerts.push(newAlert)

    // In a real application, you would notify relevant parties here
    console.log("New emergency alert:", newAlert)

    return NextResponse.json({
      message: "Emergency alert sent successfully",
      alert: newAlert,
    })
  } catch (error) {
    console.error("Error creating emergency alert:", error)
    return NextResponse.json({ message: "Failed to create emergency alert" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(emergencyAlerts)
}
