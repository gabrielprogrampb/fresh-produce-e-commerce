
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: 'kg' | 'unit';
  stock: number;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum BookingType {
  DELIVERY = 'Envío a domicilio',
  PICKUP = 'Recogida en tienda',
}

export enum OrderStatus {
  RECEIVED = 'Recibido',
  PREPARING = 'En preparación',
  SHIPPED = 'Enviado',
  COMPLETED = 'Completado',
  CANCELLED = 'Cancelado',
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface BookingDetails {
  type: BookingType;
  date: string;
  timeSlot: string;
}

export interface Order {
  id: string;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  booking: BookingDetails;
  status: OrderStatus;
  createdAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Should not be sent to frontend
    role: 'admin' | 'customer';
}
