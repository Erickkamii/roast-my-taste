'use client'

import Link from 'next/link'
import { SpotifyLogo } from './spotify-logo'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SPOTIFY_LOGIN_URL } from '@/lib/backend'
import type { SpotifyUser } from '@/lib/types'

interface HeaderProps {
  user: SpotifyUser | null
  isLoading?: boolean
}

export function Header({ user, isLoading }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-colors hover:opacity-80">
          <SpotifyLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">
            Roast <span className="text-primary">My Taste</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user.display_name}
              </span>
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={user.images?.[0]?.url} alt={user.display_name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {user.display_name?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button asChild variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={SPOTIFY_LOGIN_URL}>
                Entrar com Spotify
              </a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}
