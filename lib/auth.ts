'use client'

export function saveTokenFromUrl() {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  const token = url.searchParams.get('token')

  if (token) {
    localStorage.setItem('jwt', token)
    url.searchParams.delete('token')
    window.history.replaceState({}, '', url.toString())
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('jwt')
}

export function logout() {
  localStorage.removeItem('jwt')
  window.location.href = '/'
}