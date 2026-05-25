'use client'

import { useEffect } from 'react'
import { saveTokenFromUrl } from '@/lib/api'


export function TokenCapture() {
  useEffect(() => {
    saveTokenFromUrl()
  }, [])

  return null
}