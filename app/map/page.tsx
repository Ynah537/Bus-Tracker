"use client"

import { useState, useEffect, useRef } from "react"
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
      route: "Tagbilaran - Panglao",
      lat: 9.6496,
      lng: 123.8547,
      status: "active",
      passengers: 23,
      speed: 35,
      nextStop: "ICM Mall",
      eta: "3 min",
      fare: 15,
    },
    {
      id: "2",
      number: "B002",
      route: "Dao Terminal - Alona Beach",
      lat: 9.6000,
      lng: 123.8700,
      status: "active",
      passengers: 15,
      speed: 28,
      nextStop: "Panglao Junction",
      eta: "5 min",
      fare: 12,
    },
    {
      id: "3",
      number: "B003",
      route: "Tagbilaran Port - Baclayon",
      lat: 9.6400,
      lng: 123.8600,
      status: "active",
      passengers: 31,
      speed: 42,
      nextStop: "Blood Compact Site",
      eta: "2 min",
      fare: 18,
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

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const busMarkersRef = useRef<any[]>([])

  // Define paths for each bus (Bohol locations)
  const busPaths = [
    [
      [9.6496, 123.8547], // Tagbilaran City Hall
      [9.6520, 123.8520], // CPG Avenue
      [9.6550, 123.8500], // Plaza Rizal
      [9.6580, 123.8480], // ICM Mall
      [9.6600, 123.8450], // Panglao Junction
    ],
    [
      [9.6000, 123.8700], // Dao Terminal
      [9.6100, 123.8650], // Dao Bridge
      [9.6200, 123.8600], // Panglao Road
      [9.6300, 123.8550], // Panglao Junction
      [9.6400, 123.8500], // Alona Beach Road
    ],
    [
      [9.6400, 123.8600], // Tagbilaran Port
      [9.6420, 123.8650], // Port Access Road
      [9.6450, 123.8700], // Baclayon Road
      [9.6480, 123.8750], // Baclayon Church
      [9.6500, 123.8800], // Baclayon Plaza
    ],
  ]

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      const leafletCSS = document.createElement("link")
      leafletCSS.rel = "stylesheet"
      leafletCSS.href = "https://unpkg.com/leaflet/dist/leaflet.css"
      document.head.appendChild(leafletCSS)

      // Add custom CSS for bus icons
      const customCSS = document.createElement("style")
      customCSS.textContent = `
        .leaflet-marker-icon.bus-icon {
          transform-origin: center center;
          transition: transform 0.5s ease;
        }
        .bus-path {
          stroke-dasharray: 5, 10;
          animation: dash 1s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -15; }
        }
      `
      document.head.appendChild(customCSS)

      // Load Leaflet JS
      const leafletJS = document.createElement("script")
      leafletJS.src = "https://unpkg.com/leaflet/dist/leaflet.js"
      leafletJS.onload = () => {
        const L = (window as any).L

        // Initialize map centered on Bohol
        const map = L.map(mapRef.current).setView([9.6496, 123.8547], 13)

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map)

        // Custom bus icon using Unicode bus emoji or simple div
        const busIcon = L.divIcon({
          html: `<div style="
            background: #9ACD32;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: bold;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">🚌</div>`,
          className: 'bus-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })

        // Add path lines for each bus route
        const routeColors = ['#3B82F6', '#10B981', '#F59E0B']
        busPaths.forEach((path, index) => {
          L.polyline(path, {
            color: routeColors[index],
            weight: 4,
            opacity: 0.8,
            dashArray: '8, 12',
            className: 'bus-path'
          }).addTo(map)
        })

        // Initialize bus markers
        const markers: any[] = []
        busPaths.forEach((path, busIndex) => {
          const marker = L.marker(path[0], { icon: busIcon }).addTo(map)
          marker.bindPopup(`
            <div class="text-center p-2">
              <strong class="text-blue-600">Bus ${buses[busIndex]?.number || `B00${busIndex + 1}`}</strong><br>
              <span class="text-sm text-gray-700">${buses[busIndex]?.route || 'Route ' + (busIndex + 1)}</span><br>
              <span class="text-xs text-green-600 font-medium">Click to view details</span>
            </div>
          `)
          marker.on("click", () => {
            setSelectedBus(buses[busIndex] || buses[0])
          })
          markers.push({
            marker,
            path,
            index: 0,
          })
        })

        busMarkersRef.current = markers
        mapInstanceRef.current = map

        // Calculate angle for rotation (simplified)
        const calculateAngle = (from: number[], to: number[]) => {
          const dy = to[0] - from[0]
          const dx = to[1] - from[1]
          return Math.atan2(dy, dx) * (180 / Math.PI)
        }

        // Animate buses with smoother movement
        const animationInterval = setInterval(() => {
          markers.forEach((bus, index) => {
            const current = bus.path[bus.index]
            const next = bus.path[(bus.index + 1) % bus.path.length]

            // Smooth transition to next position
            bus.marker.setLatLng(next)

            bus.index = (bus.index + 1) % bus.path.length

            // Update bus data with current position (less frequent to reduce jitter)
            if (bus.index % 2 === 0) {
              setBuses(prev => prev.map((b, i) => 
                i === index ? { ...b, lat: next[0], lng: next[1] } : b
              ))
            }
          })
        }, 3000) // Slower animation for smoother movement

        // Cleanup function
        return () => {
          clearInterval(animationInterval)
        }
      }
      document.head.appendChild(leafletJS)
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Remove the separate bus position update effect to prevent conflicts
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setBuses((prev) =>
  //       prev.map((bus) => ({
  //         ...bus,
  //         lat: bus.lat + (Math.random() - 0.5) * 0.001,
  //         lng: bus.lng + (Math.random() - 0.5) * 0.001,
  //         speed: Math.max(0, bus.speed + (Math.random() - 0.5) * 10),
  //         passengers: Math.max(0, Math.min(50, bus.passengers + Math.floor((Math.random() - 0.5) * 5))),
  //       })),
  //     )
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [])

  // Add a separate effect for updating other bus properties (not position)
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          speed: Math.max(0, Math.min(60, bus.speed + (Math.random() - 0.5) * 8)),
          passengers: Math.max(0, Math.min(50, bus.passengers + Math.floor((Math.random() - 0.5) * 3))),
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

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
            <div
              ref={mapRef}
              className="w-full h-full border-2 border-blue-400 rounded-lg shadow"
              style={{ minHeight: "500px" }}
            />

            {/* Overlay for bus positions */}
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-sm max-w-sm z-[1000]">
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

          {/* Selected Bus Info */}
          {selectedBus && (
            <div className="absolute top-4 right-4 w-72 z-[1000]">
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
