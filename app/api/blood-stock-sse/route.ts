import { NextResponse } from "next/server"
import type { BloodStock } from "@/types/bloodStock"

// Force dynamic rendering for this route
export const dynamic = "force-dynamic"

// Mock blood stock data - in a real app, this would come from a database
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

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const sendBloodStock = () => {
        const data = JSON.stringify(bloodStockData)
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      // Send initial data
      sendBloodStock()

      // Send updates every 10 seconds
      const interval = setInterval(() => {
        // Simulate some changes in blood stock
        bloodStockData.forEach((stock) => {
          // Randomly adjust quantities slightly
          const change = Math.floor(Math.random() * 6) - 3 // -3 to +3
          stock.quantity = Math.max(0, stock.quantity + change)
        })
        sendBloodStock()
      }, 10000)

      // Clean up on close
      return () => {
        clearInterval(interval)
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Cache-Control",
    },
  })
}
