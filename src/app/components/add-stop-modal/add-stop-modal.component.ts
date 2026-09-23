import { Component, ChangeDetectionStrategy, Output, EventEmitter, inject, HostListener, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouteService } from '../../services/route.service';
import { DeliveryStop } from '../../models/delivery-stop';

@Component({
  selector: 'app-add-stop-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="backdrop" (click)="onBackdropClick($event)">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Add Delivery Stop</h2>
          <button class="close-btn" (click)="close.emit()" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Customer Name</label>
            <input type="text" formControlName="customerName" placeholder="e.g. Acme Corp">
            <div class="error" *ngIf="form.get('customerName')?.invalid && (form.get('customerName')?.touched || submitted)">
              Required
            </div>
          </div>

          <div class="form-group">
            <label>Address</label>
            <input type="text" formControlName="address" placeholder="e.g. 123 Main St">
            <div class="error" *ngIf="form.get('address')?.invalid && (form.get('address')?.touched || submitted)">
              Required
            </div>
          </div>

          <div class="row">
            <div class="form-group half">
              <label>Priority</label>
              <select formControlName="priority">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div class="form-group half">
              <label>Time Window</label>
              <select formControlName="timeWindow">
                <option value="9–10 AM">9–10 AM</option>
                <option value="10–12 PM">10–12 PM</option>
                <option value="12–2 PM">12–2 PM</option>
                <option value="2–5 PM">2–5 PM</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div class="map-tip">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Click anywhere on the map to fill the coordinates.
          </div>

          <div class="row">
            <div class="form-group half">
              <label>Latitude</label>
              <input type="number" step="any" formControlName="lat" placeholder="e.g. 28.5355">
              <div class="error" *ngIf="form.get('lat')?.invalid && (form.get('lat')?.touched || submitted)">
                Valid latitude required
              </div>
            </div>
            <div class="form-group half">
              <label>Longitude</label>
              <input type="number" step="any" formControlName="lng" placeholder="e.g. 77.2710">
              <div class="error" *ngIf="form.get('lng')?.invalid && (form.get('lng')?.touched || submitted)">
                Valid longitude required
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-cancel" (click)="close.emit()">Cancel</button>
            <button type="submit" class="btn-submit">Add Stop</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .backdrop {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 1000;
      display: flex;
    }
    
    .modal-dialog {
      background: var(--surface);
      width: 100%;
      border-radius: var(--radius-card);
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      pointer-events: auto; /* Re-enable pointer events for the modal itself */
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border);
    }
    .modal-header h2 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    .close-btn {
      background: transparent;
      border: none;
      color: var(--muted);
      padding: 4px;
      border-radius: 4px;
    }
    .close-btn:hover {
      background: var(--bg);
      color: var(--text);
    }
    .close-btn svg {
      width: 20px;
      height: 20px;
    }

    form {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .row {
      display: flex;
      gap: 12px;
    }
    .half {
      flex: 1;
    }

    label {
      font-size: 12px;
      font-weight: 500;
      color: var(--text);
    }
    input, select {
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: var(--radius-button);
      font-family: inherit;
      font-size: 14px;
      background: var(--surface);
    }
    .error {
      color: var(--high);
      font-size: 11px;
    }

    .map-tip {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--accent-tint);
      color: var(--accent);
      padding: 12px;
      border-radius: var(--radius-button);
      font-size: 12px;
      font-weight: 500;
    }
    .map-tip svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
    }
    button.btn-cancel {
      padding: 8px 16px;
      background: white;
      border: 1px solid var(--border);
      border-radius: var(--radius-button);
      color: var(--text);
      font-weight: 500;
    }
    button.btn-cancel:hover { background: var(--bg); }
    button.btn-submit {
      padding: 8px 16px;
      background: var(--accent);
      border: none;
      border-radius: var(--radius-button);
      color: white;
      font-weight: 500;
    }
    button.btn-submit:hover { background: #1e3a8a; }

    @media (min-width: 900px) {
      .backdrop {
        /* Desktop: transparent backdrop, no pointer events so map is clickable */
        background: transparent;
        pointer-events: none;
        align-items: center;
        /* Position over the stop list: 400px wide list */
        padding-left: 20px;
        justify-content: flex-start;
      }
      .modal-dialog {
        width: 360px;
        border: 1px solid var(--border);
      }
    }
    
    @media (max-width: 899px) {
      .backdrop {
        background: rgba(0,0,0,0.5);
        pointer-events: auto;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .modal-dialog {
        max-height: 90vh;
      }
    }
  `]
})
export class AddStopModalComponent {
  @Output() close = new EventEmitter<void>();
  
  routeService = inject(RouteService);
  fb = inject(FormBuilder);

  form = this.fb.group({
    customerName: ['', Validators.required],
    address: ['', Validators.required],
    priority: ['medium', Validators.required],
    timeWindow: ['Flexible', Validators.required],
    lat: [null as number | null, [Validators.required, Validators.min(-90), Validators.max(90)]],
    lng: [null as number | null, [Validators.required, Validators.min(-180), Validators.max(180)]]
  });

  submitted = false;

  constructor() {
    this.routeService.pickingLocation.set(true);

    // Effect to update form when map is clicked
    effect(() => {
      const coords = this.routeService.pickedCoords();
      if (coords) {
        this.form.patchValue({
          lat: parseFloat(coords.lat.toFixed(5)),
          lng: parseFloat(coords.lng.toFixed(5))
        });
        this.form.get('lat')?.markAsTouched();
        this.form.get('lng')?.markAsTouched();
      }
    });
  }

  @HostListener('window:keydown.escape')
  onEsc() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (window.innerWidth < 900) {
      this.close.emit();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const val = this.form.value;
      const newStop: DeliveryStop = {
        id: Date.now().toString(),
        customerName: val.customerName!,
        address: val.address!,
        priority: val.priority as any,
        timeWindow: val.timeWindow as any,
        lat: val.lat!,
        lng: val.lng!
      };
      this.routeService.addStop(newStop);
      this.close.emit();
    }
  }

  ngOnDestroy() {
    this.routeService.pickingLocation.set(false);
    this.routeService.pickedCoords.set(null);
  }
}
