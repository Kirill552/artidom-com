const CMS_URL = process.env.PAYLOAD_CMS_URL ?? '';

export interface Post {
    id: string;
    slug: string;
    title: string;
    coverImage?: { url: string };
    tag: 'horeca' | 'materials' | 'projects' | 'industry';
    publishedAt: string;
    body: string;
    seoTitle?: string;
    seoDescription?: string;
}

// Статические fallback-данные пока нет CMS
const fallbackPosts: Post[] = [];

export async function getPosts(locale: string): Promise<Post[]> {
    if (!CMS_URL) return fallbackPosts;
    try {
        const res = await fetch(
            `${CMS_URL}/api/posts?locale=${locale}&sort=-publishedAt&limit=20`,
            { next: { revalidate: 60 } }
        );
        const data = await res.json();
        return data.docs ?? [];
    } catch {
        return fallbackPosts;
    }
}

export async function getPost(slug: string, locale: string): Promise<Post | null> {
    if (!CMS_URL) return null;
    try {
        const res = await fetch(
            `${CMS_URL}/api/posts?where[slug][equals]=${slug}&locale=${locale}`,
            { next: { revalidate: 60 } }
        );
        const data = await res.json();
        return data.docs?.[0] ?? null;
    } catch {
        return null;
    }
}
