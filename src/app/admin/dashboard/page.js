import { getProducts } from '@/app/actions/products';
import { getCategories } from '@/app/actions/categories';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
    const { products } = await getProducts();
    const { categories } = await getCategories();

    return <DashboardClient initialProducts={products || []} categories={categories || []} />;
}
