import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { fetchProductById } from '../services/api';
import { useCart } from '../hooks/useCart';
import Header from '../components/shop/Header';
import CartModal from '../components/shop/CartModal';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;
        const loadProduct = async () => {
            setIsLoading(true);
            try {
                const fetchedProduct = await fetchProductById(id);
                setProduct(fetchedProduct || null);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                setProduct(null);
            } finally {
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const renderContent = () => {
        if (isLoading) {
            return (
              <div className="text-center p-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-text-secondary">Cargando producto...</p>
              </div>
            );
        }

        if (!product) {
            return (
                <div className="text-center p-10">
                    <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
                    <p className="text-text-secondary mb-6">Lo sentimos, no pudimos encontrar el producto que buscas.</p>
                    <Link to="/shop" className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary-dark">
                        Volver a la tienda
                    </Link>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div>
                    <img src={product.imageUrl || 'https://via.placeholder.com/600x600.png?text=FruityFresh'} alt={product.name} className="w-full h-auto rounded-lg shadow-lg object-cover aspect-square bg-gray-200" />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-text-primary mb-2">{product.name}</h1>
                    <p className="text-2xl font-semibold text-primary mb-4">
                        ${product.price.toFixed(2)} <span className="text-lg font-normal text-text-secondary">/ {product.unit}</span>
                    </p>
                    <p className="text-text-secondary mb-6 flex-grow leading-relaxed">{product.description}</p>
                    <div className="flex items-center mb-6">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {product.stock > 0 ? `En Stock (${product.stock} disponibles)` : 'Agotado'}
                        </span>
                    </div>
                    <div className="mt-auto">
                         <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0 || isAdding}
                            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-300 text-lg ${
                                product.stock === 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : isAdding 
                                ? 'bg-green-700'
                                : 'bg-primary hover:bg-primary-dark'
                            }`}
                        >
                            {isAdding ? 'Añadido!' : 'Añadir al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <main className="container mx-auto px-4 py-10">
                <div className="mb-6">
                    <Link to="/shop" className="text-primary hover:underline">
                        &larr; Volver a todos los productos
                    </Link>
                </div>
                {renderContent()}
            </main>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default ProductDetailPage;