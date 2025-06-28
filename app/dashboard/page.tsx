"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bus, MapPin, Search, Clock, Users, Zap, Navigation } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface BusInfo {
  id: string
  number: string
  route: string
  status: "active" | "inactive" | "arriving"
  passengers: number
  nextStop: string
  eta: string
  fare: number
  capacity: number
}

export default function PassengerDashboard() {
  const router = useRouter()
  const [buses, setBuses] = useState<BusInfo[]>([
    {
      id: "1",
      number: "B001",
      route: "Downtown - Airport",
      status: "active",
      passengers: 23,
      nextStop: "Central Station",
      eta: "3 min",
      fare: 15,
      capacity: 50,
    },
    {
      id: "2",
      number: "B002",
      route: "University - Mall",
      status: "arriving",
      passengers: 15,
      nextStop: "University Gate",
      eta: "1 min",
      fare: 12,
      capacity: 50,
    },
    {
      id: "3",
      number: "B003",
      route: "Business District - Harbor",
      status: "active",
      passengers: 31,
      nextStop: "Business Plaza",
      eta: "5 min",
      fare: 18,
      capacity: 50,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          passengers: Math.max(0, Math.min(50, bus.passengers + Math.floor((Math.random() - 0.5) * 3))),
          eta: Math.random() > 0.7 ? `${Math.floor(Math.random() * 8) + 1} min` : bus.eta,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const filteredBuses = buses.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "arriving":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const getOccupancyColor = (passengers: number, capacity: number) => {
    const percentage = (passengers / capacity) * 100
    if (percentage > 80) return "text-red-600"
    if (percentage > 60) return "text-yellow-600"
    return "text-green-600"
  }

  const handleTrackLive = (busId?: string) => {
    if (busId) {
      router.push(`/map?bus=${busId}`)
    } else {
      router.push('/map')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Bustrek</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => handleTrackLive()} 
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Navigation className="h-4 w-4" />
                Track Live
              </Button>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Real-Time Bus Tracking</h2>
          <p className="text-lg text-gray-600 mb-6">Find your bus, track its location, and plan your journey</p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search bus number or route..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Bus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">{buses.filter(b => b.status === 'active').length}</h3>
              <p className="text-gray-600">Active Buses</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                {Math.min(...buses.map(b => parseInt(b.eta.split(' ')[0])))} min
              </h3>
              <p className="text-gray-600">Next Arrival</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                {buses.reduce((sum, bus) => sum + bus.passengers, 0)}
              </h3>
              <p className="text-gray-600">Total Passengers</p>
            </CardContent>
          </Card>
        </div>

        {/* Bus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuses.map((bus) => (
            <Card key={bus.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Bus className="h-5 w-5 text-blue-600" />
                      Bus {bus.number}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{bus.route}</p>
                  </div>
                  <Badge className={getStatusColor(bus.status)}>
                    {bus.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Next Stop */}
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Next Stop:</span>
                  <span className="text-sm font-medium">{bus.nextStop}</span>
                </div>

                {/* ETA */}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">ETA:</span>
                  <span className="text-sm font-bold text-green-600">{bus.eta}</span>
                </div>

                {/* Occupancy */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Occupancy:</span>
                  <span className={`text-sm font-medium ${getOccupancyColor(bus.passengers, bus.capacity)}`}>
                    {bus.passengers}/{bus.capacity}
                  </span>
                </div>

                {/* Fare */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fare:</span>
                  <span className="text-lg font-bold text-blue-600">${bus.fare}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleTrackLive(bus.id)}
                    className="flex-1 gap-2"
                    variant="default"
                  >
                    <Navigation className="h-4 w-4" />
                    Track Live
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="px-3"
                  >
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <Bus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
