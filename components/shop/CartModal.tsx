import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import CheckoutFlow from './CheckoutFlow';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);

const CartView: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
    const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Tu Carrito</h2>
            {items.length === 0 ? (
                <p className="text-text-secondary">Tu carrito está vacío.</p>
            ) : (
                <>
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {items.map(item => (
                            <div key={item.id} className="flex items-center justify-between">
                                <img src={item.imageUrl || 'https://via.placeholder.com/64.png?text=Img'} alt={item.name} className="w-16 h-16 rounded-md object-cover bg-gray-200"/>
                                <div className="flex-1 mx-4">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-text-secondary">${item.price.toFixed(2)} / {item.unit}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                        className="w-16 p-1 border border-gray-300 rounded-md text-center bg-white text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                                    />
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total ({totalItems} items)</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={onCheckout}
                            className="w-full mt-4 bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors"
                        >
                            Proceder al Pago
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};


const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    
    const handleClose = () => {
        onClose();
        // Reset state after modal closes
        setTimeout(() => {
            setIsCheckingOut(false);
        }, 300);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 flex-grow overflow-y-auto">
                    {!isCheckingOut ? (
                        <CartView onCheckout={() => setIsCheckingOut(true)} />
                    ) : (
                        <CheckoutFlow onBack={() => setIsCheckingOut(false)} onSuccess={handleClose}/>
                    )}
                </div>
                <div className="p-4 bg-gray-50 border-t rounded-b-lg">
                    <button onClick={handleClose} className="w-full sm:w-auto text-sm text-text-secondary hover:text-text-primary transition-colors">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;