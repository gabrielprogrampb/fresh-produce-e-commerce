import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CustomerDetails } from '../../types';
import { fetchCustomers, deleteCustomer } from '../../services/api';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState<CustomerDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const loadCustomers = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedCustomers = await fetchCustomers();
            setCustomers(fetchedCustomers);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);
    
    const handleDelete = async (customerEmail: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este cliente? Se eliminarán todos sus pedidos y datos asociados de forma permanente.')) {
            try {
                await deleteCustomer(customerEmail);
                loadCustomers();
            } catch (error) {
                console.error("Failed to delete customer:", error);
                alert('No se pudo eliminar el cliente.');
            }
        }
    };

    const filteredCustomers = useMemo(() => {
        if (!searchTerm) {
            return customers;
        }
        return customers.filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [customers, searchTerm]);

    if (isLoading) {
        return <div className="text-center p-8">Cargando clientes...</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg">
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Lista de Clientes</h3>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                        aria-label="Buscar clientes"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-gray-500">No se encontraron clientes.</td></tr>
                        ) : (
                            filteredCustomers.map(customer => (
                                <tr key={customer.email}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.address || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleDelete(customer.email)}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title={`Eliminar cliente ${customer.name}`}
                                        >
                                            Eliminar
                                        </button>
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

export default CustomerManagement;