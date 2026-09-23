import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="toast-container" [class.show]="toastService.message()">
      {{ toastService.message() }}
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #111827;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      transform: translateY(100px);
      opacity: 0;
      transition: all 300ms ease;
      pointer-events: none;
    }
    .toast-container.show {
      transform: translateY(0);
      opacity: 1;
    }
    @media (max-width: 899px) {
      .toast-container {
        right: 50%;
        transform: translate(50%, 100px);
      }
      .toast-container.show {
        transform: translate(50%, 0);
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
