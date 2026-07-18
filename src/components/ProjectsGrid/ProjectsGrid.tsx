'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import styles from './ProjectsGrid.module.css'

type CountryFilter = 'all' | 'ME' | 'RU'

export interface ProjectsGridItem {
  slug: string
  country: 'ME' | 'RU'
  title: string
  location: string
  year: number
  coverImage: string
  alt: string
}

interface Props {
  items: ProjectsGridItem[]
  labels: { all: string; montenegro: string; russia: string }
  locale: string
}

export default function ProjectsGrid({ items, labels }: Props) {
  const [active, setActive] = useState<CountryFilter>('all')

  const filtered = active === 'all'
    ? items
    : items.filter((item) => item.country === active)

  const tabs: Array<{ key: CountryFilter; label: string }> = [
    { key: 'all', label: labels.all },
    { key: 'ME', label: labels.montenegro },
    { key: 'RU', label: labels.russia },
  ]

  return (
    <>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tab} ${active === tab.key ? styles.tabActive : ''}`}
            onClick={() => setActive(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((item) => (
          <Link key={item.slug} href={`/projects/${item.slug}`} className={styles.card}>
            <span className={styles.frame}>
              <Image
                src={item.coverImage}
                alt={item.alt}
                fill
                className={styles.image}
                style={item.slug === 'warm-minimal-apartment' ? { viewTransitionName: 'featured-project' } : undefined}
                sizes="(max-width: 720px) 100vw, (max-width: 1023px) 50vw, 33vw"
              />
            </span>
            <span className={styles.cap}>
              <span className={styles.capTitle}>{item.title}</span>
              <span className={styles.capMeta}>{item.location} &middot; {item.year}</span>
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
