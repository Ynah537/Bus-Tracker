// GPS Device Simulator - simulates buses sending location data
// This would run on the GPS devices in real buses

const API_BASE_URL = "http://localhost:3000/api"

class GPSSimulator {
  constructor(busId, route) {
    this.busId = busId
    this.route = route
    this.currentPosition = 0
    this.isRunning = false
    this.intervalId = null
  }

  // Simulate GPS coordinates along a route
  generateRouteCoordinates(startLat, startLng, endLat, endLng, steps = 20) {
    const coordinates = []
    for (let i = 0; i <= steps; i++) {
      const ratio = i / steps
      const lat = startLat + (endLat - startLat) * ratio
      const lng = startLng + (endLng - startLng) * ratio
      coordinates.push({ lat, lng })
    }
    return coordinates
  }

  async sendLocationUpdate(lat, lng, speed, passengers) {
    try {
      const response = await fetch(`${API_BASE_URL}/bus-location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          busId: this.busId,
          lat: lat,
          lng: lng,
          speed: speed,
          passengers: passengers,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log(`✅ Location sent for bus ${this.busId}: ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
        return result
      } else {
        console.error(`❌ Failed to send location for bus ${this.busId}:`, response.statusText)
      }
    } catch (error) {
      console.error(`❌ Error sending location for bus ${this.busId}:`, error.message)
    }
  }

  start() {
    if (this.isRunning) {
      console.log(`Bus ${this.busId} simulator is already running`)
      return
    }

    console.log(`🚌 Starting GPS simulator for bus ${this.busId}`)
    this.isRunning = true

    // Generate route coordinates
    const routeCoords = this.generateRouteCoordinates(
      this.route.startLat,
      this.route.startLng,
      this.route.endLat,
      this.route.endLng,
      30,
    )

    this.intervalId = setInterval(() => {
      if (this.currentPosition >= routeCoords.length) {
        this.currentPosition = 0 // Loop back to start
      }

      const coord = routeCoords[this.currentPosition]
      const speed = Math.random() * 40 + 20 // Speed between 20-60 km/h
      const passengers = Math.floor(Math.random() * 30) + 10 // 10-40 passengers

      // Add some random variation to coordinates for realism
      const lat = coord.lat + (Math.random() - 0.5) * 0.001
      const lng = coord.lng + (Math.random() - 0.5) * 0.001

      this.sendLocationUpdate(lat, lng, speed, passengers)
      this.currentPosition++
    }, 30000) // Send update every 30 seconds
  }

  stop() {
    if (!this.isRunning) {
      console.log(`Bus ${this.busId} simulator is not running`)
      return
    }

    console.log(`🛑 Stopping GPS simulator for bus ${this.busId}`)
    this.isRunning = false

    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

// Sample routes for simulation
const routes = {
  downtown_airport: {
    startLat: 40.7128,
    startLng: -74.006,
    endLat: 40.6892,
    endLng: -74.1745,
  },
  university_mall: {
    startLat: 40.7831,
    startLng: -73.9712,
    endLat: 40.7505,
    endLng: -73.9934,
  },
  residential_business: {
    startLat: 40.7614,
    startLng: -73.9776,
    endLat: 40.7282,
    endLng: -73.9942,
  },
}

// Create and start simulators for different buses
const simulators = [
  new GPSSimulator("B001", routes.downtown_airport),
  new GPSSimulator("B002", routes.university_mall),
  new GPSSimulator("B004", routes.downtown_airport),
  new GPSSimulator("B005", routes.university_mall),
]

// Start all simulators
console.log("🚀 Starting GPS simulators...")
simulators.forEach((sim) => sim.start())

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🔄 Shutting down GPS simulators...")
  simulators.forEach((sim) => sim.stop())
  process.exit(0)
})

console.log("GPS simulators are running. Press Ctrl+C to stop.")
