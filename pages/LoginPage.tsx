
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const user = await auth.login(email, password);
            if (user) {
                navigate(user.role === 'admin' ? '/admin' : '/account');
            } else {
                setError('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Ha ocurrido un error al iniciar sesión.');
        }
    };
    
    const handleRegister = async () => {
        try {
            const newUser = await auth.register(name, email, password);
            if (newUser) {
                navigate('/account'); // Redirect to user account page after registration
            }
        } catch (err: any) {
            setError(err.message || 'Ha ocurrido un error durante el registro.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        if (mode === 'login') {
            await handleLogin();
        } else {
            await handleRegister();
        }
        setIsLoading(false);
    };

    const inputClasses = "p-3 border border-gray-300 rounded-md bg-white w-full text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none";
    const tabButtonClasses = (isActive: boolean) => 
        `w-1/2 py-3 text-center font-semibold rounded-t-lg transition-colors focus:outline-none ${
            isActive ? 'bg-white text-primary' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-6">
                    <Link to="/" className="text-3xl font-bold text-primary">
                        FruityFresh
                    </Link>
                    <h2 className="mt-2 text-xl font-semibold text-gray-700">Bienvenido</h2>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex">
                        <button onClick={() => setMode('login')} className={tabButtonClasses(mode === 'login')}>
                            Iniciar Sesión
                        </button>
                        <button onClick={() => setMode('register')} className={tabButtonClasses(mode === 'register')}>
                            Registrarse
                        </button>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} noValidate>
                            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
                            
                            {mode === 'register' && (
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                        Nombre Completo
                                    </label>
                                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClasses} required/>
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Correo Electrónico
                                </label>
                                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} required/>
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Contraseña
                                </label>
                                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} required/>
                            </div>
                            
                            <button type="submit" disabled={isLoading} className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark transition-colors disabled:bg-gray-400">
                                {isLoading ? 'Procesando...' : (mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-primary-light border-l-4 border-primary text-primary-dark p-4 mt-6 rounded-r-lg shadow-sm" role="alert">
                    <p className="font-bold">Datos de Prueba para Demo</p>
                    <div className="mt-2 text-sm space-y-1">
                        <p><strong>Cuenta de Administrador:</strong></p>
                        <p>Email: <code className="bg-green-200 text-gray-800 px-1.5 py-0.5 rounded">admin@example.com</code></p>
                        <p>Contraseña: <code className="bg-green-200 text-gray-800 px-1.5 py-0.5 rounded">password</code></p>
                    </div>
                    <div className="mt-3 text-sm space-y-1">
                        <p><strong>Cuenta de Cliente:</strong></p>
                        <p>Email: <code className="bg-green-200 text-gray-800 px-1.5 py-0.5 rounded">cliente@example.com</code></p>
                        <p>Contraseña: <code className="bg-green-200 text-gray-800 px-1.5 py-0.5 rounded">password123</code></p>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link to="/shop" className="text-sm text-primary hover:underline">
                        &larr; Volver a la tienda
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
