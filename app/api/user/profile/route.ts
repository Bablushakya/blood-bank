import { NextResponse } from "next/server"
import type { UserProfile } from "@/types/user"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

// Mock user data - in a real app, this would come from a database
let mockUser: UserProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1-555-0123",
  address: "123 Main St, City, State 12345",
  bloodType: "O+",
  dateOfBirth: "1990-01-15",
  createdAt: "2024-01-01T00:00:00Z",
}

export async function GET() {
  return NextResponse.json(mockUser)
}

export async function PUT(request: Request) {
  const body = await request.json()
  mockUser = { ...mockUser, ...body }
  return NextResponse.json({ message: "Profile updated successfully" })
}
