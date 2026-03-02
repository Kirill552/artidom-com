import { NextResponse } from 'next/server'
import { sendToTelegram } from '@/lib/telegram'
import { checkContactRateLimit, validateContactPayload } from '@/lib/contact-guard'

function getClientIp(request: Request): string {
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp

  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim()
    if (firstIp) return firstIp
  }

  return 'unknown'
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const limit = checkContactRateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'rate_limit' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  let fields: Record<string, string>
  try {
    const formData = await request.formData()
    fields = {} as Record<string, string>
    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        fields[key] = value
      }
    }
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const validation = validateContactPayload(fields)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  if (validation.data.isSpam) {
    return NextResponse.json({ ok: true })
  }

  const sent = await sendToTelegram(validation.data)
  if (!sent) {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
