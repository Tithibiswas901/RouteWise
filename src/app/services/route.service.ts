import { Injectable, signal, computed } from '@angular/core';
import { DeliveryStop } from '../models/delivery-stop';
import { moveItemInArray } from '@angular/cdk/drag-drop';

const DEPOT_LAT = 28.5355;
const DEPOT_LNG = 77.2710;

const DEMO_STOPS: DeliveryStop[] = [
  { id: '1', customerName: 'Sharma Electronics', address: 'Sector 18 Noida', priority: 'low', timeWindow: 'Flexible', lat: 28.5708, lng: 77.3261 },
  { id: '2', customerName: 'Café Mocha Co.', address: 'Connaught Place', priority: 'high', timeWindow: 'Flexible', lat: 28.6315, lng: 77.2167 },
  { id: '3', customerName: 'Verma Pharmacy', address: 'Dwarka Sector 10', priority: 'medium', timeWindow: 'Flexible', lat: 28.5815, lng: 77.0590 },
  { id: '4', customerName: 'Kapoor Textiles', address: 'Lajpat Nagar II', priority: 'high', timeWindow: 'Flexible', lat: 28.5677, lng: 77.2433 },
  { id: '5', customerName: 'TechNova Office', address: 'Cyber City Gurugram', priority: 'medium', timeWindow: 'Flexible', lat: 28.4950, lng: 77.0890 },
  { id: '6', customerName: 'Gupta Sweets', address: 'Karol Bagh', priority: 'low', timeWindow: 'Flexible', lat: 28.6519, lng: 77.1909 },
  { id: '7', customerName: 'Select Books', address: 'Saket', priority: 'high', timeWindow: 'Flexible', lat: 28.5245, lng: 77.2066 },
  { id: '8', customerName: 'Malhotra Hardware', address: 'Rajouri Garden', priority: 'medium', timeWindow: 'Flexible', lat: 28.6492, lng: 77.1226 }
];

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateRouteDistance(stops: DeliveryStop[]): number {
  if (stops.length === 0) return 0;
  let dist = haversine(DEPOT_LAT, DEPOT_LNG, stops[0].lat, stops[0].lng);
  for (let i = 0; i < stops.length - 1; i++) {
    dist += haversine(stops[i].lat, stops[i].lng, stops[i+1].lat, stops[i+1].lng);
  }
  return dist * 1.3;
}

@Injectable({ providedIn: 'root' })
export class RouteService {
  stops = signal<DeliveryStop[]>([...DEMO_STOPS]);
  pickingLocation = signal<boolean>(false);
  pickedCoords = signal<{lat: number, lng: number} | null>(null);

  totalDistanceKm = computed(() => {
    return parseFloat(calculateRouteDistance(this.stops()).toFixed(1));
  });

  estimatedMinutes = computed(() => {
    const dist = this.totalDistanceKm();
    // 25 km/h -> 25km per 60 mins -> dist / 25 * 60
    const driveTime = (dist / 25) * 60;
    const stopTime = this.stops().length * 5;
    return Math.round(driveTime + stopTime);
  });

  highPriorityCount = computed(() => {
    return this.stops().filter(s => s.priority === 'high').length;
  });

  addStop(stop: DeliveryStop) {
    this.stops.update(s => [...s, stop]);
  }

  deleteStop(id: string) {
    this.stops.update(s => s.filter(stop => stop.id !== id));
  }

  updatePriority(id: string, priority: 'high' | 'medium' | 'low') {
    this.stops.update(s => s.map(stop => stop.id === id ? { ...stop, priority } : stop));
  }

  reorder(prevIndex: number, currentIndex: number) {
    this.stops.update(s => {
      const arr = [...s];
      moveItemInArray(arr, prevIndex, currentIndex);
      return arr;
    });
  }

  clearAll() {
    this.stops.set([]);
  }

  resetDemo() {
    this.stops.set([...DEMO_STOPS]);
  }

  optimize(): { before: number, after: number } {
    const currentStops = this.stops();
    if (currentStops.length < 2) return { before: 0, after: 0 };

    const before = this.totalDistanceKm();
    const high = currentStops.filter(s => s.priority === 'high');
    const medium = currentStops.filter(s => s.priority === 'medium');
    const low = currentStops.filter(s => s.priority === 'low');

    const optimizeGroup = (group: DeliveryStop[], startLat: number, startLng: number) => {
      let unvisited = [...group];
      let ordered = [];
      let currentLat = startLat;
      let currentLng = startLng;

      while (unvisited.length > 0) {
        let nearestIdx = 0;
        let minD = Infinity;
        for (let i = 0; i < unvisited.length; i++) {
          const d = haversine(currentLat, currentLng, unvisited[i].lat, unvisited[i].lng);
          if (d < minD) {
            minD = d;
            nearestIdx = i;
          }
        }
        const next = unvisited.splice(nearestIdx, 1)[0];
        ordered.push(next);
        currentLat = next.lat;
        currentLng = next.lng;
      }
      return { ordered, lastLat: currentLat, lastLng: currentLng };
    };

    let resultStops: DeliveryStop[] = [];
    let curLat = DEPOT_LAT;
    let curLng = DEPOT_LNG;

    const highRes = optimizeGroup(high, curLat, curLng);
    resultStops.push(...highRes.ordered);
    curLat = highRes.lastLat;
    curLng = highRes.lastLng;

    const medRes = optimizeGroup(medium, curLat, curLng);
    resultStops.push(...medRes.ordered);
    curLat = medRes.lastLat;
    curLng = medRes.lastLng;

    const lowRes = optimizeGroup(low, curLat, curLng);
    resultStops.push(...lowRes.ordered);

    this.stops.set(resultStops);
    const after = this.totalDistanceKm();

    return { before, after };
  }
}
