"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProductContext = createContext({
    products: [],
    isLoading: true,
    error: null,
    refreshProducts: async () => {},
    addProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    getProductById: () => undefined
});

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/products', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error('Failed to load products');
            }
            const data = await response.json();
            setProducts(Array.isArray(data.products) ? data.products : []);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch products from API:', err);
            setError(err.message || 'Failed to load products');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = (product) => {
        const fallbackId = Date.now().toString();
        const newProduct = {
            ...product,
            id: product?.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : fallbackId),
        };
        setProducts(prev => [newProduct, ...prev]);
        return newProduct;
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(prev => prev.map(p => String(p.id) === String(id) ? { ...p, ...updatedProduct } : p));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
    };

    const getProductById = (id) => {
        return products.find(p => String(p.id) === String(id));
    };

    return (
        <ProductContext.Provider value={{
            products,
            isLoading,
            error,
            refreshProducts: fetchProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            getProductById
        }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => useContext(ProductContext);
