
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../services/api';
import Header from '../components/shop/Header';
import ProductList from '../components/shop/ProductList';
import CartModal from '../components/shop/CartModal';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">Nuestros Productos Frescos</h1>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-surface rounded-lg shadow-md animate-pulse">
                <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </main>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default ShopPage;
