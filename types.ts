// =============================================================================
// types.ts - Definiciones de Tipos TypeScript
// =============================================================================
// Descripción: Define todas las interfaces y tipos para la tienda de productos
// frescos. Incluye productos, carrito, pedidos y usuarios.
// =============================================================================

/**
 * Interfaz para productos frescos
 */
export interface Product {
  id: string;            // Identificador único
  name: string;          // Nombre del producto
  description: string;   // Descripción del producto
  price: number;         // Precio por unidad o kg
  unit: 'kg' | 'unit';   // Tipo de unidad (kilogramos o unidad)
  stock: number;         // Cantidad en inventario
  imageUrl: string;      // URL de la imagen
}

/**
 * Item del carrito - Extiende Product con cantidad
 */
export interface CartItem extends Product {
  quantity: number;      // Cantidad agregada al carrito
}

/**
 * Tipos de reserva/entrega disponibles
 */
export enum BookingType {
  DELIVERY = 'Envío a domicilio',    // Entrega a domicilio
  PICKUP = 'Recogida en tienda',     // Recoger en tienda
}

/**
 * Estados posibles de un pedido
 */
export enum OrderStatus {
  RECEIVED = 'Recibido',             // Pedido recibido
  PREPARING = 'En preparación',      // Preparando el pedido
  SHIPPED = 'Enviado',               // En camino (solo delivery)
  COMPLETED = 'Completado',          // Pedido entregado/recogido
  CANCELLED = 'Cancelado',           // Pedido cancelado
}

/**
 * Información del cliente
 */
export interface CustomerDetails {
  name: string;          // Nombre completo
  email: string;         // Correo electrónico
  phone: string;         // Teléfono de contacto
  address: string;       // Dirección de entrega
}

/**
 * Detalles de la reserva
 */
export interface BookingDetails {
  type: BookingType;     // Tipo: delivery o pickup
  date: string;          // Fecha preferida
  timeSlot: string;      // Franja horaria
}

/**
 * Interfaz para pedidos completos
 */
export interface Order {
  id: string;                     // Identificador único
  customer: CustomerDetails;       // Información del cliente
  items: CartItem[];              // Productos del pedido
  total: number;                  // Total a pagar
  booking: BookingDetails;        // Detalles de entrega
  status: OrderStatus;            // Estado actual
  createdAt: Date;                // Fecha de creación
}

/**
 * Interfaz para usuarios
 */
export interface User {
  id: string;                   // Identificador único
  name: string;                 // Nombre del usuario
  email: string;                // Correo electrónico
  password?: string;            // Contraseña (no enviar al frontend)
  role: 'admin' | 'customer';   // Rol del usuario
}
