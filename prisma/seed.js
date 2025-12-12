const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create Categories
    const categories = [
        { name: 'Portable Vaporizers', slug: 'portable' },
        { name: 'Desktop Vaporizers', slug: 'desktop' },
        { name: 'Concentrates', slug: 'concentrates' },
        { name: 'Accessories', slug: 'accessories' },
        { name: 'E-Liquids', slug: 'e-liquids' }
    ];

    console.log('Seeding categories...');
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    // Create Sample Products
    const products = [
        {
            name: 'Mighty+ Vaporizer',
            description: 'The Mighty+ is a portable vaporizer that delivers desktop-quality vapor.',
            price: 399.00,
            stock: 10,
            image: 'https://images.unsplash.com/photo-1612284368687-3c07223d6433?w=800&q=80',
            categorySlug: 'portable'
        },
        {
            name: 'Volcano Hybrid',
            description: 'The ultimate desktop vaporizer with dual inhalation system.',
            price: 699.00,
            stock: 5,
            image: 'https://images.unsplash.com/photo-1550523826-b51906233156?w=800&q=80',
            categorySlug: 'desktop'
        },
        {
            name: 'Naked 100 Lava Flow',
            description: 'A delicious blend of strawberry, pineapple, and coconut.',
            price: 19.99,
            stock: 50,
            image: 'https://images.unsplash.com/photo-1534839733678-d218c728723c?w=800&q=80',
            categorySlug: 'e-liquids'
        }
    ];

    console.log('Seeding products...');
    for (const p of products) {
        const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
        if (category) {
            await prisma.product.create({
                data: {
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    stock: p.stock,
                    image: p.image,
                    categoryId: category.id
                }
            });
        }
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
