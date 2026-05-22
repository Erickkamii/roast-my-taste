'use client'

import { Button } from '@/components/ui/button'
import { SpotifyLogo } from './spotify-logo'
import { SPOTIFY_LOGIN_URL } from '@/lib/backend'
import { ArrowRight, Music, Users, Flame } from 'lucide-react'

export function LoginScreen() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-[-18px] animate-pulse rounded-full bg-primary/45 blur-2xl" />
            <SpotifyLogo className="home-roast-icon relative h-28 w-28 text-primary sm:h-32 sm:w-32" />
          </div>
        </div>

        <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Roast <span className="text-primary">My Taste</span>
        </h1>

        <p className="mx-auto mb-8 max-w-md text-pretty text-lg text-muted-foreground">
          Conecte sua conta do Spotify e descubra o que seu gosto musical diz sobre voce.
          Prepare-se para receber um roast personalizado!
        </p>

        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border/40 bg-card p-4">
            <Music className="mx-auto mb-2 h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground">Top Tracks</h3>
            <p className="text-sm text-muted-foreground">Suas musicas mais ouvidas</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-4">
            <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground">Top Artistas</h3>
            <p className="text-sm text-muted-foreground">Seus artistas favoritos</p>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-4">
            <Flame className="mx-auto mb-2 h-8 w-8 text-primary" />
            <h3 className="font-semibold text-foreground">Roast</h3>
            <p className="text-sm text-muted-foreground">Critica do seu gosto</p>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <a href={SPOTIFY_LOGIN_URL} className="flex items-center gap-2">
            Entrar com Spotify
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Apenas lemos seus dados de streaming. Nao fazemos alteracoes na sua conta.
        </p>
      </div>
    </div>
  )
}
