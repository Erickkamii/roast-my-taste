import Image from 'next/image'

export function SpotifyLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <Image
      src="/roaster_icon.png"
      alt="Roast My Taste"
      width={96}
      height={96}
      unoptimized
      className={className}
    />
  )
}
