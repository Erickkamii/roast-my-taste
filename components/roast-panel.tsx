'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { RoastData } from '@/lib/types'
import { Flame, RefreshCw } from 'lucide-react'

interface RoastPanelProps {
  roast: RoastData | null
  isLoading: boolean
  onRefresh: () => void
}

export function RoastPanel({ roast, isLoading, onRefresh }: RoastPanelProps) {
  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'leve':
        return 'text-yellow-500'
      case 'medio':
        return 'text-orange-500'
      case 'pesado':
        return 'text-red-500'
      default:
        return 'text-primary'
    }
  }

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case 'leve':
        return 'Roast Leve'
      case 'medio':
        return 'Roast Medio'
      case 'pesado':
        return 'Roast Pesado'
      default:
        return 'Roast'
    }
  }

  return (
    <Card className="roast-card relative overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-3xl" />
      <CardContent className="relative p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className={`h-6 w-6 ${roast ? getIntensityColor(roast.intensity) : 'text-primary'}`} />
            <h2 className="text-lg font-semibold">
              {roast ? getIntensityLabel(roast.intensity) : 'Seu Roast'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Novo Roast
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
          </div>
        ) : roast ? (
          <div className="space-y-4">
            <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              &ldquo;{roast.message}&rdquo;
            </p>
            <div className="flex flex-wrap gap-2">
              {roast.category && (
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {roast.category}
                </span>
              )}
              {typeof roast.chaosScore === 'number' && (
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  Caos {roast.chaosScore}/100
                </span>
              )}
              {roast.tags?.map((tag) => (
                <span key={tag} className="inline-block rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            {roast.diagnosis && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {roast.diagnosis}
              </p>
            )}
            {roast.recommendation && (
              <p className="rounded-lg border border-border/40 bg-secondary/40 p-3 text-sm leading-relaxed text-foreground">
                {roast.recommendation}
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            Clique em &quot;Novo Roast&quot; para gerar uma critica do seu gosto musical
          </p>
        )}
      </CardContent>
    </Card>
  )
}
