-- Add fare column to routes table
ALTER TABLE routes ADD COLUMN IF NOT EXISTS fare DECIMAL(8,2) NOT NULL DEFAULT 0.00;

-- Update existing routes with fare information
UPDATE routes SET fare = 15.00 WHERE name = 'Downtown - Airport';
UPDATE routes SET fare = 12.00 WHERE name = 'University - Mall';
UPDATE routes SET fare = 18.00 WHERE name = 'Residential - Business District';
UPDATE routes SET fare = 10.00 WHERE name = 'City Center - Hospital';
UPDATE routes SET fare = 20.00 WHERE name = 'Train Station - Beach';
UPDATE routes SET fare = 16.00 WHERE name = 'Industrial - Suburbs';

-- Create index for fare column for better performance
CREATE INDEX IF NOT EXISTS idx_routes_fare ON routes(fare);

-- Update the latest_bus_positions view to include fare information
CREATE OR REPLACE VIEW latest_bus_positions AS
SELECT DISTINCT ON (bl.bus_id)
    bl.bus_id,
    b.bus_number,
    b.driver_name,
    b.status,
    r.name as route_name,
    r.fare as route_fare,
    bl.latitude,
    bl.longitude,
    bl.speed_kmh,
    bl.passenger_count,
    bl.timestamp as last_update
FROM bus_locations bl
JOIN buses b ON bl.bus_id = b.id
LEFT JOIN routes r ON b.route_id = r.id
ORDER BY bl.bus_id, bl.timestamp DESC;
