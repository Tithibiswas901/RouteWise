export interface DeliveryStop {
  id: string;
  customerName: string;
  address: string;
  priority: 'high' | 'medium' | 'low';
  timeWindow: '9–10 AM' | '10–12 PM' | '12–2 PM' | '2–5 PM' | 'Flexible';
  lat: number;
  lng: number;
}
