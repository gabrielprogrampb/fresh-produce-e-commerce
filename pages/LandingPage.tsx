
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/shop/Header';
import CartModal from '../components/shop/CartModal';

// Icons for the features section
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7.828a1 1 0 00-.293-.707l-2.828-2.828A1 1 0 0012.172 4H12v12z" />
    </svg>
);


const LandingPage: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] md:h-[70vh] bg-cover bg-center flex items-center justify-center text-center text-white" 
        style={{backgroundImage: "url('https://picsum.photos/seed/fresh-market/1600/900')"}}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">FruityFresh: Del Campo a tu Mesa.</h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-3xl mx-auto">
            Descubre la frescura y el sabor auténtico de productos locales. Hacemos tu compra de frutas y verduras más fácil y saludable.
          </p>
          <Link 
            to="/shop" 
            className="mt-8 inline-block bg-accent hover:bg-yellow-500 text-text-primary font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105"
          >
            Explorar la Tienda
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">¿Por qué elegirnos?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto mb-12">
            Estamos comprometidos con la calidad, la comunidad y la conveniencia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex flex-col items-center">
              <div className="bg-primary-light p-4 rounded-full mb-4">
                <SparklesIcon /> 
              </div>
              <h3 className="text-xl font-semibold mb-2">Frescura Inigualable</h3>
              <p className="text-text-secondary">Nuestros productos son cosechados poco antes de la entrega para garantizar la máxima frescura y sabor.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-light p-4 rounded-full mb-4">
                <UsersIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apoyo a Agricultores Locales</h3>
              <p className="text-text-secondary">Trabajamos directamente con agricultores de la región, fomentando el comercio justo y sostenible.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary-light p-4 rounded-full mb-4">
                <TruckIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Entrega Cómoda y Rápida</h3>
              <p className="text-text-secondary">Recibe tu pedido en la puerta de tu casa o recógelo en nuestra tienda. Tú eliges.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} FruityFresh. Todos los derechos reservados.</p>
        </div>
      </footer>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default LandingPage;
