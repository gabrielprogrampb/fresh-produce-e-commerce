// =============================================================================
// App.tsx - Componente Principal de Fresh Produce E-commerce
// =============================================================================
// Descripción: Tienda online de productos frescos con sistema de reservas.
// Permite comprar frutas y verduras con opciones de envío a domicilio o
// recogida en tienda.
// 
// Rutas:
// - /           : Página de inicio (Landing)
// - /shop       : Catálogo de productos
// - /product/:id: Detalle de producto
// - /about      : Sobre nosotros
// - /login      : Iniciar sesión
// - /account    : Cuenta del usuario (protegida)
// - /admin      : Panel de administración (solo admin)
// =============================================================================

import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';   // Contexto del carrito
import { AuthProvider } from './context/AuthContext';   // Contexto de autenticación
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

/**
 * Componente principal de la aplicación
 * Configura los providers y el sistema de rutas
 */
function App() {
  return (
    // CartProvider: Proporciona el estado del carrito globalmente
    <CartProvider>
      <HashRouter>
        {/* AuthProvider: Maneja el estado de autenticación */}
        <AuthProvider>
          <Routes>
            {/* ============================================ */}
            {/* RUTAS PÚBLICAS */}
            {/* ============================================ */}
            <Route path="/" element={<LandingPage />} />              {/* Inicio */}
            <Route path="/shop" element={<ShopPage />} />             {/* Tienda */}
            <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Detalle */}
            <Route path="/about" element={<AboutPage />} />           {/* Sobre nosotros */}
            <Route path="/login" element={<LoginPage />} />           {/* Login */}

            {/* ============================================ */}
            {/* RUTAS PROTEGIDAS */}
            {/* ============================================ */}

            {/* Panel de Admin - Solo usuarios con rol 'admin' */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Cuenta de Usuario - Cualquier usuario autenticado */}
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />

            {/* Ruta catch-all: Redirige rutas no encontradas al inicio */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </CartProvider>
  );
}

export default App;
