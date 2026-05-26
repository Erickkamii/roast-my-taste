import type { SpotifyUser, SpotifyTrack, SpotifyArtist, RoastData } from './types'

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8080').replace(/\/$/, '')

const fetchOptions: RequestInit = {
  credentials: 'include',
}

export async function fetchJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`)
  }

  return response.json()
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('jwt')
}

export function saveTokenFromUrl() {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')

  if (token) {
    localStorage.setItem('jwt', token)
    // Remove o token da URL
    url.searchParams.delete('token')
    window.history.replaceState({}, '', url.toString())
  }
}

export function logout() {
  localStorage.removeItem('jwt')
  window.location.href = '/'
}

interface BackendTrack {
  id: string
  name: string
  artistsNames?: string[]
  duration: number
}

interface BackendArtist {
  id: string
  name: string
  genres?: string[]
}

interface BackendRoast {
  title: string
  musicalDiagnosis: string
  roast: string
  recommendation: string
  chaosScore: number
  personalityTags: string[]
}

function spotifySearchUrl(type: 'track' | 'artist', query: string): string {
  return `https://open.spotify.com/search/${type === 'track' ? '' : 'artist:'}${encodeURIComponent(query)}`
}

function mapTrack(track: BackendTrack): SpotifyTrack {
  return {
    id: track.id,
    name: track.name,
    artists: (track.artistsNames || []).map((name) => ({ name })),
    album: {
      name: '',
      images: [],
    },
    duration_ms: track.duration,
    external_urls: {
      spotify: spotifySearchUrl('track', track.name),
    },
  }
}

function mapArtist(artist: BackendArtist): SpotifyArtist {
  return {
    id: artist.id,
    name: artist.name,
    images: [],
    genres: artist.genres || [],
    followers: { total: 0 },
    external_urls: {
      spotify: spotifySearchUrl('artist', artist.name),
    },
  }
}

// ============================================
// API Functions
// ============================================

export async function fetchUserProfile(): Promise<SpotifyUser> {
  const data = await fetchJson<any>('/api/v1/me')

  const spotifyAttributes = data.authorities?.find(
    (auth: any) => auth.attributes?.display_name
  )?.attributes

  return {
    id: data.name,                                   
    display_name: spotifyAttributes?.display_name || data.name,
    images: spotifyAttributes?.images || [],
    followers: spotifyAttributes?.followers || { total: 0 },
    country: '',
    product: '',
  }
}

export async function fetchTopTracks(_timeRange: string = 'medium_term', limit: number = 10): Promise<SpotifyTrack[]> {
  const data = await fetchJson<BackendTrack[]>('/api/v1/debug/top-tracks')
  return data.slice(0, limit).map(mapTrack)
}

export async function fetchTopArtists(_timeRange: string = 'medium_term', limit: number = 10): Promise<SpotifyArtist[]> {
  const data = await fetchJson<BackendArtist[]>('/api/v1/debug/top-artists')
  return data.slice(0, limit).map(mapArtist)
}

export async function generateRoast(): Promise<RoastData> {
  const data = await fetchJson<BackendRoast>('/api/v1/analysis')

  return {
    message: data.roast,
    intensity: data.chaosScore >= 75 ? 'pesado' : data.chaosScore >= 40 ? 'medio' : 'leve',
    category: data.title || data.musicalDiagnosis,
    diagnosis: data.musicalDiagnosis,
    recommendation: data.recommendation,
    chaosScore: data.chaosScore,
    tags: data.personalityTags,
  }
}

export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}