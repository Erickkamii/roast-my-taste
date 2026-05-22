'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Header } from '@/components/header'
import { RoastPanel } from '@/components/roast-panel'
import { TrackList } from '@/components/track-list'
import { ArtistList } from '@/components/artist-list'
import { LoginScreen } from '@/components/login-screen'
import type { SpotifyUser, SpotifyTrack, SpotifyArtist, RoastData } from '@/lib/types'

interface DashboardProps {
  user: SpotifyUser | null
  topTracks: SpotifyTrack[]
  topArtists: SpotifyArtist[]
  roast: RoastData | null
  isLoadingUser: boolean
  isLoadingTracks: boolean
  isLoadingArtists: boolean
  isLoadingRoast: boolean
  onRefreshRoast: () => void
}

export function Dashboard({
  user,
  topTracks,
  topArtists,
  roast,
  isLoadingUser,
  isLoadingTracks,
  isLoadingArtists,
  isLoadingRoast,
  onRefreshRoast,
}: DashboardProps) {
  const isAuthenticated = !!user

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} isLoading={isLoadingUser} />

      {!isAuthenticated && !isLoadingUser ? (
        <LoginScreen />
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Ola, <span className="text-primary">{user?.display_name || 'Carregando...'}</span>!
            </h1>
            <p className="text-muted-foreground">
              Veja suas estatisticas do Spotify e descubra o que seu gosto musical revela sobre voce.
            </p>
          </div>

          <div className="mb-8">
            <RoastPanel
              roast={roast}
              isLoading={isLoadingRoast}
              onRefresh={onRefreshRoast}
            />
          </div>

          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="mb-6 grid w-full max-w-sm grid-cols-2 bg-secondary">
              <TabsTrigger value="tracks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Top Tracks
              </TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Top Artistas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tracks">
              <TrackList
                tracks={topTracks}
                title="Suas Musicas Mais Ouvidas"
                isLoading={isLoadingTracks}
              />
            </TabsContent>

            <TabsContent value="artists">
              <ArtistList
                artists={topArtists}
                title="Seus Artistas Favoritos"
                isLoading={isLoadingArtists}
              />
            </TabsContent>
          </Tabs>
        </main>
      )}
    </div>
  )
}
