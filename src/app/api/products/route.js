import prisma from '@/lib/prisma';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');
        const brand = searchParams.get('brand');

        const where = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { category: { name: { contains: search, mode: 'insensitive' } } }
            ];
        }

        if (category && category !== 'all') {
            where.category = {
                slug: category
            };
        }

        if (brand && brand !== 'all') {
            where.brand = {
                equals: brand,
                mode: 'insensitive'
            };
        }

        const products = await prisma.product.findMany({
            where,
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });

        return Response.json({ products });
    } catch (error) {
        console.error('API /products GET failed:', error);
        return Response.json({
            error: 'Failed to fetch products',
            details: error.message,
            stack: error.stack
        }, { status: 200 });
    }
}

