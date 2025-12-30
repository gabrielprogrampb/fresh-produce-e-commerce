
import React, { useState } from 'react';
import Header from '../components/shop/Header';
import CartModal from '../components/shop/CartModal';

const AboutPage: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <Header onCartClick={() => setIsCartOpen(true)} />
            <main className="container mx-auto px-4 py-12">
                <div className="bg-surface p-8 rounded-lg shadow-md max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-primary mb-6 text-center">Sobre FruityFresh</h1>
                    <div className="space-y-6 text-text-secondary leading-relaxed">
                        <p>
                            Bienvenido a <strong>FruityFresh</strong>, tu distribuidor de confianza de frutas y verduras frescas directamente del campo a tu mesa. Nacimos de la pasión por la agricultura sostenible y el deseo de conectar a los productores locales con los consumidores que valoran la calidad y el sabor auténtico.
                        </p>
                        <p>
                            Nuestra misión es simple: ofrecer productos de la más alta calidad, cosechados en su punto óptimo de madurez, garantizando frescura y un valor nutricional excepcional. Trabajamos mano a mano con una red de agricultores comprometidos con prácticas agrícolas responsables y respetuosas con el medio ambiente.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                             <div className="bg-primary-light p-6 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">Nuestra Visión</h3>
                                <p>Ser el puente preferido entre el campo y la ciudad, promoviendo un estilo de vida saludable y apoyando la economía local.</p>
                             </div>
                             <div className="bg-primary-light p-6 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">Nuestros Valores</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li><strong>Calidad:</strong> Selección rigurosa de cada producto.</li>
                                    <li><strong>Frescura:</strong> Entrega rápida para máxima frescura.</li>
                                    <li><strong>Sostenibilidad:</strong> Apoyo a la agricultura ecológica.</li>
                                    <li><strong>Comunidad:</strong> Conexión con productores y clientes.</li>
                                </ul>
                             </div>
                        </div>
                        <p>
                            Gracias por elegirnos. Al comprar en FruityFresh, no solo estás llevando salud a tu hogar, sino que también estás apoyando a las familias de agricultores locales. ¡Disfruta del verdadero sabor de lo natural!
                        </p>
                    </div>
                </div>
            </main>
            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default AboutPage;
