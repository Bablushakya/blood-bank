import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LifeLink Blood Bank Network",
  description: "Connecting hospitals and managing blood inventory",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-red-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              LifeLink Blood Bank
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-red-200">
                Dashboard
              </Link>
              <Link href="/profile" className="hover:text-red-200">
                Profile
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
