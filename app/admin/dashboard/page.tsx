"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Route, Plus, Edit, Trash2, MapPin, LogOut, User, BusIcon, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Bus {
  id: string
  number: string
  route: string
  driver: string
  status: "active" | "inactive" | "maintenance"
  lastUpdate: string
  passengers: number
  revenue: number
}

interface RouteData {
  id: string
  name: string
  startPoint: string
  endPoint: string
  stops: number
  distance: string
  duration: string
  activeBuses: number
  dailyRevenue: number
}

interface Booking {
  id: string
  passengerName: string
  busNumber: string
  route: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  amount: number
}

export default function AdminDashboard() {
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: "1",
      number: "B001",
      route: "Downtown - Airport",
      driver: "John Smith",
      status: "active",
      lastUpdate: "2 min ago",
      passengers: 23,
      revenue: 345,
    },
    {
      id: "2",
      number: "B002",
      route: "University - Mall",
      driver: "Sarah Johnson",
      status: "active",
      lastUpdate: "1 min ago",
      passengers: 15,
      revenue: 180,
    },
    {
      id: "3",
      number: "B003",
      route: "Residential - Business District",
      driver: "Mike Wilson",
      status: "maintenance",
      lastUpdate: "45 min ago",
      passengers: 0,
      revenue: 0,
    },
  ])

  const [routes, setRoutes] = useState<RouteData[]>([
    {
      id: "1",
      name: "Downtown - Airport",
      startPoint: "Downtown Terminal",
      endPoint: "Airport Terminal",
      stops: 12,
      distance: "25 km",
      duration: "45 min",
      activeBuses: 3,
      dailyRevenue: 1250,
    },
    {
      id: "2",
      name: "University - Mall",
      startPoint: "University Campus",
      endPoint: "Shopping Mall",
      stops: 8,
      distance: "15 km",
      duration: "30 min",
      activeBuses: 2,
      dailyRevenue: 890,
    },
    {
      id: "3",
      name: "Residential - Business District",
      startPoint: "Residential Area",
      endPoint: "Business District",
      stops: 10,
      distance: "20 km",
      duration: "35 min",
      activeBuses: 2,
      dailyRevenue: 675,
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      passengerName: "John Doe",
      busNumber: "B001",
      route: "Downtown - Airport",
      date: "2024-01-15",
      time: "09:30 AM",
      status: "confirmed",
      amount: 15,
    },
    {
      id: "2",
      passengerName: "Jane Smith",
      busNumber: "B002",
      route: "University - Mall",
      date: "2024-01-15",
      time: "02:15 PM",
      status: "pending",
      amount: 12,
    },
    {
      id: "3",
      passengerName: "Mike Johnson",
      busNumber: "B001",
      route: "Downtown - Airport",
      date: "2024-01-15",
      time: "11:00 AM",
      status: "confirmed",
      amount: 15,
    },
  ])

  const [isAddBusOpen, setIsAddBusOpen] = useState(false)
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false)

  const totalRevenue = routes.reduce((sum, route) => sum + route.dailyRevenue, 0)
  const totalPassengers = buses.reduce((sum, bus) => sum + bus.passengers, 0)
  const activeBuses = buses.filter((bus) => bus.status === "active").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Route className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Admin User</span>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Administrator!</h2>
          <p className="text-gray-600">Manage your fleet, routes, and monitor system performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">Today's earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
              <BusIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeBuses}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{totalPassengers}</div>
              <p className="text-xs text-muted-foreground">Currently aboard</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Route className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{bookings.length}</div>
              <p className="text-xs text-muted-foreground">Today's reservations</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="buses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="buses" className="gap-2">
              <BusIcon className="h-4 w-4" />
              Fleet Management
            </TabsTrigger>
            <TabsTrigger value="routes" className="gap-2">
              <Route className="h-4 w-4" />
              Routes
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Users className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Route className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buses">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Fleet Management</CardTitle>
                    <CardDescription>Monitor and manage your bus fleet in real-time</CardDescription>
                  </div>
                  <Dialog open={isAddBusOpen} onOpenChange={setIsAddBusOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Bus
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Bus</DialogTitle>
                        <DialogDescription>Enter the details for the new bus</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="bus-number">Bus Number</Label>
                          <Input id="bus-number" placeholder="B004" />
                        </div>
                        <div>
                          <Label htmlFor="driver-name">Driver Name</Label>
                          <Input id="driver-name" placeholder="Driver Name" />
                        </div>
                        <div>
                          <Label htmlFor="route-select">Route</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a route" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="route1">Downtown - Airport</SelectItem>
                              <SelectItem value="route2">University - Mall</SelectItem>
                              <SelectItem value="route3">Residential - Business District</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Add Bus</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bus Number</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Passengers</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Last Update</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {buses.map((bus) => (
                      <TableRow key={bus.id}>
                        <TableCell className="font-medium">{bus.number}</TableCell>
                        <TableCell>{bus.route}</TableCell>
                        <TableCell>{bus.driver}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              bus.status === "active"
                                ? "default"
                                : bus.status === "maintenance"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {bus.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{bus.passengers}/50</TableCell>
                        <TableCell>${bus.revenue}</TableCell>
                        <TableCell>{bus.lastUpdate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Route Management</CardTitle>
                    <CardDescription>Manage bus routes and monitor performance</CardDescription>
                  </div>
                  <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Route
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Route</DialogTitle>
                        <DialogDescription>Enter the details for the new route</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="route-name">Route Name</Label>
                          <Input id="route-name" placeholder="Route Name" />
                        </div>
                        <div>
                          <Label htmlFor="start-point">Start Point</Label>
                          <Input id="start-point" placeholder="Starting Location" />
                        </div>
                        <div>
                          <Label htmlFor="end-point">End Point</Label>
                          <Input id="end-point" placeholder="Ending Location" />
                        </div>
                        <div>
                          <Label htmlFor="stops-count">Number of Stops</Label>
                          <Input id="stops-count" type="number" placeholder="10" />
                        </div>
                        <Button className="w-full">Add Route</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Route Name</TableHead>
                      <TableHead>Start Point</TableHead>
                      <TableHead>End Point</TableHead>
                      <TableHead>Stops</TableHead>
                      <TableHead>Distance</TableHead>
                      <TableHead>Active Buses</TableHead>
                      <TableHead>Daily Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>{route.startPoint}</TableCell>
                        <TableCell>{route.endPoint}</TableCell>
                        <TableCell>{route.stops}</TableCell>
                        <TableCell>{route.distance}</TableCell>
                        <TableCell>{route.activeBuses}</TableCell>
                        <TableCell className="font-medium text-green-600">${route.dailyRevenue}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Management</CardTitle>
                <CardDescription>Monitor and manage passenger reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Passenger</TableHead>
                      <TableHead>Bus</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.passengerName}</TableCell>
                        <TableCell>{booking.busNumber}</TableCell>
                        <TableCell>{booking.route}</TableCell>
                        <TableCell>
                          {booking.date} at {booking.time}
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="font-medium">${booking.amount}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {booking.status === "pending" && <Button size="sm">Confirm</Button>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="update-interval">GPS Update Interval (seconds)</Label>
                    <Input id="update-interval" type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label htmlFor="max-passengers">Maximum Passengers per Bus</Label>
                    <Input id="max-passengers" type="number" defaultValue="50" />
                  </div>
                  <div>
                    <Label htmlFor="booking-fee">Booking Fee ($)</Label>
                    <Input id="booking-fee" type="number" defaultValue="2" />
                  </div>
                  <div>
                    <Label htmlFor="cancellation-policy">Cancellation Policy (hours before)</Label>
                    <Input id="cancellation-policy" type="number" defaultValue="2" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
