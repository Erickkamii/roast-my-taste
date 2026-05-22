'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { SpotifyTrack } from '@/lib/types'
import { formatDuration } from '@/lib/api'
import { Music, ExternalLink } from 'lucide-react'

interface TrackListProps {
  tracks: SpotifyTrack[]
  title: string
  isLoading?: boolean
}

export function TrackList({ tracks, title, isLoading }: TrackListProps) {
  if (isLoading) {
    return (
      <Card className="border-border/40 bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Music className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-6 animate-pulse rounded bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/40 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Music className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
              >
                <span className="w-6 text-center text-sm text-muted-foreground">
                  {index + 1}
                </span>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-medium text-foreground group-hover:text-primary">
                    {track.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {track.artists.map((a) => a.name).join(', ')}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDuration(track.duration_ms)}
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
