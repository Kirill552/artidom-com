import { redirect } from 'next/navigation';

export default async function SolutionsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/solutions/residential`);
}
