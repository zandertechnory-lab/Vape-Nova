'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getContent(section) {
    try {
        const content = await prisma.siteContent.findMany({
            where: { section }
        })
        // Convert array to object for easier consumption
        return content.reduce((acc, item) => {
            acc[item.key] = item.value
            return acc
        }, {})
    } catch (error) {
        console.error('Failed to fetch content:', error)
        return {}
    }
}

export async function updateContent(section, data) {
    try {
        const updates = Object.entries(data).map(([key, value]) => {
            return prisma.siteContent.upsert({
                where: { key },
                update: { value, section, type: 'text' },
                create: { key, value, section, type: 'text' }
            })
        })

        await Promise.all(updates)
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Failed to update content:', error)
        return { success: false, error: 'Failed to update content' }
    }
}
