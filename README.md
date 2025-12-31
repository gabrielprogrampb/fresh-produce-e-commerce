# 🥬 Fresh Produce E-commerce

Tienda online de productos frescos con sistema de reservas y entregas.

## 📋 Descripción

Fresh Produce es una plataforma e-commerce para la venta de frutas y verduras frescas. Los clientes pueden explorar productos, agregarlos al carrito y programar su entrega a domicilio o recogida en tienda.

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router DOM** - Navegación SPA
- **Tailwind CSS** - Framework de estilos
- **Context API** - Estado global

## 📁 Estructura del Proyecto

```
fresh-produce-e-commerce/
├── components/
│   ├── auth/              # Componentes de autenticación
│   │   └── ProtectedRoute.tsx
│   └── ...                # Otros componentes
├── context/
│   ├── CartContext.tsx    # Estado del carrito
│   └── AuthContext.tsx    # Estado de autenticación
├── hooks/                 # Custom hooks
├── pages/
│   ├── LandingPage.tsx    # Página de inicio
│   ├── ShopPage.tsx       # Catálogo de productos
│   ├── ProductDetailPage.tsx # Detalle de producto
│   ├── AboutPage.tsx      # Sobre nosotros
│   ├── LoginPage.tsx      # Iniciar sesión
│   ├── AccountPage.tsx    # Cuenta del usuario
│   └── AdminPage.tsx      # Panel de administración
├── services/              # Servicios de datos
├── App.tsx                # Componente principal
├── index.tsx              # Punto de entrada
└── types.ts               # Definiciones de tipos
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd fresh-produce-e-commerce
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

## ✨ Funcionalidades

### Para Clientes
- **Catálogo de productos** - Explorar frutas y verduras
- **Carrito de compras** - Agregar y gestionar productos
- **Sistema de reservas** - Elegir fecha y hora de entrega
- **Opciones de entrega** - Domicilio o recogida en tienda
- **Cuenta de usuario** - Ver historial de pedidos

### Para Administradores
- **Gestión de productos** - CRUD de inventario
- **Gestión de pedidos** - Cambiar estados de órdenes
- **Vista de clientes** - Información de usuarios

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Previsualiza el build |

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
