import { NextResponse } from "next/server"
import type { BloodOrder } from "@/types/user"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

// Mock orders data - in a real app, this would come from a database
const mockOrders: BloodOrder[] = []

export async function POST(request: Request) {
  const body = await request.json()
  const newOrder: BloodOrder = {
    id: `order-${Date.now()}`,
    userId: "1", // In a real app, this would come from authentication
    bloodType: body.bloodType,
    quantity: Number.parseInt(body.quantity),
    urgency: body.urgency,
    reason: body.reason,
    preferredHospital: body.preferredHospital,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  mockOrders.push(newOrder)
  return NextResponse.json({ message: "Blood order placed successfully", orderId: newOrder.id })
}
