import { Product, Order, OrderStatus, BookingType, CustomerDetails, User } from '../types';

let MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Manzanas Fuji', description: 'Crujientes y dulces, perfectas para comer solas o en tartas. Cada manzana es seleccionada a mano para garantizar la máxima calidad y frescura.', price: 2.5, unit: 'kg', stock: 150, imageUrl: 'https://picsum.photos/seed/apple/400/300' },
  { id: '2', name: 'Plátanos de Canarias', description: 'Con indicación geográfica protegida, sabor único y dulzor natural. Ricos en potasio y perfectos para empezar el día con energía.', price: 1.9, unit: 'kg', stock: 200, imageUrl: 'https://picsum.photos/seed/banana/400/300' },
  { id: '3', name: 'Aguacate Hass', description: 'Cremoso y perfecto para guacamole, tostadas o ensaladas. Una fuente saludable de grasas monoinsaturadas.', price: 2.1, unit: 'unit', stock: 80, imageUrl: 'https://picsum.photos/seed/avocado/400/300' },
  { id: '4', name: 'Tomates de Rama', description: 'Ideales para ensaladas y salsas caseras. Madurados en la planta para un sabor intenso y jugoso.', price: 3.0, unit: 'kg', stock: 120, imageUrl: 'https://picsum.photos/seed/tomato/400/300' },
  { id: '5', name: 'Zanahorias', description: 'Frescas y llenas de vitaminas. Geniales para cremas, guisos o como snack saludable y crujiente.', price: 1.2, unit: 'kg', stock: 300, imageUrl: 'https://picsum.photos/seed/carrot/400/300' },
  { id: '6', name: 'Lechuga Iceberg', description: 'Refrescante y crujiente para tus mejores ensaladas. Su textura la hace ideal para hamburguesas y sándwiches.', price: 0.9, unit: 'unit', stock: 90, imageUrl: 'https://picsum.photos/seed/lettuce/400/300' },
  { id: '7', name: 'Fresas de Huelva', description: 'Dulces, jugosas y perfectas para postres, batidos o simplemente para disfrutar solas. Ricas en vitamina C.', price: 4.5, unit: 'kg', stock: 50, imageUrl: 'https://picsum.photos/seed/strawberry/400/300' },
  { id: '8', name: 'Patatas Nuevas', description: 'Versátiles y deliciosas, ideales para freír, cocer o asar. De piel fina y carne tierna.', price: 1.5, unit: 'kg', stock: 400, imageUrl: 'https://picsum.photos/seed/potato/400/300' },
];

const MOCK_CUSTOMERS = [
    { name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '611223344', address: 'Calle Falsa 123, Madrid' },
    { name: 'Ana García', email: 'cliente@example.com', phone: '655667788', address: 'Avenida Siempreviva 742, Barcelona' },
];

let MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' },
    { id: 'user-2', name: 'Ana García', email: 'cliente@example.com', password: 'password123', role: 'customer' },
    { id: 'user-3', name: 'Carlos Sanchez', email: 'carlos.sanchez@example.com', password: 'password456', role: 'customer'},
];

let MOCK_ORDERS: Order[] = [
    {
        id: 'a1b2c3d4',
        customer: MOCK_CUSTOMERS[0],
        items: [
            { ...MOCK_PRODUCTS[0], quantity: 2 }, // 2kg Manzanas
            { ...MOCK_PRODUCTS[2], quantity: 3 }, // 3 Aguacates
        ],
        total: (2.5 * 2) + (2.1 * 3),
        booking: { type: BookingType.DELIVERY, date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], timeSlot: '10:00 - 11:00' },
        status: OrderStatus.COMPLETED,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
    },
    {
        id: 'e5f6g7h8',
        customer: MOCK_CUSTOMERS[1],
        items: [
            { ...MOCK_PRODUCTS[3], quantity: 1.5 }, // 1.5kg Tomates
            { ...MOCK_PRODUCTS[5], quantity: 1 }, // 1 Lechuga
        ],
        total: (3.0 * 1.5) + 0.9,
        booking: { type: BookingType.PICKUP, date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0], timeSlot: '17:00 - 18:00' },
        status: OrderStatus.PREPARING,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
     {
        id: 'i9j0k1l2',
        customer: MOCK_CUSTOMERS[1],
        items: [
            { ...MOCK_PRODUCTS[6], quantity: 1 }, // 1kg Fresas
        ],
        total: 4.5,
        booking: { type: BookingType.DELIVERY, date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString().split('T')[0], timeSlot: '12:00 - 13:00' },
        status: OrderStatus.COMPLETED,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
    },
];

