import { NextResponse } from "next/server"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const body = await request.json()
  // In a real application, you would process the blood request here
  console.log("Blood request received:", body)
  return NextResponse.json({ message: "Blood request received successfully" })
}
