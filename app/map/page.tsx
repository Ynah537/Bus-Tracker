"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Bus, MapPin, Search, RefreshCw } from "lucide-react"
import Link from "next/link"

interface BusLocation {
  id: string
  number: string
  route: string
  lat: number
  lng: number
  status: "active" | "inactive"
  passengers: number
  speed: number
  nextStop: string
  eta: string
}

export default function MapPage() {
  const [buses, setBuses] = useState<BusLocation[]>([
    {
      id: "1",
      number: "B001",
      route: "Downtown - Airport",
      lat: 40.7128,
      lng: -74.006,
      status: "active",
      passengers: 23,
      speed: 35,
      nextStop: "Central Station",
      eta: "3 min",
    },
    {
      id: "2",
      number: "B002",
      route: "University - Mall",
      lat: 40.7589,
      lng: -73.9851,
      status: "active",
      passengers: 15,
      speed: 28,
      nextStop: "University Gate",
      eta: "5 min",
    },
  ])

  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          lat: bus.lat + (Math.random() - 0.5) * 0.001,
          lng: bus.lng + (Math.random() - 0.5) * 0.001,
          speed: Math.max(0, bus.speed + (Math.random() - 0.5) * 10),
          passengers: Math.max(0, Math.min(50, bus.passengers + Math.floor((Math.random() - 0.5) * 5))),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const filteredBuses = buses.filter(
    (bus) =>
      bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">BusTracker Pro</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search buses or routes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-3">
              {filteredBuses.map((bus) => (
                <Card
                  key={bus.id}
                  className={`cursor-pointer transition-colors ${
                    selectedBus?.id === bus.id ? "ring-2 ring-blue-500" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedBus(bus)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-sm font-medium">Bus {bus.number}</CardTitle>
                        <p className="text-xs text-gray-600">{bus.route}</p>
                      </div>
                      <Badge variant={bus.status === "active" ? "default" : "secondary"}>{bus.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Passengers:</span>
                        <span>{bus.passengers}/50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Speed:</span>
                        <span>{Math.round(bus.speed)} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Stop:</span>
                        <span>{bus.nextStop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ETA:</span>
                        <span className="text-green-600 font-medium">{bus.eta}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-4">Real-time bus tracking map would display here</p>
              <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
                <h4 className="font-medium mb-3">Live Bus Positions:</h4>
                <div className="space-y-2">
                  {filteredBuses.map((bus) => (
                    <div key={bus.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${bus.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <span className="text-sm font-medium">Bus {bus.number}</span>
                      </div>
                      <span className="text-xs text-gray-600">
                        {bus.lat.toFixed(4)}, {bus.lng.toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Bus Info */}
          {selectedBus && (
            <div className="absolute top-4 right-4 w-72">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bus className="h-5 w-5" />
                    Bus {selectedBus.number}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Route:</strong> {selectedBus.route}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <Badge className="ml-2" variant={selectedBus.status === "active" ? "default" : "secondary"}>
                        {selectedBus.status}
                      </Badge>
                    </div>
                    <div>
                      <strong>Passengers:</strong> {selectedBus.passengers}/50
                    </div>
                    <div>
                      <strong>Speed:</strong> {Math.round(selectedBus.speed)} km/h
                    </div>
                    <div>
                      <strong>Next Stop:</strong> {selectedBus.nextStop}
                    </div>
                    <div>
                      <strong>ETA:</strong> <span className="text-green-600 font-medium">{selectedBus.eta}</span>
                    </div>
                    <div>
                      <strong>Location:</strong> {selectedBus.lat.toFixed(4)}, {selectedBus.lng.toFixed(4)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
