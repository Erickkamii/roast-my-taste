import type { SpotifyUser, SpotifyTrack, SpotifyArtist, RoastData } from './types'

const fetchOptions: RequestInit = {
  credentials: 'include',
}

const API_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8080').replace(/\/$/, '')

async function fetchJson<T>(input: string): Promise<T> {
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 10000)
  try {
    const response = await fetch(input, {
      ...fetchOptions,
      redirect: 'manual',
      signal: controller.signal,
    })
    if (!response.ok && response.status !== 0) {
      throw new Error(`Falha na API: ${response.status}`)
    }
    if (response.type === 'opaqueredirect' || response.status === 0) {
      throw new Error('Não autenticado')
    }
    return response.json()
  } finally {
    window.clearTimeout(timeout)
  }
}

interface BackendAuthUser {
  name: string
  authorities?: Array<{
    authority?: string
    attributes?: {
      display_name?: string
      followers?: {
        total?: number
      }
      id?: string
      images?: Array<{
        url: string
      }>
    }
  }>
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
    followers: {
      total: 0,
    },
    external_urls: {
      spotify: spotifySearchUrl('artist', artist.name),
    },
  }
}

export async function fetchUserProfile(): Promise<SpotifyUser> {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const data = await fetchJson<BackendAuthUser>(`${API_URL}/api/v1/me`)
  const spotifyUser = data.authorities?.find((authority) => authority.attributes?.display_name)?.attributes

  return {
    id: spotifyUser?.id || data.name,
    display_name: spotifyUser?.display_name || data.name,
    images: spotifyUser?.images || [],
    followers: {
      total: spotifyUser?.followers?.total || 0,
    },
    country: '',
    product: '',
  }
}

export async function fetchTopTracks(_timeRange: string = 'medium_term', limit: number = 10): Promise<SpotifyTrack[]> {
  const data = await fetchJson<BackendTrack[]>(`${API_URL}/api/v1/debug/top-tracks`)
  return data.slice(0, limit).map(mapTrack)
}

export async function fetchTopArtists(_timeRange: string = 'medium_term', limit: number = 10): Promise<SpotifyArtist[]> {
  const data = await fetchJson<BackendArtist[]>(`${API_URL}/api/v1/debug/top-artists`)
  return data.slice(0, limit).map(mapArtist)
}

export async function generateRoast(): Promise<RoastData> {
  const data = await fetchJson<BackendRoast>(`${API_URL}/api/v1/analysis`)

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
