'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        })
        return { success: true, categories }
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return { success: false, error: 'Failed to fetch categories' }
    }
}

export async function createCategory(data) {
    try {
        const category = await prisma.category.create({
            data: {
                name: data.name,
                slug: data.slug || data.name.toLowerCase().replace(/ /g, '-'),
            }
        })
        revalidatePath('/admin/categories')
        return { success: true, category }
    } catch (error) {
        console.error('Failed to create category:', error)
        return { success: false, error: 'Failed to create category' }
    }
}

export async function deleteCategory(id) {
    try {
        await prisma.category.delete({
            where: { id }
        })
        revalidatePath('/admin/categories')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete category:', error)
        return { success: false, error: 'Failed to delete category' }
    }
}
