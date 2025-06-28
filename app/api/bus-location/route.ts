import { type NextRequest, NextResponse } from "next/server"

// This would be your database connection in a real app
const busLocations = new Map()

export async function POST(request: NextRequest) {
  try {
    const { busId, lat, lng, speed, passengers, timestamp } = await request.json()

    // Validate required fields
    if (!busId || lat === undefined || lng === undefined) {
      return NextResponse.json({ error: "Missing required fields: busId, lat, lng" }, { status: 400 })
    }

    // Store location data (in a real app, this would go to your database)
    busLocations.set(busId, {
      busId,
      lat: Number.parseFloat(lat),
      lng: Number.parseFloat(lng),
      speed: speed || 0,
      passengers: passengers || 0,
      timestamp: timestamp || new Date().toISOString(),
      lastUpdate: new Date().toISOString(),
    })

    console.log(`Location updated for bus ${busId}: ${lat}, ${lng}`)

    return NextResponse.json({
      success: true,
      message: "Location updated successfully",
      busId,
    })
  } catch (error) {
    console.error("Error updating bus location:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const busId = searchParams.get("busId")

    if (busId) {
      // Get specific bus location
      const location = busLocations.get(busId)
      if (!location) {
        return NextResponse.json({ error: "Bus not found" }, { status: 404 })
      }
      return NextResponse.json(location)
    } else {
      // Get all bus locations
      const allLocations = Array.from(busLocations.values())
      return NextResponse.json(allLocations)
    }
  } catch (error) {
    console.error("Error fetching bus locations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
