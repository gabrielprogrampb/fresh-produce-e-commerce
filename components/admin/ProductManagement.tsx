import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/api';

const ProductForm: React.FC<{
    product: Partial<Product> | null;
    onSave: (productData: Omit<Product, 'id'> | Partial<Product>) => void;
    onCancel: () => void;
}> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        unit: product?.unit || 'kg',
        stock: product?.stock || 0,
        imageUrl: product?.imageUrl || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumeric = type === 'number';
        setFormData(prev => ({
            ...prev,
            [name]: isNumeric ? parseFloat(value) : value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageUrl: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            imageUrl: '',
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputClasses = "p-2 border border-gray-300 rounded w-full bg-white text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                    <div className="p-6 overflow-y-auto flex-grow">
                        <h3 className="text-xl font-bold mb-4">{product?.id ? 'Editar Producto' : 'Añadir Producto'}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input name="name" value={formData.name} onChange={handleChange} className={inputClasses + " mt-1"} required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} className={inputClasses + " mt-1"} rows={3} required />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Precio</label>
                                <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className={inputClasses + " mt-1"} required />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Unidad</label>
                                <select name="unit" value={formData.unit} onChange={handleChange} className={inputClasses + " mt-1"}>
                                    <option value="kg">kg</option>
                                    <option value="unit">unit</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input name="stock" type="number" value={formData.stock} onChange={handleChange} className={inputClasses + " mt-1"} required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Imagen del Producto</label>
                                <div className="mt-2 flex items-center space-x-4">
                                    {formData.imageUrl ? (
                                        <img 
                                            src={formData.imageUrl} 
                                            alt="Vista previa" 
                                            className="h-20 w-20 rounded-md object-cover bg-gray-100" 
                                        />
                                    ) : (
                                        <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                                            Sin imagen
                                        </div>
                                    )}
                                    <div className="flex flex-col space-y-2 items-start">
                                        <label htmlFor="file-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                            <span>{formData.imageUrl ? 'Cambiar' : 'Subir imagen'}</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                        {formData.imageUrl && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="text-sm text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Eliminar imagen
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="imageUrl-input" className="block text-sm text-gray-500">O introduce una URL de imagen</label>
                                    <input 
                                        id="imageUrl-input"
                                        type="text"
                                        name="imageUrl"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                        value={formData.imageUrl.startsWith('data:') ? '' : formData.imageUrl}
                                        onChange={handleChange}
                                        className={inputClasses + " mt-1"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 border-t flex justify-end space-x-2 rounded-b-lg flex-shrink-0">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            setProducts(await fetchProducts());
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (productId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await deleteProduct(productId);
                await loadProducts();
            } catch (error) {
                console.error("Failed to delete product:", error);
            }
        }
    };

    const handleSave = async (productData: Omit<Product, 'id'> | Partial<Product>) => {
        try {
            if (editingProduct?.id) {
                await updateProduct(editingProduct.id, productData);
            } else {
                await createProduct(productData as Omit<Product, 'id'>);
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            await loadProducts();
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    };
    
    if (isLoading) {
        return <div className="text-center p-8">Cargando productos...</div>;
    }

    return (
        <div className="bg-white shadow rounded-lg">
             {isModalOpen && (
                <ProductForm 
                    product={editingProduct}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setEditingProduct(null);
                    }}
                />
            )}
            <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Gestión de Productos</h3>
                <button onClick={handleAdd} className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-dark">
                    Añadir Producto
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover bg-gray-200" src={product.imageUrl || `https://via.placeholder.com/40x40.png?text=S/I`} alt={product.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)} / {product.unit}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button onClick={() => handleEdit(product)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
                                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;