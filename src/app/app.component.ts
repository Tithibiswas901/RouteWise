import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { StopListComponent } from './components/stop-list/stop-list.component';
import { RouteMapComponent } from './components/route-map/route-map.component';
import { AddStopModalComponent } from './components/add-stop-modal/add-stop-modal.component';
import { ToastComponent } from './components/toast/toast.component';
import { RouteService } from './services/route.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent, 
    StatsCardComponent, 
    StopListComponent, 
    RouteMapComponent, 
    AddStopModalComponent, 
    ToastComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-layout">
      <app-header></app-header>
      
      <div class="stats-row">
        <app-stats-card label="Total Stops" [value]="routeService.stops().length">
          <svg icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </app-stats-card>
        
        <app-stats-card label="Total Distance" [value]="routeService.totalDistanceKm() + ' km'">
          <svg icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
        </app-stats-card>
        
        <app-stats-card label="Estimated Time" [value]="formatTime(routeService.estimatedMinutes())">
          <svg icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </app-stats-card>
        
        <app-stats-card label="High Priority" [value]="routeService.highPriorityCount()">
          <svg icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </app-stats-card>
      </div>

      <div class="workspace">
        <div class="list-panel">
          <app-stop-list (addStop)="showAddModal = true"></app-stop-list>
        </div>
        <div class="map-panel">
          <app-route-map></app-route-map>
        </div>
      </div>
      
      <app-add-stop-modal *ngIf="showAddModal" (close)="showAddModal = false"></app-add-stop-modal>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      height: 100dvh;
      overflow: hidden;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      padding: 16px 24px;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      z-index: 10;
    }
    .workspace {
      display: flex;
      flex: 1;
      min-height: 0;
    }
    .list-panel {
      width: 400px;
      flex-shrink: 0;
      height: 100%;
    }
    .map-panel {
      flex: 1;
      height: 100%;
      position: relative;
    }
    
    @media (max-width: 899px) {
      .app-layout {
        height: auto;
        min-height: 100dvh;
        overflow: visible;
      }
      .stats-row {
        grid-template-columns: repeat(2, 1fr);
        padding: 12px 16px;
        gap: 12px;
      }
      .workspace {
        flex-direction: column;
        display: block;
      }
      .map-panel {
        height: 55vh;
        min-height: 320px;
      }
      .list-panel {
        width: 100%;
        height: auto;
        border-right: none;
      }
    }
  `]
})
export class AppComponent {
  routeService = inject(RouteService);
  showAddModal = false;

  formatTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }
}
