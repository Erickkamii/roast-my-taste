export interface SpotifyUser {
  id: string
  display_name: string
  images: { url: string }[]
  followers: { total: number }
  country: string
  product: string
}

export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  duration_ms: number
  external_urls: { spotify: string }
}

export interface SpotifyArtist {
  id: string
  name: string
  images: { url: string }[]
  genres: string[]
  followers: { total: number }
  external_urls: { spotify: string }
}

export interface RoastData {
  message: string
  intensity: 'leve' | 'medio' | 'pesado'
  category: string
  diagnosis?: string
  recommendation?: string
  chaosScore?: number
  tags?: string[]
}

export interface UserStats {
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
}
