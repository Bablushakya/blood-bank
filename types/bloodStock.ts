export interface BloodStock {
  bloodType: string
  quantity: number
  hospital: string
}

export interface BloodRequest {
  bloodType: string
  quantity: number
  hospital: string
  urgency: "normal" | "urgent" | "emergency"
}

export interface EmergencyAlert {
  id: string
  bloodType: string
  quantity: number
  hospital: string
  createdAt: string
}
