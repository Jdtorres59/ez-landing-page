'use client'
import { useState, useEffect } from 'react'

export function useWaitlistCount() {
  const [count, setCount] = useState<number>(847)

  useEffect(() => {
    fetch('/api/waitlist')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(() => {})
  }, [])

  return count
}
