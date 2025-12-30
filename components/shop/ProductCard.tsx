import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => {
        setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col group">
      <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
        <div className="overflow-hidden">
          <img src={product.imageUrl || 'https://via.placeholder.com/400x300.png?text=FruityFresh'} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-200" />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-text-primary">{product.name}</h3>
          <p className="text-text-secondary text-sm mt-1 flex-grow line-clamp-2">{product.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl font-bold text-primary">
              ${product.price.toFixed(2)} <span className="text-sm font-normal text-text-secondary">/ {product.unit}</span>
            </p>
            <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? 'En Stock' : 'Agotado'}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors duration-300 ${
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
  );
};

export default ProductCard;