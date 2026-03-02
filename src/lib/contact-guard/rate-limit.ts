interface RateLimitState {
  windowStart: number
  requests: number
  blockedUntil: number
}

interface RateLimitResult {
  allowed: boolean
  retryAfterSeconds: number
}

const REQUEST_WINDOW_MS = 10 * 60 * 1000
const BLOCK_TIME_MS = 20 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

const storage = new Map<string, RateLimitState>()

function cleanup(now: number): void {
  for (const [key, state] of storage.entries()) {
    const inactive = now - state.windowStart > REQUEST_WINDOW_MS * 3
    const blockExpired = state.blockedUntil > 0 && state.blockedUntil <= now
    if (inactive || blockExpired) {
      storage.delete(key)
    }
  }
}

export function checkContactRateLimit(key: string, now = Date.now()): RateLimitResult {
  cleanup(now)

  const safeKey = key || 'unknown'
  const state = storage.get(safeKey)

  if (!state) {
    storage.set(safeKey, { windowStart: now, requests: 1, blockedUntil: 0 })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (state.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((state.blockedUntil - now) / 1000),
    }
  }

  if (now - state.windowStart > REQUEST_WINDOW_MS) {
    storage.set(safeKey, { windowStart: now, requests: 1, blockedUntil: 0 })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  state.requests += 1

  if (state.requests > MAX_REQUESTS_PER_WINDOW) {
    state.blockedUntil = now + BLOCK_TIME_MS
    storage.set(safeKey, state)
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil(BLOCK_TIME_MS / 1000),
    }
  }

  storage.set(safeKey, state)
  return { allowed: true, retryAfterSeconds: 0 }
}
