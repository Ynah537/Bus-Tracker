-- Insert sample data for testing

-- Insert sample users
INSERT INTO users (email, password_hash, role, full_name, phone) VALUES
('admin@buscompany.com', '$2b$10$example_hash_admin', 'admin', 'System Administrator', '+1234567890'),
('passenger1@example.com', '$2b$10$example_hash_pass1', 'passenger', 'John Doe', '+1234567891'),
('passenger2@example.com', '$2b$10$example_hash_pass2', 'passenger', 'Jane Smith', '+1234567892');

-- Insert sample routes
INSERT INTO routes (name, start_point, end_point, distance_km, estimated_duration_minutes) VALUES
('Downtown - Airport', 'Downtown Terminal', 'Airport Terminal', 25.5, 45),
('University - Mall', 'University Campus', 'Shopping Mall', 15.2, 30),
('Residential - Business District', 'Residential Area', 'Business District', 20.8, 35),
('City Center - Hospital', 'City Center', 'General Hospital', 12.3, 25),
('Train Station - Beach', 'Central Train Station', 'Beach Resort', 18.7, 40),
('Industrial - Suburbs', 'Industrial Zone', 'Suburban Area', 22.1, 50);

-- Insert sample bus stops
INSERT INTO bus_stops (name, latitude, longitude, address) VALUES
('Downtown Terminal', 40.7128, -74.0060, '123 Main St, Downtown'),
('Central Station', 40.7589, -73.9851, '456 Central Ave'),
('University Gate', 40.7831, -73.9712, '789 University Blvd'),
('Shopping Mall', 40.7505, -73.9934, '321 Mall Drive'),
('Airport Terminal', 40.6892, -74.1745, 'Airport Access Road'),
('Business District', 40.7614, -73.9776, '654 Business Plaza'),
('General Hospital', 40.7282, -73.9942, '987 Health Street'),
('Beach Resort', 40.5795, -73.9707, '147 Ocean Avenue');

-- Link stops to routes
INSERT INTO route_stops (route_id, stop_id, stop_order, estimated_arrival_minutes) VALUES
-- Downtown - Airport route
(1, 1, 1, 0),   -- Downtown Terminal (start)
(1, 2, 2, 15),  -- Central Station
(1, 5, 3, 45),  -- Airport Terminal (end)

-- University - Mall route  
(2, 3, 1, 0),   -- University Gate (start)
(2, 2, 2, 10),  -- Central Station
(2, 4, 3, 30),  -- Shopping Mall (end)

-- Residential - Business District route
(3, 6, 1, 0),   -- Business District (start)
(3, 2, 2, 20),  -- Central Station
(3, 6, 3, 35);  -- Business District (end)

-- Insert sample buses
INSERT INTO buses (bus_number, route_id, driver_name, driver_phone, capacity, status, gps_device_id) VALUES
('B001', 1, 'John Smith', '+1234567801', 50, 'active', 'GPS001'),
('B002', 2, 'Sarah Johnson', '+1234567802', 50, 'active', 'GPS002'),
('B003', 3, 'Mike Wilson', '+1234567803', 50, 'maintenance', 'GPS003'),
('B004', 1, 'Emily Davis', '+1234567804', 50, 'active', 'GPS004'),
('B005', 2, 'Robert Brown', '+1234567805', 50, 'active', 'GPS005'),
('B006', 4, 'Lisa Garcia', '+1234567806', 45, 'active', 'GPS006'),
('B007', 5, 'David Martinez', '+1234567807', 55, 'inactive', 'GPS007'),
('B008', 6, 'Jennifer Lee', '+1234567808', 50, 'active', 'GPS008');

-- Insert sample location data (recent positions)
INSERT INTO bus_locations (bus_id, latitude, longitude, speed_kmh, passenger_count, timestamp) VALUES
-- Bus B001 (active on Downtown - Airport route)
(1, 40.7128, -74.0060, 35.5, 23, NOW() - INTERVAL '2 minutes'),
(1, 40.7150, -74.0040, 32.0, 23, NOW() - INTERVAL '1 minute'),
(1, 40.7170, -74.0020, 28.5, 25, NOW()),

-- Bus B002 (active on University - Mall route)
(2, 40.7831, -73.9712, 28.0, 15, NOW() - INTERVAL '3 minutes'),
(2, 40.7800, -73.9750, 25.5, 17, NOW() - INTERVAL '1 minute'),
(2, 40.7780, -73.9780, 30.0, 18, NOW()),

-- Bus B004 (active on Downtown - Airport route)
(4, 40.7200, -74.0100, 40.0, 31, NOW() - INTERVAL '5 minutes'),
(4, 40.7250, -74.0080, 38.5, 29, NOW() - INTERVAL '2 minutes'),
(4, 40.7280, -74.0060, 35.0, 28, NOW()),

-- Bus B005 (active on University - Mall route)
(5, 40.7600, -73.9800, 22.0, 12, NOW() - INTERVAL '4 minutes'),
(5, 40.7620, -73.9820, 25.0, 14, NOW() - INTERVAL '1 minute'),
(5, 40.7640, -73.9840, 27.5, 16, NOW());
