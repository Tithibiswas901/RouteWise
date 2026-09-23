import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteService } from '../../services/route.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="logo-area">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="logo">
          <rect width="100" height="100" rx="20" fill="#1D4ED8"/>
          <path d="M 25 75 Q 40 40 50 50 T 75 25" stroke="white" stroke-width="8" stroke-linecap="round" fill="none"/>
          <circle cx="25" cy="75" r="8" fill="white"/>
          <circle cx="50" cy="50" r="8" fill="white"/>
          <circle cx="75" cy="25" r="8" fill="white"/>
        </svg>
        <div class="title-container">
          <h1>RouteWise</h1>
          <span class="subtitle">Smart Delivery Route Planner</span>
        </div>
      </div>
      <div class="actions">
        <button class="btn-secondary" (click)="reset()">
          <svg class="icon-refresh" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          <span class="desktop-only">Reset demo</span>
        </button>
        <button class="btn-primary" [disabled]="routeService.stops().length < 2" (click)="optimize()">
          <svg class="icon-zap" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span class="desktop-only">Optimize Route</span>
          <span class="mobile-only">Optimize</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: var(--surface);
      border-bottom: 1px solid var(--border);
    }
    .logo-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo {
      width: 40px;
      height: 40px;
    }
    .title-container {
      display: flex;
      flex-direction: column;
    }
    .title-container h1 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--text);
      line-height: 1.2;
    }
    .subtitle {
      font-size: 12px;
      color: var(--muted);
    }
    .actions {
      display: flex;
      gap: 12px;
    }
    button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: var(--radius-button);
      font-size: 14px;
      font-weight: 500;
      border: none;
    }
    .btn-secondary {
      background: white;
      border: 1px solid var(--border);
      color: var(--text);
    }
    .btn-secondary:hover {
      background: var(--bg);
    }
    .btn-primary {
      background: var(--accent);
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      background: #1e3a8a;
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .icon-refresh, .icon-zap {
      width: 16px;
      height: 16px;
    }
    .mobile-only {
      display: none;
    }
    @media (max-width: 899px) {
      .header {
        padding: 12px 16px;
      }
      .desktop-only {
        display: none;
      }
      .mobile-only {
        display: inline;
      }
      .title-container h1 {
        font-size: 18px;
      }
      .subtitle {
        display: none;
      }
      button {
        padding: 8px 12px;
      }
    }
  `]
})
export class HeaderComponent {
  routeService = inject(RouteService);
  toastService = inject(ToastService);

  reset() {
    this.routeService.resetDemo();
    this.toastService.show('Demo stops restored');
  }

  optimize() {
    const { before, after } = this.routeService.optimize();
    if (before === after) {
      this.toastService.show('Route already optimal');
    } else {
      const diff = (before - after).toFixed(1);
      this.toastService.show(`Route optimized — saved ${diff} km`);
    }
  }
}
