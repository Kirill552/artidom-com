export interface ValidContactPayload {
  name: string
  phone: string
  email: string
  company: string
  projectType: string
  country: string
  message: string
  isSpam: boolean
}

type ValidationResult =
  | { ok: true; data: ValidContactPayload }
  | { ok: false; error: string }

const PHONE_PATTERN = /^\+?[\d\s()\-]{7,20}$/
const PHONE_MIN_DIGITS = 7
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 80
const MESSAGE_MAX_LENGTH = 1500

function sanitizeText(value: string, maxLength: number): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength)
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isPhoneValid(phone: string): boolean {
  if (!PHONE_PATTERN.test(phone)) return false
  const digitsCount = phone.replace(/\D/g, '').length
  return digitsCount >= PHONE_MIN_DIGITS
}

function isEmailValid(email: string): boolean {
  return EMAIL_PATTERN.test(email)
}

export function validateContactPayload(raw: Record<string, string>): ValidationResult {
  const honeypot = asString(raw.website)

  const name = sanitizeText(asString(raw.name), NAME_MAX_LENGTH)
  const phone = asString(raw.phone)
  const email = asString(raw.email)
  const company = sanitizeText(asString(raw.company), NAME_MAX_LENGTH)
  const projectType = asString(raw.projectType)
  const country = sanitizeText(asString(raw.country), NAME_MAX_LENGTH)
  const message = sanitizeText(asString(raw.message), MESSAGE_MAX_LENGTH)

  if (honeypot) {
    return {
      ok: true,
      data: { name, phone, email, company, projectType, country, message, isSpam: true },
    }
  }

  if (name.length < NAME_MIN_LENGTH) {
    return { ok: false, error: 'name' }
  }

  if (phone && !isPhoneValid(phone)) {
    return { ok: false, error: 'phone' }
  }

  if (email && !isEmailValid(email)) {
    return { ok: false, error: 'email' }
  }

  return {
    ok: true,
    data: { name, phone, email, company, projectType, country, message, isSpam: false },
  }
}
