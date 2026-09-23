import { Component, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { RouteService } from '../../services/route.service';
import { DeliveryStop } from '../../models/delivery-stop';
import { StopCardComponent } from '../stop-card/stop-card.component';

@Component({
  selector: 'app-stop-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, StopCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="list-container">
      <div class="list-header">
        <div class="title-row">
          <h2>Delivery Stops</h2>
          <span class="count-badge">{{ routeService.stops().length }}</span>
        </div>
        <div class="actions">
          <button class="btn-text" (click)="routeService.clearAll()" *ngIf="routeService.stops().length > 0">Clear all</button>
          <button class="btn-primary-sm" (click)="onAddStop()">+ Add Stop</button>
        </div>
      </div>

      <div class="depot-row">
        <div class="depot-icon">W</div>
        <div class="depot-details">
          <span class="depot-name">Delhi Warehouse</span>
          <span class="depot-address">Okhla Industrial Area, New Delhi</span>
        </div>
      </div>

      <div class="scroll-area" *ngIf="routeService.stops().length > 0; else emptyState">
        <div cdkDropList class="drop-list" (cdkDropListDropped)="drop($event)">
          <div class="drag-box" *ngFor="let stop of routeService.stops(); let i = index" cdkDrag cdkDragLockAxis="y">
            
            <div class="custom-placeholder" *cdkDragPlaceholder></div>
            
            <button class="drag-handle" cdkDragHandle aria-label="Reorder stop">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
            </button>
            
            <app-stop-card class="flex-1" 
                           [stop]="stop" 
                           [index]="i"
                           (priorityChange)="routeService.updatePriority(stop.id, $event)"
                           (delete)="routeService.deleteStop(stop.id)">
            </app-stop-card>
          </div>
        </div>
      </div>
      
      <ng-template #emptyState>
        <div class="empty-state">
          <div class="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <h3>No stops added</h3>
          <p>Add stops to your route manually or load the demo dataset to get started.</p>
          <div class="empty-actions">
            <button class="btn-primary" (click)="onAddStop()">Add Stop</button>
            <button class="btn-secondary" (click)="routeService.resetDemo()">Load demo</button>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .list-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--surface);
      border-right: 1px solid var(--border);
    }
    .list-header {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .title-row h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      white-space: nowrap;
    }
    .count-badge {
      background: var(--accent-tint);
      color: var(--accent);
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    button {
      border: none;
      background: transparent;
      font-weight: 500;
      border-radius: var(--radius-button);
    }
    .btn-text {
      color: var(--muted);
      font-size: 13px;
    }
    .btn-text:hover { color: var(--text); }
    .btn-primary-sm {
      background: var(--accent-tint);
      color: var(--accent);
      padding: 6px 12px;
      font-size: 13px;
    }
    .btn-primary-sm:hover { background: #dbeafe; }

    .depot-row {
      padding: 16px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px dashed var(--border);
      background: var(--bg);
    }
    .depot-icon {
      width: 32px; height: 32px;
      background: var(--text);
      color: white;
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold;
    }
    .depot-details {
      display: flex; flex-direction: column;
    }
    .depot-name { font-weight: 600; font-size: 14px; }
    .depot-address { font-size: 12px; color: var(--muted); }

    .scroll-area {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px;
    }
    .drop-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .drag-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .drag-handle {
      padding: 8px 4px;
      color: var(--muted);
      cursor: grab;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drag-handle:active { cursor: grabbing; }
    .drag-handle svg { width: 16px; height: 16px; }
    
    .flex-1 { flex: 1; min-width: 0; }

    .custom-placeholder {
      background: var(--accent-tint);
      border: 1px dashed var(--accent);
      min-height: 60px;
      border-radius: var(--radius-card);
      flex: 1;
    }

    .empty-state {
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex: 1;
    }
    .empty-icon {
      width: 48px; height: 48px;
      background: var(--bg);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: var(--muted);
      margin-bottom: 16px;
    }
    .empty-icon svg { width: 24px; height: 24px; }
    .empty-state h3 { margin: 0 0 8px 0; font-size: 16px; font-weight: 600; }
    .empty-state p { margin: 0 0 24px 0; font-size: 14px; color: var(--muted); line-height: 1.5; }
    .empty-actions {
      display: flex; gap: 12px;
    }
    .empty-actions button {
      padding: 8px 16px; font-size: 14px;
    }
    .empty-actions .btn-primary { background: var(--accent); color: white; }
    .empty-actions .btn-secondary { background: white; border: 1px solid var(--border); color: var(--text); }
  `]
})
export class StopListComponent {
  @Output() addStop = new EventEmitter<void>();
  routeService = inject(RouteService);

  drop(event: CdkDragDrop<DeliveryStop[]>) {
    this.routeService.reorder(event.previousIndex, event.currentIndex);
  }

  onAddStop() {
    this.addStop.emit();
  }
}
