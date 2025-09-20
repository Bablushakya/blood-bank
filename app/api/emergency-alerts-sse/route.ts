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

// Shared emergency alerts data - should match the data in emergency-alert route
const emergencyAlerts: EmergencyAlert[] = [
  {
    id: "alert-1",
    bloodType: "O-",
    quantity: 5,
    hospital: "Central Hospital",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
]

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      const sendAlerts = () => {
        try {
          const data = JSON.stringify(emergencyAlerts)
          controller.enqueue(encoder.encode(`data: ${data}\n\n`))
        } catch (error) {
          console.error("Error sending alerts:", error)
        }
      }

      // Send initial data
      sendAlerts()

      // Send updates every 15 seconds
      const interval = setInterval(sendAlerts, 15000)

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
