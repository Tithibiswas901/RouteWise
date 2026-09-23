import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryStop } from '../../models/delivery-stop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stop-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stop-card">
      <div class="seq-circle" [ngClass]="stop.priority">{{ index + 1 }}</div>
      
      <div class="details">
        <div class="name" [title]="stop.customerName">{{ stop.customerName }}</div>
        <div class="address" [title]="stop.address">{{ stop.address }}</div>
      </div>
      
      <div class="controls">
        <select class="priority-badge" [ngClass]="stop.priority" 
                [ngModel]="stop.priority" (ngModelChange)="onPriorityChange($event)">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <span class="time-window">{{ stop.timeWindow }}</span>
      </div>

      <button class="delete-btn" (click)="delete.emit()" aria-label="Delete Stop">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
      </button>
    </div>
  `,
  styles: [`
    .stop-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-sm);
    }
    .seq-circle {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      color: white;
      flex-shrink: 0;
    }
    .seq-circle.high { background-color: var(--high); }
    .seq-circle.medium { background-color: var(--medium); }
    .seq-circle.low { background-color: var(--low); }

    .details {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
    }
    .name {
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .address {
      font-size: 12px;
      color: var(--muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
      flex-shrink: 0;
    }
    
    .priority-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 12px;
      border: none;
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      text-align: center;
      outline: none;
    }
    .priority-badge:focus-visible {
      outline: 2px solid var(--accent);
    }
    .priority-badge.high { background: var(--high-tint); color: var(--high); }
    .priority-badge.medium { background: var(--medium-tint); color: var(--medium); }
    .priority-badge.low { background: var(--low-tint); color: var(--low); }

    .time-window {
      font-size: 11px;
      color: var(--muted);
      background: var(--bg);
      padding: 2px 8px;
      border-radius: 12px;
    }

    .delete-btn {
      background: transparent;
      border: none;
      color: var(--muted);
      padding: 6px;
      border-radius: 4px;
      flex-shrink: 0;
      display: flex;
    }
    .delete-btn:hover {
      background: var(--bg);
      color: var(--high);
    }
    .delete-btn svg {
      width: 16px;
      height: 16px;
    }
  `]
})
export class StopCardComponent {
  @Input({ required: true }) stop!: DeliveryStop;
  @Input({ required: true }) index!: number;
  
  @Output() priorityChange = new EventEmitter<'high' | 'medium' | 'low'>();
  @Output() delete = new EventEmitter<void>();

  onPriorityChange(newPriority: 'high' | 'medium' | 'low') {
    this.priorityChange.emit(newPriority);
  }
}
