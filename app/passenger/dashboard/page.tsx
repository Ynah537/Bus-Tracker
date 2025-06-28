"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bus, MapPin, Clock, Search, Star, Navigation, Calendar, CreditCard, User, LogOut } from "lucide-react"
import Link from "next/link"

interface BusInfo {
  id: string
  number: string
  route: string
  nextStop: string
  eta: string
  distance: string
  passengers: number
  maxPassengers: number
  price: number
}

interface Booking {
  id: string
  busNumber: string
  route: string
  date: string
  time: string
  from: string
  to: string
  status: "confirmed" | "pending" | "cancelled"
  price: number
}

export default function PassengerDashboard() {
  const [nearbyBuses, setNearbyBuses] = useState<BusInfo[]>([
    {
      id: "1",
      number: "B001",
      route: "Downtown - Airport",
      nextStop: "Central Station",
      eta: "3 min",
      distance: "0.2 km",
      passengers: 23,
      maxPassengers: 50,
      price: 15,
    },
    {
      id: "2",
      number: "B002",
      route: "University - Mall",
      nextStop: "University Gate",
      eta: "7 min",
      distance: "0.5 km",
      passengers: 15,
      maxPassengers: 50,
      price: 12,
    },
    {
      id: "3",
      number: "B005",
      route: "Residential - Business District",
      nextStop: "Main Street",
      eta: "12 min",
      distance: "0.8 km",
      passengers: 31,
      maxPassengers: 50,
      price: 18,
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      busNumber: "B001",
      route: "Downtown - Airport",
      date: "2024-01-15",
      time: "09:30 AM",
      from: "Downtown Terminal",
      to: "Airport Terminal",
      status: "confirmed",
      price: 15,
    },
    {
      id: "2",
      busNumber: "B002",
      route: "University - Mall",
      date: "2024-01-16",
      time: "02:15 PM",
      from: "University Campus",
      to: "Shopping Mall",
      status: "pending",
      price: 12,
    },
  ])

  const [favoriteRoutes] = useState(["Downtown - Airport", "University - Mall"])
  const [searchTerm, setSearchTerm] = useState("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedBus, setSelectedBus] = useState<BusInfo | null>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyBuses((prev) =>
        prev.map((bus) => ({
          ...bus,
          eta: `${Math.max(1, Number.parseInt(bus.eta) - 1)} min`,
          passengers: Math.max(0, Math.min(bus.maxPassengers, bus.passengers + Math.floor((Math.random() - 0.5) * 3))),
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

  const getOccupancyColor = (passengers: number, max: number) => {
    const ratio = passengers / max
    if (ratio < 0.5) return "text-green-600"
    if (ratio < 0.8) return "text-yellow-600"
    return "text-red-600"
  }

  const getOccupancyText = (passengers: number, max: number) => {
    const ratio = passengers / max
    if (ratio < 0.5) return "Low"
    if (ratio < 0.8) return "Medium"
    return "High"
  }

  const handleBookRide = (bus: BusInfo) => {
    setSelectedBus(bus)
    setIsBookingOpen(true)
  }

  const confirmBooking = () => {
    if (selectedBus) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        busNumber: selectedBus.number,
        route: selectedBus.route,
        date: "2024-01-17",
        time: "10:00 AM",
        from: "Current Location",
        to: "Destination",
        status: "pending",
        price: selectedBus.price,
      }
      setBookings([newBooking, ...bookings])
      setIsBookingOpen(false)
      setSelectedBus(null)
    }
  }

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
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, John Doe</span>
              </div>
              <Link href="/map">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <MapPin className="h-4 w-4" />
                  View Map
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
          <p className="text-gray-600">Track your buses, manage bookings, and plan your journey</p>
        </div>

        <Tabs defaultValue="nearby" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="nearby" className="gap-2">
              <Navigation className="h-4 w-4" />
              Nearby Buses
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nearby">
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search routes or bus numbers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              {/* Nearby Buses */}
              <div className="grid gap-6">
                {filteredBuses.map((bus) => (
                  <Card key={bus.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-xl">Bus {bus.number}</h3>
                          <p className="text-gray-600">{bus.route}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">
                            {bus.distance} away
                          </Badge>
                          <div className="text-lg font-bold text-blue-600">${bus.price}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Occupancy:</span>
                          <span
                            className={`text-sm font-medium ${getOccupancyColor(bus.passengers, bus.maxPassengers)}`}
                          >
                            {getOccupancyText(bus.passengers, bus.maxPassengers)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {bus.passengers}/{bus.maxPassengers} seats
                          </span>
                        </div>
                      </div>

                      {/* Occupancy Bar */}
                      <div className="mb-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              bus.passengers / bus.maxPassengers < 0.5
                                ? "bg-green-500"
                                : bus.passengers / bus.maxPassengers < 0.8
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${(bus.passengers / bus.maxPassengers) * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          className="flex-1"
                          onClick={() => handleBookRide(bus)}
                          disabled={bus.passengers >= bus.maxPassengers}
                        >
                          {bus.passengers >= bus.maxPassengers ? "Bus Full" : "Book Ride"}
                        </Button>
                        <Button variant="outline" size="default">
                          Track Live
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your bus reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">Bus {booking.busNumber}</h4>
                          <p className="text-gray-600">{booking.route}</p>
                        </div>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Date:</strong> {booking.date}
                        </div>
                        <div>
                          <strong>Time:</strong> {booking.time}
                        </div>
                        <div>
                          <strong>From:</strong> {booking.from}
                        </div>
                        <div>
                          <strong>To:</strong> {booking.to}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <span className="font-semibold text-blue-600">${booking.price}</span>
                        <div className="flex gap-2">
                          {booking.status === "confirmed" && (
                            <Button size="sm" variant="outline">
                              View Ticket
                            </Button>
                          )}
                          {booking.status !== "cancelled" && (
                            <Button size="sm" variant="outline">
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Favorite Routes
                </CardTitle>
                <CardDescription>Quick access to your most used routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {favoriteRoutes.map((route, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{route}</h4>
                        <p className="text-sm text-gray-600">Frequently used route</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Quick Book
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Your Ride</DialogTitle>
            <DialogDescription>
              Reserve your seat on Bus {selectedBus?.number} - {selectedBus?.route}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">From</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pickup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="downtown">Downtown Terminal</SelectItem>
                    <SelectItem value="central">Central Station</SelectItem>
                    <SelectItem value="university">University Gate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="to">To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airport">Airport Terminal</SelectItem>
                    <SelectItem value="mall">Shopping Mall</SelectItem>
                    <SelectItem value="business">Business District</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input type="date" defaultValue="2024-01-17" />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input type="time" defaultValue="10:00" />
              </div>
            </div>
            <div>
              <Label htmlFor="passengers">Number of Passengers</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select passengers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4 Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">${selectedBus?.price}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 gap-2" onClick={confirmBooking}>
                <CreditCard className="h-4 w-4" />
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
