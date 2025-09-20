import { NextResponse } from "next/server"
import type { BloodOrder } from "@/types/user"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

// Mock orders data - in a real app, this would come from a database
const mockOrders: BloodOrder[] = [
  {
    id: "1",
    userId: "1",
    bloodType: "O+",
    quantity: 2,
    urgency: "urgent",
    reason: "Surgery preparation",
    preferredHospital: "Central Hospital",
    status: "fulfilled",
    createdAt: "2024-01-15T10:00:00Z",
    fulfilledAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "2",
    userId: "1",
    bloodType: "O+",
    quantity: 1,
    urgency: "normal",
    reason: "Regular transfusion",
    preferredHospital: "City Medical Center",
    status: "pending",
    createdAt: "2024-01-20T09:00:00Z",
  },
]

export async function GET() {
  // In a real app, filter by authenticated user ID
  return NextResponse.json(mockOrders)
}
