import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stats-card">
      <div class="icon-container">
        <ng-content select="[icon]"></ng-content>
      </div>
      <div class="info">
        <span class="label">{{ label }}</span>
        <span class="value">{{ value }}</span>
      </div>
    </div>
  `,
  styles: [`
    .stats-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: var(--surface);
      padding: 16px;
      border-radius: var(--radius-card);
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
    }
    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background: var(--accent-tint);
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon-container ::ng-deep svg {
      width: 24px;
      height: 24px;
    }
    .info {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 13px;
      color: var(--muted);
      font-weight: 500;
    }
    .value {
      font-size: 20px;
      font-weight: 700;
      color: var(--text);
    }
    @media (max-width: 899px) {
      .stats-card {
        padding: 12px;
        gap: 12px;
      }
      .icon-container {
        width: 40px;
        height: 40px;
      }
      .icon-container ::ng-deep svg {
        width: 20px;
        height: 20px;
      }
      .value {
        font-size: 16px;
      }
    }
  `]
})
export class StatsCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
}
