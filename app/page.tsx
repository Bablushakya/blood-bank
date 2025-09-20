import BloodStockDisplay from "@/components/BloodStockDisplay"
import BloodStockUpdateForm from "@/components/BloodStockUpdateForm"
import BloodRequestForm from "@/components/BloodRequestForm"
import HospitalMap from "@/components/HospitalMap"
import BloodLevelIndicator from "@/components/BloodLevelIndicator"
import EmergencyAlert from "@/components/EmergencyAlert"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600">LifeLink Blood Bank Network</h1>
        <EmergencyAlert />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <BloodStockDisplay />
            <BloodLevelIndicator />
          </div>
          <div className="space-y-8">
            <BloodStockUpdateForm />
            <BloodRequestForm />
          </div>
        </div>
        <HospitalMap className="mt-8" />
      </div>
    </div>
  )
}
