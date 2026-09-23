import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, NgZone, inject, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { RouteService } from '../../services/route.service';
import { DeliveryStop } from '../../models/delivery-stop';

const DEPOT_LAT = 28.5355;
const DEPOT_LNG = 77.2710;

@Component({
  selector: 'app-route-map',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="map-wrapper" [class.picking]="routeService.pickingLocation()">
      <div #mapContainer class="map-container"></div>
      
      <div class="picking-banner" *ngIf="routeService.pickingLocation()">
        Click on the map to set the stop's location
      </div>

      <div class="legend">
        <div class="legend-item"><span class="box depot"></span> Warehouse</div>
        <div class="legend-item"><span class="box high"></span> High</div>
        <div class="legend-item"><span class="box medium"></span> Medium</div>
        <div class="legend-item"><span class="box low"></span> Low</div>
      </div>
    </div>
  `,
  styles: [`
    .map-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
    }
    .map-container {
      flex: 1;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .map-wrapper.picking .map-container {
      cursor: crosshair !important;
    }
    .picking-banner {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--text);
      color: white;
      padding: 12px 24px;
      border-radius: 24px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      pointer-events: none;
    }
    .legend {
      position: absolute;
      bottom: 24px;
      left: 24px;
      background: rgba(255, 255, 255, 0.95);
      padding: 12px;
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-md);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 12px;
      font-weight: 500;
      border: 1px solid var(--border);
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .box {
      width: 12px; height: 12px;
      border-radius: 4px;
    }
    .box.depot { background: var(--text); }
    .box.high { background: var(--high); border-radius: 50%; }
    .box.medium { background: var(--medium); border-radius: 50%; }
    .box.low { background: var(--low); border-radius: 50%; }

    @media (max-width: 899px) {
      .picking-banner {
        top: 16px;
        width: 90%;
        text-align: center;
        padding: 8px 16px;
      }
      .legend {
        bottom: 16px;
        left: 16px;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 8px;
      }
    }
  `]
})
export class RouteMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLElement>;
  
  routeService = inject(RouteService);
  zone = inject(NgZone);

  private map!: L.Map;
  private markersLayer = L.layerGroup();
  private routeLayer = L.layerGroup();
  private resizeObserver!: ResizeObserver;
  private resizeTimeout: any;

  constructor() {
    effect(() => {
      const stops = this.routeService.stops();
      const picked = this.routeService.pickedCoords();
      this.zone.runOutsideAngular(() => {
        if (this.map) {
          this.drawStopsAndRoute(stops, picked);
        }
      });
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.map = L.map(this.mapContainer.nativeElement, {
        zoomControl: false,
        attributionControl: false
      }).setView([DEPOT_LAT, DEPOT_LNG], 12);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(this.map);

      L.control.zoom({ position: 'topright' }).addTo(this.map);
      
      const attribution = L.control.attribution({ position: 'bottomright' });
      attribution.addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>');
      attribution.addTo(this.map);

      this.markersLayer.addTo(this.map);
      this.routeLayer.addTo(this.map);

      this.map.on('click', (e: L.LeafletMouseEvent) => {
        if (this.routeService.pickingLocation()) {
          this.zone.run(() => {
            this.routeService.pickedCoords.set({ lat: e.latlng.lat, lng: e.latlng.lng });
          });
        }
      });

      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          this.map.invalidateSize();
          this.fitMapBounds();
        }, 200);
      });
      this.resizeObserver.observe(this.mapContainer.nativeElement);

      this.drawStopsAndRoute(this.routeService.stops(), this.routeService.pickedCoords());
    });
  }

  private escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

  private drawStopsAndRoute(stops: DeliveryStop[], picked: {lat: number, lng: number} | null) {
    this.markersLayer.clearLayers();
    this.routeLayer.clearLayers();

    const bounds = L.latLngBounds([DEPOT_LAT, DEPOT_LNG], [DEPOT_LAT, DEPOT_LNG]);
    const routePoints: L.LatLngExpression[] = [[DEPOT_LAT, DEPOT_LNG]];

    // Depot marker
    const depotIcon = L.divIcon({
      className: 'depot-marker',
      html: 'W',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker([DEPOT_LAT, DEPOT_LNG], { icon: depotIcon, zIndexOffset: 1000 }).addTo(this.markersLayer);

    // Stops
    stops.forEach((stop, index) => {
      routePoints.push([stop.lat, stop.lng]);
      bounds.extend([stop.lat, stop.lng]);

      const stopIcon = L.divIcon({
        className: `stop-marker ${stop.priority}`,
        html: `${index + 1}`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const popupHtml = `
        <h3>${this.escapeHtml(stop.customerName)}</h3>
        <p>${this.escapeHtml(stop.address)}</p>
        <div class="badges">
          <span class="badge ${stop.priority}">${stop.priority.toUpperCase()}</span>
          <span class="badge time">${this.escapeHtml(stop.timeWindow)}</span>
        </div>
      `;

      L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .bindPopup(popupHtml)
        .addTo(this.markersLayer);
    });

    // Picked temp marker
    if (picked) {
      bounds.extend([picked.lat, picked.lng]);
      const tempIcon = L.divIcon({
        className: 'stop-marker temp',
        html: '+',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      L.marker([picked.lat, picked.lng], { icon: tempIcon, zIndexOffset: 2000 }).addTo(this.markersLayer);
    }

    // Draw route
    if (routePoints.length > 1) {
      // Halo
      L.polyline(routePoints, {
        color: '#EFF4FF',
        weight: 12,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(this.routeLayer);
      
      // Dashed line
      L.polyline(routePoints, {
        color: '#1D4ED8',
        weight: 3,
        dashArray: '8, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(this.routeLayer);
    }

    // Fit bounds
    this.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }

  private fitMapBounds() {
    const stops = this.routeService.stops();
    const picked = this.routeService.pickedCoords();
    const bounds = L.latLngBounds([DEPOT_LAT, DEPOT_LNG], [DEPOT_LAT, DEPOT_LNG]);
    
    stops.forEach(s => bounds.extend([s.lat, s.lng]));
    if (picked) bounds.extend([picked.lat, picked.lng]);
    
    this.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 14 });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    if (this.map) {
      this.map.remove();
    }
  }
}
