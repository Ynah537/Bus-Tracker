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
import { Route, Plus, Edit, Trash2, MapPin, LogOut, User, BusIcon, Users, Crown, CreditCard } from "lucide-react"
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
  fare: number
}

interface Subscriber {
  id: string
  name: string
  email: string
  plan: "basic" | "premium" | "family"
  status: "active" | "expired" | "cancelled"
  joinDate: string
  revenue: number
}

interface Subscription {
  plan: "monthly" | "yearly"
  status: "active" | "expired" | "cancelled"
  startDate: string
  endDate: string
  price: number
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
      fare: 15,
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
      fare: 12,
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
      fare: 18,
    },
  ])

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      plan: "premium",
      status: "active",
      joinDate: "2024-01-15",
      revenue: 29.99,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      plan: "family",
      status: "active",
      joinDate: "2024-01-10",
      revenue: 49.99,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      plan: "basic",
      status: "active",
      joinDate: "2024-01-20",
      revenue: 0,
    },
  ])

  const [subscription, setSubscription] = useState<Subscription>({
    plan: "monthly",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    price: 29.99,
  })

  const [isAddBusOpen, setIsAddBusOpen] = useState(false)
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false)

  const totalRevenue = routes.reduce((sum, route) => sum + route.dailyRevenue, 0)
  const totalPassengers = buses.reduce((sum, bus) => sum + bus.passengers, 0)
  const activeBuses = buses.filter((bus) => bus.status === "active").length
  const subscriptionRevenue = subscribers.reduce((sum, sub) => sum + sub.revenue, 0)

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
              <CardTitle className="text-sm font-medium">Total Routes</CardTitle>
              <Route className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{routes.length}</div>
              <p className="text-xs text-muted-foreground">Available routes</p>
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
          
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="h-4 w-4" />
              My Subscription
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
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="bus-number">Bus Number</Label>
                          <Input id="bus-number" placeholder="B004" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="driver-name">Driver Name</Label>
                          <Input id="driver-name" placeholder="Driver Name" />
                        </div>
                        <div className="space-y-2">
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
                        <Button className="w-full mt-4">Add Bus</Button>
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
                      <TableHead>Last Update</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
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
                        <TableCell>{bus.lastUpdate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
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
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="route-name">Route Name</Label>
                          <Input id="route-name" placeholder="Route Name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="start-point">Start Point</Label>
                          <Input id="start-point" placeholder="Starting Location" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-point">End Point</Label>
                          <Input id="end-point" placeholder="Ending Location" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stops-count">Number of Stops</Label>
                          <Input id="stops-count" type="number" placeholder="10" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="route-fare">Fare ($)</Label>
                          <Input id="route-fare" type="number" placeholder="15" />
                        </div>
                        <Button className="w-full mt-4">Add Route</Button>
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
                      <TableHead className="text-center">Stops</TableHead>
                      <TableHead className="text-center">Distance</TableHead>
                      <TableHead className="text-center">Fare</TableHead>
                      <TableHead className="text-center">Active Buses</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {routes.map((route) => (
                      <TableRow key={route.id}>
                        <TableCell className="font-medium">{route.name}</TableCell>
                        <TableCell>{route.startPoint}</TableCell>
                        <TableCell>{route.endPoint}</TableCell>
                        <TableCell className="text-center">{route.stops}</TableCell>
                        <TableCell className="text-center">{route.distance}</TableCell>
                        <TableCell className="text-center font-medium text-blue-600">${route.fare}</TableCell>
                        <TableCell className="text-center">{route.activeBuses}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
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

          <TabsContent value="subscribers">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>Monitor and manage user subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Monthly Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">{subscriber.name}</TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscriber.plan === "premium"
                                ? "default"
                                : subscriber.plan === "family"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {subscriber.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscriber.status === "active"
                                ? "default"
                                : subscriber.status === "expired"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {subscriber.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{subscriber.joinDate}</TableCell>
                        <TableCell className="text-center font-medium">${subscriber.revenue}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
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

          <TabsContent value="subscription">
            <div className="space-y-6">
              {/* Current Subscription */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Current Subscription
                  </CardTitle>
                  <CardDescription>Manage your BusTracker Pro subscription</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Plan Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plan:</span>
                          <span className="font-medium capitalize">{subscription.plan}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge
                            variant={
                              subscription.status === "active"
                                ? "default"
                                : subscription.status === "expired"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {subscription.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium">${subscription.price}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next billing:</span>
                          <span className="font-medium">{subscription.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Premium Features</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>✓ Real-time bus tracking</li>
                        <li>✓ Unlimited route alerts</li>
                        <li>✓ Priority customer support</li>
                        <li>✓ Advanced trip planning</li>
                        <li>✓ No ads</li>
                        <li>✓ Admin dashboard access</li>
                        <li>✓ Fleet management tools</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Link href="/subscription/plans">
                      <Button>Upgrade Plan</Button>
                    </Link>
                    <Button variant="outline">Manage Billing</Button>
                    <Button variant="outline">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Plans Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Plans</CardTitle>
                  <CardDescription>Choose the plan that works best for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-lg mb-2">Monthly Plan</h4>
                      <div className="text-3xl font-bold text-blue-600 mb-2">$29.99</div>
                      <p className="text-sm text-gray-600 mb-4">per month</p>
                      <ul className="space-y-1 text-sm">
                        <li>✓ All premium features</li>
                        <li>✓ Cancel anytime</li>
                        <li>✓ 24/7 support</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">Yearly Plan</h4>
                        <Badge variant="secondary">Save 20%</Badge>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">$287.99</div>
                      <p className="text-sm text-gray-600 mb-4">per year ($23.99/month)</p>
                      <ul className="space-y-1 text-sm">
                        <li>✓ All premium features</li>
                        <li>✓ 2 months free</li>
                        <li>✓ Priority support</li>
                        <li>✓ Early access to new features</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/subscription/plans">
                      <Button className="w-full">View All Plans</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="update-interval">GPS Update Interval (seconds)</Label>
                    <Input id="update-interval" type="number" defaultValue="30" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="max-passengers">Maximum Passengers per Bus</Label>
                    <Input id="max-passengers" type="number" defaultValue="50" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="premium-price">Premium Plan Price ($)</Label>
                    <Input id="premium-price" type="number" defaultValue="29.99" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="family-price">Family Plan Price ($)</Label>
                    <Input id="family-price" type="number" defaultValue="49.99" className="mt-1" />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
                   