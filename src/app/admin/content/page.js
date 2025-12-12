import { getContent } from '@/app/actions/content';
import ContentClient from './ContentClient';

export default async function ContentPage() {
    const content = await getContent('hero');
    return <ContentClient initialContent={content || {}} />;
}