// USER AUTH API
export const authenticateUser = async (email: string, pass: string): Promise<Omit<User, 'password'> | null> => {
    console.log(`API: Authenticating user ${email}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const user = MOCK_USERS.find(u => u.email === email && u.password === pass);
            if (user) {
                const { password, ...userWithoutPassword } = user;
                console.log('API: User authenticated successfully.', userWithoutPassword);
                resolve(userWithoutPassword);
            } else {
                console.log('API: Authentication failed.');
                resolve(null);
            }
        }, 500);
    });
};

export const registerUser = async (name: string, email: string, pass: string): Promise<Omit<User, 'password'> | null> => {
    console.log(`API: Registering user ${email}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (MOCK_USERS.some(u => u.email === email)) {
                console.log('API: Registration failed. Email already exists.');
                reject(new Error('El correo electrónico ya está en uso.'));
                return;
            }
            const newUser: User = {
                id: `user-${Math.random().toString(36).substring(2, 9)}`,
                name,
                email,
                password: pass,
                role: 'customer'
            };
            MOCK_USERS.push(newUser);
            const { password, ...userWithoutPassword } = newUser;
            console.log('API: User registered successfully.', userWithoutPassword);
            resolve(userWithoutPassword);
        }, 600);
    });
};


// PRODUCT API
export const fetchProducts = async (): Promise<Product[]> => {
  console.log('API: Fetching products...');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('API: Products fetched successfully.');
      resolve([...MOCK_PRODUCTS]);
    }, 500);
  });
};

export const fetchProductById = async (productId: string): Promise<Product | undefined> => {
  console.log(`API: Fetching product with id ${productId}...`);
  return new Promise(resolve => {
    setTimeout(() => {
      const product = MOCK_PRODUCTS.find(p => p.id === productId);
      console.log('API: Product fetched.', product);
      resolve(product);
    }, 400);
  });
};


export const fetchAvailability = async (date: Date): Promise<string[]> => {
    console.log(`API: Fetching availability for ${date.toDateString()}`);
    return new Promise(resolve => {
        setTimeout(() => {
            const day = date.getDay();
            let slots = [
                '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
                '12:00 - 13:00', '16:00 - 17:00', '17:00 - 18:00',
                '18:00 - 19:00',
            ];
            if (day === 0) { // Sunday
                slots = [];
            } else if (day === 6) { // Saturday
                slots = ['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00'];
            }
            console.log(`API: Availability for ${date.toDateString()} fetched.`);
            resolve(slots);
        }, 300);
    });
};

// ORDER API
export const submitOrder = async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    console.log('API: Submitting order...');
    return new Promise(resolve => {
        setTimeout(() => {
            const newOrder: Order = {
                ...order,
                id: Math.random().toString(36).substring(2, 9),
                createdAt: new Date(),
            };
            MOCK_ORDERS.unshift(newOrder);
            console.log('API: Order submitted successfully.', newOrder);
            resolve(newOrder);
        }, 1000);
    });
};

export const fetchOrders = async (): Promise<Order[]> => {
    console.log('API: Fetching orders...');
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('API: Orders fetched successfully.');
            resolve([...MOCK_ORDERS].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
        }, 700);
    });
};

export const fetchOrdersByUserEmail = async (email: string): Promise<Order[]> => {
    console.log(`API: Fetching orders for user ${email}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const userOrders = MOCK_ORDERS.filter(order => order.customer.email === email)
                                           .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            console.log('API: User orders fetched.', userOrders);
            resolve(userOrders);
        }, 600);
    });
};


export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
    console.log(`API: Updating order ${orderId} to status ${status}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderIndex = MOCK_ORDERS.findIndex(o => o.id === orderId);
            if (orderIndex !== -1) {
                MOCK_ORDERS[orderIndex].status = status;
                console.log(`API: Order ${orderId} updated.`);
                resolve(MOCK_ORDERS[orderIndex]);
            } else {
                reject(new Error('Order not found'));
            }
        }, 400);
    });
};

