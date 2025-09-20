import UserProfile from "@/components/UserProfile"
import UserBloodOrders from "@/components/UserBloodOrders"
import PlaceBloodOrder from "@/components/PlaceBloodOrder"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-red-600">User Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserProfile />
        </div>
        <div className="lg:col-span-2">
          <PlaceBloodOrder />
          <UserBloodOrders className="mt-8" />
        </div>
      </div>
    </div>
  )
}
