'use client'

import { useState, useEffect, useCallback } from 'react'
import { Dashboard } from '@/components/dashboard'
import type { SpotifyUser, SpotifyTrack, SpotifyArtist, RoastData } from '@/lib/types'
import {
  fetchUserProfile,
  fetchTopTracks,
  fetchTopArtists,
  generateRoast,
} from '@/lib/api'

export default function HomePage() {
  const [user, setUser] = useState<SpotifyUser | null>(null)
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([])
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([])
  const [roast, setRoast] = useState<RoastData | null>(null)

  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoadingTracks, setIsLoadingTracks] = useState(true)
  const [isLoadingArtists, setIsLoadingArtists] = useState(true)
  const [isLoadingRoast, setIsLoadingRoast] = useState(false)

  const fallbackRoast: RoastData = {
    message: 'Seu gosto musical e tao confuso que ate o algoritmo do Spotify desistiu de te entender.',
    intensity: 'medio',
    category: 'Gosto Eclético',
  }

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserProfile()
        setUser(userData)

        setIsLoadingRoast(true)
        const [tracks, artists, initialRoast] = await Promise.allSettled([
          fetchTopTracks('medium_term', 20),
          fetchTopArtists('medium_term', 20),
          generateRoast(),
        ])

        if (tracks.status === 'fulfilled') {
          setTopTracks(tracks.value)
        }
        if (artists.status === 'fulfilled') {
          setTopArtists(artists.value)
        }
        setRoast(initialRoast.status === 'fulfilled' ? initialRoast.value : fallbackRoast)

        setIsLoadingTracks(false)
        setIsLoadingArtists(false)
      } catch {
        // User is not authenticated - this is expected
        setUser(null)
      } finally {
        setIsLoadingUser(false)
        setIsLoadingTracks(false)
        setIsLoadingArtists(false)
        setIsLoadingRoast(false)
      }
    }

    loadUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRefreshRoast = useCallback(async () => {
    setIsLoadingRoast(true)
    try {
      const newRoast = await generateRoast()
      setRoast(newRoast)
    } catch {
      setRoast(fallbackRoast)
    } finally {
      setIsLoadingRoast(false)
    }
  }, [])

  return (
    <Dashboard
      user={user}
      topTracks={topTracks}
      topArtists={topArtists}
      roast={roast}
      isLoadingUser={isLoadingUser}
      isLoadingTracks={isLoadingTracks}
      isLoadingArtists={isLoadingArtists}
      isLoadingRoast={isLoadingRoast}
      onRefreshRoast={handleRefreshRoast}
    />
  )
}
