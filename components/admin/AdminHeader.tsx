
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Panel de Administración
        </h1>
        <div className="flex items-center space-x-4">
          <Link to="/shop" className="text-sm text-gray-600 hover:text-primary transition-colors">
            Volver a la Tienda
          </Link>
          <button onClick={logout} className="text-sm text-red-600 hover:text-red-800 transition-colors font-semibold">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
