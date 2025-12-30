import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { submitOrder, fetchAvailability } from '../../services/api';
import { BookingType, CustomerDetails, BookingDetails, OrderStatus, CartItem } from '../../types';
import DatePicker from './DatePicker';

interface CheckoutFlowProps {
  onBack: () => void;
  onSuccess: () => void;
}

const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<CustomerDetails>({ name: '', email: '', phone: '', address: '' });
  const [booking, setBooking] = useState<BookingDetails>({ type: BookingType.DELIVERY, date: '', timeSlot: '' });
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, totalPrice, clearCart } = useCart();
  
  useEffect(() => {
    if (booking.date) {
      const selectedDate = new Date(`${booking.date}T00:00:00`);
      fetchAvailability(selectedDate).then(setAvailableSlots);
    } else {
      setAvailableSlots([]);
    }
  }, [booking.date]);
  
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  
  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'type') {
      setBooking({ type: value as BookingType, date: '', timeSlot: '' });
    } else {
      setBooking(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (newDate: string) => {
    setBooking(prev => ({ ...prev, date: newDate, timeSlot: '' }));
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
        await submitOrder({
            customer,
            items: items as CartItem[],
            total: totalPrice,
            booking,
            status: OrderStatus.RECEIVED,
        });
        setStep(4);
        clearCart();
    } catch (error) {
        console.error("Failed to submit order:", error);
    } finally {
        setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  
  const renderStep = () => {
    switch (step) {
      case 1: // Customer Details
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">1. Tus Datos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="name" placeholder="Nombre completo" value={customer.name} onChange={handleCustomerChange} className="p-2 border border-gray-300 rounded-md bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none"/>
              <input type="email" name="email" placeholder="Correo electrónico" value={customer.email} onChange={handleCustomerChange} className="p-2 border border-gray-300 rounded-md bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none"/>
              <input type="tel" name="phone" placeholder="Teléfono" value={customer.phone} onChange={handleCustomerChange} className="p-2 border border-gray-300 rounded-md bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none"/>
              <input type="text" name="address" placeholder="Dirección de envío" value={customer.address} onChange={handleCustomerChange} className="p-2 border border-gray-300 rounded-md bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none sm:col-span-2"/>
            </div>
            <button onClick={() => setStep(2)} className="w-full mt-6 bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark">Siguiente</button>
          </div>
        );
      case 2: // Booking
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">2. Reserva tu Entrega</h3>
             <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                    <input type="radio" name="type" value={BookingType.DELIVERY} checked={booking.type === BookingType.DELIVERY} onChange={handleBookingChange} className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"/>
                    <span className="ml-2">Envío a domicilio</span>
                </label>
                <label className="flex items-center">
                    <input type="radio" name="type" value={BookingType.PICKUP} checked={booking.type === BookingType.PICKUP} onChange={handleBookingChange} className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"/>
                    <span className="ml-2">Recogida en tienda</span>
                </label>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DatePicker 
                  selectedDate={booking.date}
                  onDateChange={handleDateChange}
                  minDate={today}
                />
                <select name="timeSlot" value={booking.timeSlot} onChange={handleBookingChange} disabled={!booking.date || availableSlots.length === 0} className="p-2 border border-gray-300 rounded-md bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none disabled:bg-gray-100">
                    <option value="">Selecciona un horario</option>
                    {availableSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                </select>
             </div>
             <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="text-primary">Atrás</button>
                <button onClick={() => setStep(3)} disabled={!booking.timeSlot} className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary-dark disabled:bg-gray-400">Siguiente</button>
             </div>
          </div>
        );
      case 3: // Payment & Confirmation
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4">3. Pago y Resumen</h3>
            <div className="bg-primary-light p-4 rounded-md">
                <h4 className="font-semibold mb-2">Resumen del Pedido</h4>
                <p><strong>Cliente:</strong> {customer.name}</p>
                <p><strong>Contacto:</strong> {customer.email} / {customer.phone}</p>
                <p><strong>Tipo:</strong> {booking.type}</p>
                {booking.type === BookingType.DELIVERY && <p><strong>Dirección:</strong> {customer.address}</p>}
                <p><strong>Fecha:</strong> {booking.date ? new Date(`${booking.date}T00:00:00`).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No seleccionada'}</p>
                <p><strong>Horario:</strong> {booking.timeSlot}</p>
                <p className="font-bold text-lg mt-2">Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <p className="text-center my-4 text-text-secondary">Simulación de pasarela de pago</p>
            <div className="flex justify-between mt-6">
                <button onClick={() => setStep(2)} className="text-primary">Atrás</button>
                <button onClick={handleSubmit} disabled={isSubmitting} className="bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary-dark disabled:bg-gray-400">
                    {isSubmitting ? 'Procesando...' : 'Confirmar y Pagar'}
                </button>
             </div>
          </div>
        );
      case 4: // Success
        return (
          <div className="text-center">
             <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             <h3 className="text-2xl font-bold mt-4">¡Pedido Realizado!</h3>
             <p className="mt-2 text-text-secondary">Hemos recibido tu pedido y lo estamos preparando. Recibirás una confirmación por correo electrónico.</p>
             <button onClick={onSuccess} className="mt-6 bg-primary text-white py-2 px-6 rounded-md font-semibold hover:bg-primary-dark">Volver a la tienda</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-text-primary">Checkout</h2>
            {step < 4 && <button onClick={onBack} className="text-sm text-primary">Volver al carrito</button>}
        </div>
        {renderStep()}
    </div>
  );
};

export default CheckoutFlow;