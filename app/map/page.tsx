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
  fare: number // Add this line
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
      fare: 15,
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
      fare: 12,
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
              <h1 className="text-2xl font-bold text-gray-900">Bustrek</h1>
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
          <div className="absolute inset-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.290558162733!2d123.87089164388735!3d9.656195743637198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa4d5d08d89e4b%3A0xb582414b7477ee29!2sDao%20Integrated%20Bus%20Terminal!5e0!3m2!1sen!2sph!4v1751090779361!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bus Terminal Location Map"
            />

            {/* Overlay for bus positions */}
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-sm max-w-sm">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Live Bus Positions
              </h4>
              <div className="space-y-2">
                {filteredBuses.map((bus) => (
                  <div
                    key={bus.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedBus(bus)}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${bus.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <span className="text-sm font-medium">Bus {bus.number}</span>
                    </div>
                    <span className="text-xs text-gray-600">${bus.fare}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Bus Info - keep this section as is */}
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
                      <strong>Fare:</strong> <span className="text-blue-600 font-medium">${selectedBus.fare}</span>
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
