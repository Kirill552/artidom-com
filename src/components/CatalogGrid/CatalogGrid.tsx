'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { CatalogItem, CatalogCategory } from '@/lib/catalog'
import { getCatalogLocaleValue } from '@/lib/catalog'
import styles from './CatalogGrid.module.css'

type FilterKey = 'all' | CatalogCategory

interface Props {
  items: CatalogItem[]
  locale: string
  tabs: Record<FilterKey, string>
  categories: Record<CatalogCategory, string>
  cardCta: string
}

export default function CatalogGrid({ items, locale, tabs, categories, cardCta }: Props) {
  const [active, setActive] = useState<FilterKey>('all')

  const filtered = active === 'all'
    ? items
    : items.filter((item) => item.category === active)

  return (
    <>
      <div className={styles.tabs}>
        {(['all', 'kitchens', 'storage', 'bespoke'] as const).map((key) => (
          <button
            key={key}
            className={`${styles.tab} ${active === key ? styles.tabActive : ''}`}
            onClick={() => setActive(key)}
          >
            {tabs[key]}
          </button>
        ))}
      </div>

      <section className={`container ${styles.grid}`}>
        {filtered.map((item) => {
          const name = getCatalogLocaleValue(item.name, locale)
          const leadTime = getCatalogLocaleValue(item.leadTime, locale)

          return (
            <Link key={item.slug} href={`/catalog/${item.slug}`} className={styles.card}>
              <div className={styles.cardImage}>
                <Image
                  src={item.coverImage}
                  alt={name}
                  fill
                  className={styles.image}
                  sizes="(max-width: 900px) 100vw, (max-width: 1400px) 50vw, 33vw"
                />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{name}</span>
                <span className={styles.cardMeta}>
                  {categories[item.category]} · {leadTime}
                </span>
                <span className={styles.cardCta}>{cardCta}</span>
              </div>
            </Link>
          )
        })}
      </section>
    </>
  )
}
