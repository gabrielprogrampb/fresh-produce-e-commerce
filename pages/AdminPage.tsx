
import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import OrderList from '../components/admin/OrderList';
import BookingSchedule from '../components/admin/BookingSchedule';
import ProductManagement from '../components/admin/ProductManagement';
import CustomerManagement from '../components/admin/CustomerManagement';


const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'schedule' | 'products' | 'customers'>('orders');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderList />;
      case 'schedule':
        return <BookingSchedule />;
      case 'products':
        return <ProductManagement />;
      case 'customers':
        return <CustomerManagement />;
      default:
        return null;
    }
  };

  const getTabClass = (tabName: typeof activeTab) => {
    return `${
      activeTab === tabName
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('orders')} className={getTabClass('orders')}>
              Gestión de Pedidos
            </button>
            <button onClick={() => setActiveTab('schedule')} className={getTabClass('schedule')}>
              Calendario de Reservas
            </button>
            <button onClick={() => setActiveTab('products')} className={getTabClass('products')}>
              Gestión de Productos
            </button>
            <button onClick={() => setActiveTab('customers')} className={getTabClass('customers')}>
              Clientes
            </button>
          </nav>
        </div>

        <div>
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
