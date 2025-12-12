import { Suspense } from 'react';
import { getProducts } from '@/app/actions/products';
import { getCategories } from '@/app/actions/categories';
import ShopClient from './ShopClient';

async function ShopContent() {
    const { products } = await getProducts();
    const { categories } = await getCategories();

    return <ShopClient initialProducts={products || []} categories={categories || []} />;
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
