import { NextRequest, NextResponse } from 'next/server'
import { backendUrl } from '@/lib/backend'

async function proxyToBackend(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params
  const target = new URL(backendUrl(`/api/${path.join('/')}`))
  target.search = request.nextUrl.search

  const response = await fetch(target, {
    headers: {
      cookie: request.headers.get('cookie') || '',
      accept: request.headers.get('accept') || 'application/json',
    },
    cache: 'no-store',
  })

  const body = await response.arrayBuffer()
  return new NextResponse(body, {
    status: response.status,
    headers: {
      'content-type': response.headers.get('content-type') || 'application/json',
    },
  })
}

export const GET = proxyToBackend
