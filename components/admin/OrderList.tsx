import React, { useState, useEffect, useCallback } from 'react';
import { Order, OrderStatus } from '../../types';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../../services/api';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        loadOrders();
    }, [loadOrders]);

    const handleStatusChange = async (orderId: string, status: OrderStatus) => {
        try {
            await updateOrderStatus(orderId, status);
            // Re-fetch orders to show updated status
            loadOrders();
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    const handleDelete = async (orderId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este pedido? Esta acción es irreversible y también eliminará la reserva asociada.')) {
            try {
                await deleteOrder(orderId);
                loadOrders();
            } catch (error) {
                console.error("Failed to delete order:", error);
                alert('No se pudo eliminar el pedido.');
            }
        }
    };

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case OrderStatus.RECEIVED: return 'bg-blue-100 text-blue-800';
            case OrderStatus.PREPARING: return 'bg-yellow-100 text-yellow-800';
            case OrderStatus.SHIPPED: return 'bg-indigo-100 text-indigo-800';
            case OrderStatus.COMPLETED: return 'bg-green-100 text-green-800';
            case OrderStatus.CANCELLED: return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return <div className="text-center p-8">Cargando pedidos...</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Pedidos Recientes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pedido</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length === 0 ? (
                            <tr><td colSpan={6} className="text-center py-8 text-gray-500">No hay pedidos.</td></tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                className="p-1 border rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-dark"
                                            >
                                                {Object.values(OrderStatus).map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                                title={`Eliminar pedido ${order.id}`}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;