
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchOrdersByUserEmail } from '../services/api';
import { Order, OrderStatus } from '../types';
import Header from '../components/shop/Header';
import CartModal from '../components/shop/CartModal';

const AccountPage: React.FC = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        if (user?.email) {
            const loadOrders = async () => {
                setIsLoading(true);
                try {
                    const userOrders = await fetchOrdersByUserEmail(user.email);
                    setOrders(userOrders);
                } catch (error) {
                    console.error("Failed to fetch user orders:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadOrders();
        }
    }, [user?.email]);

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

    return (
        <div className="min-h-screen bg-background">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <main className="container mx-auto px-4 py-12">
                <div className="bg-surface p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                         <h1 className="text-3xl font-bold text-primary">
                            Hola, {user?.name || 'Cliente'}
                        </h1>
                        <button onClick={logout} className="text-sm text-red-600 hover:text-red-800 font-semibold">
                            Cerrar Sesión
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold text-text-primary border-b pb-2 mb-4">
                        Historial de Pedidos
                    </h2>

                    {isLoading ? (
                        <p className="text-center text-text-secondary py-8">Cargando tus pedidos...</p>
                    ) : orders.length === 0 ? (
                        <p className="text-center text-text-secondary py-8">Aún no has realizado ningún pedido.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Pedido</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default AccountPage;
