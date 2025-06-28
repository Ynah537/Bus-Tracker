"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bus, MapPin, Clock, Search, Star, Navigation, CreditCard, User, LogOut, Crown } from "lucide-react"
import Link from "next/link"

interface BusInfo {
  id: string
  number: string
  route: string
  nextStop: string
  eta: string
  distance: string
  fare: number
}

interface Subscription {
  plan: "monthly" | "yearly"
  status: "active" | "expired" | "cancelled"
  startDate: string
  endDate: string
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
      fare: 15,
    },
    {
      id: "2",
      number: "B002",
      route: "University - Mall",
      nextStop: "University Gate",
      eta: "7 min",
      distance: "0.5 km",
      fare: 12,
    },
    {
      id: "3",
      number: "B005",
      route: "Residential - Business District",
      nextStop: "Main Street",
      eta: "12 min",
      distance: "0.8 km",
      fare: 18,
    },
  ])

  const [subscription, setSubscription] = useState<Subscription>({
    plan: "monthly",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    price: 29.99,
  })

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
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>Welcome, John Doe</span>
                {subscription.status === "active" && (
                  <Badge variant="secondary" className="gap-1">
                    <Crown className="h-3 w-3" />
                    Premium
                  </Badge>
                )}
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
          <p className="text-gray-600">Track your buses and manage your subscription</p>
        </div>

        <Tabs defaultValue="nearby" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96">
            <TabsTrigger value="nearby" className="gap-2">
              <Navigation className="h-4 w-4" />
              Nearby Buses
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription
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
                          <div className="text-lg font-bold text-blue-600">₱{bus.fare}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
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
                          <span className="text-sm text-gray-600">Distance:</span>
                          <span className="text-sm font-medium text-blue-600">{bus.distance}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Link href="/map" className="flex-1">
                          <Button className="w-full">Track Live</Button>
                        </Link>
                        <Button variant="outline" size="default">
                          Set Alert
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
                  <CardDescription>Manage your BusTrek subscription</CardDescription>
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
                          <span className="font-medium">₱{subscription.price}/month</span>
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
                      <div className="text-3xl font-bold text-blue-600 mb-2">₱29.99</div>
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
                      <div className="text-3xl font-bold text-blue-600 mb-2">₱287.99</div>
                      <p className="text-sm text-gray-600 mb-4">per year (₱23.99/month)</p>
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
                      <div className="flex gap-2">
                        <Link href="/map">
                          <Button variant="outline" size="sm">
                            Track Now
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Set Alert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}