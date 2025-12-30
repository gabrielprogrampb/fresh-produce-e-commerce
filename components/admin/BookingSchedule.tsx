
import React, { useState, useEffect, useMemo } from 'react';
import { Order } from '../../types';
import { fetchOrders } from '../../services/api';

const BookingSchedule: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            setIsLoading(true);
            try {
                const fetchedOrders = await fetchOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadOrders();
    }, []);

    const groupedBookings = useMemo(() => {
        const groups: { [key: string]: Order[] } = {};
        orders
            .filter(order => order.booking.date)
            .sort((a, b) => new Date(a.booking.date).getTime() - new Date(b.booking.date).getTime() || a.booking.timeSlot.localeCompare(b.booking.timeSlot))
            .forEach(order => {
                const date = new Date(`${order.booking.date}T00:00:00`).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(order);
            });
        return groups;
    }, [orders]);

    if (isLoading) {
        return <div className="text-center p-8">Cargando calendario...</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Reservas Programadas</h3>
            </div>
            <div className="p-4 space-y-6">
                {Object.keys(groupedBookings).length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No hay reservas programadas.</p>
                ) : (
                    Object.entries(groupedBookings).map(([date, bookings]) => (
                        <div key={date}>
                            <h4 className="font-bold text-primary mb-2 capitalize">{date}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* FIX: Cast `bookings` to `Order[]` to fix "Property 'map' does not exist on type 'unknown'" error. */}
                                {(bookings as Order[]).map(order => (
                                    <div key={order.id} className="border rounded-md p-4 bg-gray-50">
                                        <p className="font-semibold">{order.booking.timeSlot}</p>
                                        <p className="text-sm text-gray-700">{order.customer.name}</p>
                                        <p className="text-xs text-gray-500">Pedido #{order.id}</p>
                                        <span className={`mt-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${order.booking.type === 'Envío a domicilio' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                            {order.booking.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BookingSchedule;
