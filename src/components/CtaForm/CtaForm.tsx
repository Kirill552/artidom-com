'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  className?: string
}

export default function CtaForm({ className }: Props) {
  const t = useTranslations('Index')
  const tContact = useTranslations('Contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate_limit'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      if (res.status === 429) {
        setStatus('rate_limit')
        return
      }
      if (!res.ok) {
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={className}>
        <p>{tContact('success')}</p>
      </div>
    )
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      <input name="name" placeholder={t('cta.name')} required />
      <input name="phone" type="tel" placeholder={t('cta.phone')} />
      <input name="email" type="email" placeholder={t('cta.email')} />
      <input name="company" placeholder={t('cta.company')} />
      <textarea name="message" placeholder={t('cta.message')} rows={4} required />
      <input name="website" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <button type="submit" disabled={status === 'loading'}>
        {t('cta.submit')}
      </button>
      {status === 'rate_limit' && <p>{tContact('error_rate_limit')}</p>}
      {status === 'error' && <p>{tContact('error_generic')}</p>}
    </form>
  )
}
