import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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

const contentDir = path.join(process.cwd(), 'content', 'blog');

function readPosts(locale: string): Post[] {
    const dir = path.join(contentDir, locale);
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    return files
        .map((file, i) => {
            const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
            const { data, content } = matter(raw);
            const body = marked.parse(content, { async: false }) as string;

            return {
                id: String(i + 1),
                slug: data.slug ?? file.replace(/\.md$/, ''),
                title: data.title ?? '',
                tag: data.tag ?? 'industry',
                publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString() : '',
                body,
                seoTitle: data.seoTitle,
                seoDescription: data.seoDescription,
                coverImage: data.coverImage ? { url: data.coverImage } : undefined,
            } satisfies Post;
        })
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPosts(locale: string): Promise<Post[]> {
    return readPosts(locale);
}

export async function getPost(slug: string, locale: string): Promise<Post | null> {
    return readPosts(locale).find(p => p.slug === slug) ?? null;
}
