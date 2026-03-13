'use client'

import { useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ImageLightbox } from '@/components/ImageLightbox'

interface Props {
  images: string[]
  alt: string
}

export default function ProjectGallery({ images, alt }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const photoParam = searchParams.get('photo')
  const parsed = photoParam ? parseInt(photoParam, 10) : NaN
  const initialIndex = !isNaN(parsed) ? Math.max(0, Math.min(parsed - 1, images.length - 1)) : undefined

  const handleLightboxChange = useCallback((index: number | null) => {
    if (index !== null) {
      router.replace(`${pathname}?photo=${index + 1}`, { scroll: false })
    } else {
      router.replace(pathname, { scroll: false })
    }
  }, [router, pathname])

  return (
    <ImageLightbox
      images={images}
      alt={alt}
      initialIndex={initialIndex}
      onLightboxChange={handleLightboxChange}
    />
  )
}
