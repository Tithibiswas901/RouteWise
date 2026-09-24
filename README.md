<div align="center">
  
# 📍 RouteWise

**Plan smarter. Deliver faster.**

RouteWise is a smart delivery route planner and optimizer designed for independent couriers, field workers, and logistics dispatchers. Turn scattered locations into an efficient, easy-to-follow route to save time and reduce unnecessary travel.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Website-ef4444?style=for-the-badge)](https://route-wise-two.vercel.app/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## 🚀 Overview

RouteWise addresses the core challenge of modern delivery and field operations: **route optimization without the complexity**. 
Whether you're handling 5 stops or 50, RouteWise takes your list of destinations, factors in priority constraints, and calculates the most optimal path using a heuristic Nearest-Neighbor approach.

### ✨ Key Features
- **Intelligent Route Optimization:** Calculates the most efficient path honoring stop priorities.
- **Interactive Cartography:** Visualize your entire journey on a dynamic Leaflet map.
- **Priority Management:** Define High, Medium, and Low priorities—urgent stops are serviced first.
- **Drag & Drop Reordering:** Manually fine-tune your optimized route.
- **Real-Time Metrics:** Instantly view total distance (km) and estimated travel time.
- **Premium UX/UI:** A sleek, modern SaaS landing page with a responsive 3D-inspired interactive map hero.

---

## 🏗️ How It Works

### 1. User Workflow

```mermaid
sequenceDiagram
    participant User
    participant Planner UI
    participant RouteService
    participant Map Engine
    
    User->>Planner UI: Enters Stop (Address, Priority, Coordinates)
    Planner UI->>RouteService: addStop(details)
    RouteService-->>Planner UI: updates state (Signals)
    RouteService-->>Map Engine: render marker
    
    User->>Planner UI: Clicks "Optimize Route"
    Planner UI->>RouteService: optimizeRoute()
    
    Note over RouteService: Groups by Priority<br/>(High -> Med -> Low)
    Note over RouteService: Applies Nearest-Neighbor<br/>Heuristic per group
    
    RouteService-->>Planner UI: returns optimized sequence
    RouteService-->>Map Engine: redraws route polyline
    Planner UI-->>User: displays calculated distance & time
```

### 2. Optimization Heuristic

The optimization engine uses a specialized **Priority-Aware Nearest-Neighbor algorithm**.

```mermaid
flowchart TD
    A[Start at Warehouse/Current Location] --> B{Are there Unvisited Stops?}
    B -- Yes --> C[Group Unvisited Stops by Priority]
    C --> D{Are there HIGH Priority stops?}
    D -- Yes --> E[Find Nearest HIGH Priority Stop via Haversine Distance]
    D -- No --> F{Are there MEDIUM Priority stops?}
    F -- Yes --> G[Find Nearest MEDIUM Priority Stop via Haversine Distance]
    F -- No --> H[Find Nearest LOW Priority Stop via Haversine Distance]
    
    E --> I[Mark as Visited & Add to Route]
    G --> I
    H --> I
    
    I --> B
    B -- No --> J[Route Optimization Complete]
    J --> K[Calculate Total Distance & Time]
```

---

## 🛠️ Tech Stack

- **Framework:** Angular 18+ (Standalone Components, Signals, OnPush Change Detection)
- **Mapping:** Leaflet.js
- **Interactions:** Angular CDK (Drag & Drop)
- **Styling:** Vanilla CSS (Custom properties, 3D CSS transforms for Landing Page)
- **Deployment:** Vercel

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/RouteWise.git
   cd RouteWise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:4200`.*

---

## 🛣️ Roadmap (Future Scope)

While currently tailored for independent operators, RouteWise is laying the groundwork for a robust enterprise solution:
- **Team Workspaces:** Dedicated environments for companies to manage multiple drivers.
- **Dispatcher Dashboard:** Assign routes to specific drivers remotely.
- **Backend Integration:** PostgreSQL databases for persistent assignments, auth (JWT), and historical analytics.
- **Real-Time Tracking:** Live location updates for drivers en-route.

---
*Built with ❤️ for modern logistics and field operations.*
