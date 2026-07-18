'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { CatalogItem, CatalogCategory } from '@/lib/catalog'
import { getCatalogImageAlt, getCatalogLocaleValue } from '@/lib/catalog'
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

      <section className={styles.grid}>
        {filtered.map((item, i) => {
          const name = getCatalogLocaleValue(item.name, locale)
          const leadTime = getCatalogLocaleValue(item.leadTime, locale)

          return (
            <Link key={item.slug} href={`/catalog/${item.slug}`} className={styles.card}>
              <span className={styles.frame}>
                <Image
                  src={item.coverImage}
                  alt={getCatalogImageAlt(item, locale, 0)}
                  fill
                  className={styles.image}
                  sizes={i === 0
                    ? '(max-width: 600px) 100vw, (max-width: 900px) 100vw, 66vw'
                    : '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw'}
                />
              </span>
              <span className={styles.cap}>
                <span className={styles.cardName}>{name}</span>
                <span className={styles.cardMeta}>
                  {categories[item.category]} · {leadTime}
                </span>
                <span className={styles.cardCta}>{cardCta}</span>
              </span>
            </Link>
          )
        })}
      </section>
    </>
  )
}
