
import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);


interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="bg-surface shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          FruityFresh
        </Link>
        <nav className="flex items-center space-x-6">
             <Link to="/shop" className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors">
                Tienda
            </Link>
             <Link to="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                Sobre Nosotros
            </Link>
            
            {user ? (
                <>
                    {user.role === 'admin' && (
                        <Link to="/admin" className="text-sm text-gray-600 hover:text-primary transition-colors">
                            Panel Admin
                        </Link>
                    )}
                     {user.role === 'customer' && (
                        <Link to="/account" className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center">
                           <UserIcon /> <span className="ml-1">Mi Cuenta</span>
                        </Link>
                    )}
                    <button onClick={logout} className="text-sm text-red-600 hover:text-red-800 font-semibold">
                        Cerrar Sesión
                    </button>
                </>
            ) : (
                <Link to="/login" className="text-sm text-gray-600 hover:text-primary transition-colors font-semibold">
                    Iniciar Sesión
                </Link>
            )}

            <button onClick={onCartClick} className="relative text-text-secondary hover:text-primary transition-colors">
                <CartIcon />
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                    </span>
                )}
            </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
