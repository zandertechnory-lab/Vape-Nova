'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        })
        console.log(`getProducts: Fetched ${products.length} products`);
        return { success: true, products }
    } catch (error) {
        console.error('Failed to fetch products:', error)
        return { success: false, error: 'Failed to fetch products' }
    }
}

export async function createProduct(data) {
    console.log('createProduct received data:', data);
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                image: data.image,
                brand: data.brand || null,
                category: {
                    connect: { slug: data.category }
                }
            }
        })
        revalidatePath('/admin/dashboard')
        revalidatePath('/shop')
        return { success: true, product }
    } catch (error) {
        console.error('Failed to create product:', error)
        // Check for specific Prisma errors
        if (error.code === 'P2025') {
            return { success: false, error: 'Selected category does not exist' }
        }
        return { success: false, error: error.message || 'Failed to create product' }
    }
}

export async function updateProduct(id, data) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                image: data.image,
                brand: data.brand || null,
                category: {
                    connect: { slug: data.category }
                }
            }
        })
        revalidatePath('/admin/dashboard')
        revalidatePath('/shop')
        return { success: true, product }
    } catch (error) {
        console.error('Failed to update product:', error)
        // Check for specific Prisma errors
        if (error.code === 'P2025') {
            return { success: false, error: 'Selected category does not exist' }
        }
        return { success: false, error: error.message || 'Failed to update product' }
    }
}

export async function deleteProduct(id) {
    try {
        await prisma.product.delete({
            where: { id }
        })
        revalidatePath('/admin/dashboard')
        revalidatePath('/shop')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete product:', error)
        return { success: false, error: 'Failed to delete product' }
    }
}
