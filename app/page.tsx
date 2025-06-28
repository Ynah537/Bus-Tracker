"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Clock, Shield, Bus, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Bus className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">BusTrek</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Smart Bus Tracking System</h2>
          <p className="text-xl text-gray-600 mb-8">
            Track buses in real-time and never miss your bus again. Complete fleet
            management for administrators.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Track Your Ride
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <MapPin className="h-5 w-5" />
                View Live Map
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose BusTrek?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Real-Time Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track buses live on the map with accurate GPS positioning and arrival times
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Secure & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Safe with real-time updates and notifications
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Smart Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Complete fleet management system for administrators with analytics</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of passengers who trust BusTrek for their daily commute
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="gap-2">
              <Users className="h-5 w-5" />
              Start Tracking Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-6 w-6 text-blue-400" />
                <h4 className="text-lg font-bold">BusTrek</h4>
              </div>
              <p className="text-gray-400">
                The most advanced bus tracking system for modern transportation.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Passengers</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time tracking</li>
                <li>Route planning</li>
                <li>Mobile notifications</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Operators</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Fleet management</li>
                <li>Route optimization</li>
                <li>Analytics dashboard</li>
                <li>Passenger insights</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BusTrek. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
