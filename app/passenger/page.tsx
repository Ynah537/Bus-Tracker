"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bus, MapPin, Clock, Search, Star, Navigation, Bell } from "lucide-react"
import Link from "next/link"

interface BusInfo {
  id: string
  number: string
  route: string
  nextStop: string
  eta: string
  distance: string
}

export default function PassengerPage() {
  const [nearbyBuses, setNearbyBuses] = useState<BusInfo[]>([
    {
      id: "1",
      number: "B001",
      route: "Downtown - Airport",
      nextStop: "Central Station",
      eta: "3 min",
      distance: "0.2 km",
    },
    {
      id: "2",
      number: "B002",
      route: "University - Mall",
      nextStop: "University Gate",
      eta: "7 min",
      distance: "0.5 km",
    },
    {
      id: "3",
      number: "B005",
      route: "Residential - Business District",
      nextStop: "Main Street",
      eta: "12 min",
      distance: "0.8 km",
    },
  ])

  const [favoriteRoutes] = useState(["Downtown - Airport", "University - Mall"])

  const [searchTerm, setSearchTerm] = useState("")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: `${Math.max(1, Number.parseInt(bus.eta) - 1)} min`,
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const filteredBuses = nearbyBuses.filter(
    (bus) =>
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">BusTrek</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/map">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <MapPin className="h-4 w-4" />
                  View Map
                </Button>
              </Link>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Track your buses and monitor real-time arrivals</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search routes or bus numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Favorite Routes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Favorite Routes
            </CardTitle>
            <CardDescription>Quick access to your most used routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {favoriteRoutes.map((route, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-blue-100">
                  {route}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Buses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-blue-600" />
              Nearby Buses
            </CardTitle>
            <CardDescription>Real-time information for buses near your location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredBuses.map((bus) => (
                <div key={bus.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">Bus {bus.number}</h3>
                      <p className="text-gray-600">{bus.route}</p>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {bus.distance} away
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>ETA:</strong> <span className="text-green-600 font-medium">{bus.eta}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Next:</strong> {bus.nextStop}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Distance:</span>
                      <span className="text-sm font-medium text-blue-600">{bus.distance}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/map">
                        <Button size="sm" variant="outline">
                          Track Live
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                        <Bell className="h-3 w-3" />
                        Set Alert
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
                     