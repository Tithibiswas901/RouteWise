# RouteWise

RouteWise is a smart delivery route planner client-side dashboard designed for dispatchers to manage delivery stops, view them on a map, and optimize the delivery route.

## Features
- **Add & Manage Stops**: Add stops with details like customer name, address, priority, and time window. Click on the map to easily select coordinates.
- **Interactive Map**: View all stops and the warehouse on an interactive map. A route is drawn connecting them.
- **Route Optimization**: Optimize the sequence of deliveries using a heuristic approach.
- **Drag & Drop Reordering**: Manually adjust the sequence by dragging stops in the list.
- **Statistics**: See real-time metrics on total distance and estimated delivery time.
- **Responsive Design**: Designed to work flawlessly on both desktop and mobile devices.

## Tech Stack
- Angular 18+ (Standalone Components, Signals, OnPush change detection)
- Leaflet for interactive mapping
- Angular CDK (Drag & Drop)
- Vanilla CSS with CSS Variables

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:4200` in your browser.

## Optimization Heuristic Note
Route optimization uses a Nearest-Neighbor algorithm, grouped by priority. High priority stops are visited first, followed by medium, and finally low priority stops. Within each priority group, the algorithm always proceeds to the nearest unvisited stop based on Haversine distance, starting from the current location.
