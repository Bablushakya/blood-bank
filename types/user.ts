export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  bloodType: string
  dateOfBirth: string
  createdAt: string
}

export interface BloodOrder {
  id: string
  userId: string
  bloodType: string
  quantity: number
  urgency: "normal" | "urgent" | "emergency"
  reason: string
  preferredHospital?: string
  status: "pending" | "approved" | "rejected" | "fulfilled"
  createdAt: string
  fulfilledAt?: string
}
