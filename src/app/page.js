import { getProducts } from '@/app/actions/products';
import { getContent } from '@/app/actions/content';
import HomeClient from './HomeClient';

export default async function HomePage() {
  const { products } = await getProducts();
  const content = await getContent('hero');

  // Filter for featured products (e.g., first 6 in stock)
  const featuredProducts = (products || [])
    .filter(p => (p.stock || 0) > 0)
    .slice(0, 6);

  return <HomeClient featuredProducts={featuredProducts} content={content} />;
}
