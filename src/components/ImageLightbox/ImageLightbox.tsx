'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import styles from './ImageLightbox.module.css'

interface Props {
  images: string[]
  alt: string
  mainClassName?: string
  thumbClassName?: string
  imageClassName?: string
  mainHeight?: string
  thumbHeight?: string
}

export default function ImageLightbox({
  images,
  alt,
  mainClassName,
  thumbClassName,
  imageClassName,
  mainHeight = '550px',
  thumbHeight = '160px',
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0))
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxIndex, close, prev, next])

  const gallery = images.slice(1)

  return (
    <>
      <div className={styles.gallery}>
        <button
          className={`${mainClassName || ''} ${styles.mainBtn}`}
          style={{ height: mainHeight }}
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={images[0]}
            alt={alt}
            fill
            className={imageClassName}
            sizes="(max-width: 1100px) 100vw, 55vw"
          />
        </button>

        {gallery.length > 0 && (
          <div className={styles.thumbGrid}>
            {gallery.map((src, i) => (
              <button
                key={`thumb-${i}`}
                className={`${thumbClassName || ''} ${styles.thumbBtn}`}
                style={{ height: thumbHeight }}
                onClick={() => setLightboxIndex(i + 1)}
              >
                <Image
                  src={src}
                  alt={`${alt} ${i + 2}`}
                  fill
                  className={imageClassName}
                  sizes="(max-width: 1100px) 50vw, 20vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div className={styles.overlay} onClick={close}>
          <button className={styles.closeBtn} onClick={close}>×</button>

          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={(e) => { e.stopPropagation(); prev() }}
          >
            ‹
          </button>

          <div className={styles.lightboxImage} onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightboxIndex]}
              alt={`${alt} ${lightboxIndex + 1}`}
              fill
              className={styles.lightboxImg}
              sizes="95vw"
              priority
            />
          </div>

          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={(e) => { e.stopPropagation(); next() }}
          >
            ›
          </button>

          <div className={styles.counter}>
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}