export const deleteOrder = async (orderId: string): Promise<void> => {
    console.log(`API: Deleting order ${orderId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const initialLength = MOCK_ORDERS.length;
            MOCK_ORDERS = MOCK_ORDERS.filter(o => o.id !== orderId);
            if (MOCK_ORDERS.length < initialLength) {
                console.log(`API: Order ${orderId} deleted.`);
                resolve();
            } else {
                reject(new Error('Order not found'));
            }
        }, 500);
    });
};


// ADMIN API
export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
    console.log('API: Creating product...');
    return new Promise(resolve => {
        setTimeout(() => {
            const newProduct: Product = {
                ...productData,
                id: Math.random().toString(36).substring(2, 9),
            };
            MOCK_PRODUCTS.unshift(newProduct);
            console.log('API: Product created.', newProduct);
            resolve(newProduct);
        }, 500);
    });
};

export const updateProduct = async (productId: string, productData: Partial<Product>): Promise<Product> => {
    console.log(`API: Updating product ${productId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const productIndex = MOCK_PRODUCTS.findIndex(p => p.id === productId);
            if (productIndex !== -1) {
                MOCK_PRODUCTS[productIndex] = { ...MOCK_PRODUCTS[productIndex], ...productData };
                console.log(`API: Product ${productId} updated.`);
                resolve(MOCK_PRODUCTS[productIndex]);
            } else {
                reject(new Error('Product not found'));
            }
        }, 500);
    });
};

export const deleteProduct = async (productId: string): Promise<void> => {
    console.log(`API: Deleting product ${productId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const initialLength = MOCK_PRODUCTS.length;
            MOCK_PRODUCTS = MOCK_PRODUCTS.filter(p => p.id !== productId);
            if (MOCK_PRODUCTS.length < initialLength) {
                console.log(`API: Product ${productId} deleted.`);
                resolve();
            } else {
                reject(new Error('Product not found'));
            }
        }, 500);
    });
};

export const fetchCustomers = async (): Promise<CustomerDetails[]> => {
    console.log('API: Fetching customers...');
    return new Promise(resolve => {
        setTimeout(() => {
            const customers: { [email: string]: CustomerDetails } = {};
            
            // First, add all registered users with 'customer' role
            MOCK_USERS.forEach(user => {
                if (user.role === 'customer') {
                    customers[user.email] = {
                        name: user.name,
                        email: user.email,
                        phone: '', // Default value
                        address: '', // Default value
                    };
                }
            });

            // Then, enrich with details from orders
            MOCK_ORDERS.forEach(order => {
                if (order.customer.email) {
                    customers[order.customer.email] = {
                        ...customers[order.customer.email], // Keep existing user data
                        name: order.customer.name, // Order info might be more current
                        email: order.customer.email,
                        phone: order.customer.phone,
                        address: order.customer.address,
                    };
                }
            });

            console.log('API: Customers fetched.');
            resolve(Object.values(customers));
        }, 600);
    });
};

export const deleteCustomer = async (customerEmail: string): Promise<void> => {
    console.log(`API: Deleting customer ${customerEmail} and their data.`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let userDeleted = false;
            let ordersDeleted = false;

            const initialUserLength = MOCK_USERS.length;
            MOCK_USERS = MOCK_USERS.filter(u => u.email !== customerEmail);
            if (MOCK_USERS.length < initialUserLength) {
                userDeleted = true;
            }

            const initialOrderLength = MOCK_ORDERS.length;
            MOCK_ORDERS = MOCK_ORDERS.filter(o => o.customer.email !== customerEmail);
            if (MOCK_ORDERS.length < initialOrderLength) {
                ordersDeleted = true;
            }

            if (userDeleted || ordersDeleted) {
                console.log(`API: Customer ${customerEmail} deleted.`);
                resolve();
            } else {
                reject(new Error('Customer not found'));
            }
        }, 500);
    });
};
