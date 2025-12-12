const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true }
        });
        console.log('Total products:', products.length);
        products.forEach(p => {
            console.log(`- ${p.name} (Category: ${p.category ? p.category.name : 'None'})`);
        });

        const categories = await prisma.category.findMany();
        console.log('\nTotal categories:', categories.length);
        categories.forEach(c => console.log(`- ${c.name} (${c.slug})`));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

checkData();
