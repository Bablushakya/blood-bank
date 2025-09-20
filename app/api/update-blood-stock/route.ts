import { NextResponse } from "next/server"
import type { BloodStock } from "@/types/bloodStock"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

// This should be the same data source as in your blood-stock-sse route
const bloodStockData: BloodStock[] = [
  { bloodType: "A+", quantity: 45, hospital: "Central Hospital" },
  { bloodType: "A-", quantity: 23, hospital: "Central Hospital" },
  { bloodType: "B+", quantity: 67, hospital: "East Side Medical" },
  { bloodType: "B-", quantity: 12, hospital: "East Side Medical" },
  { bloodType: "AB+", quantity: 8, hospital: "West End Clinic" },
  { bloodType: "AB-", quantity: 5, hospital: "West End Clinic" },
  { bloodType: "O+", quantity: 89, hospital: "North Valley Hospital" },
  { bloodType: "O-", quantity: 34, hospital: "North Valley Hospital" },
]

export async function POST(request: Request) {
  const body = await request.json()
  const newStock: BloodStock = {
    bloodType: body.bloodType,
    quantity: Number.parseInt(body.quantity),
    hospital: body.hospital,
  }

  // Update or add new stock
  const index = bloodStockData.findIndex(
    (stock) => stock.bloodType === newStock.bloodType && stock.hospital === newStock.hospital,
  )
  if (index !== -1) {
    bloodStockData[index] = newStock
  } else {
    bloodStockData.push(newStock)
  }

  return NextResponse.json({ message: "Blood stock updated successfully" })
}

export async function GET() {
  return NextResponse.json(bloodStockData)
}
