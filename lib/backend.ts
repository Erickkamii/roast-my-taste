const DEFAULT_BACKEND_URL = 'http://127.0.0.1:8080'

export const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL
).replace(/\/$/, '')

export function backendUrl(path: string): string {
  return `${BACKEND_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const SPOTIFY_LOGIN_URL = backendUrl('/oauth2/authorization/spotify')
