'use client'

import { useEffect, useRef } from 'react'
import { useScrollStore } from '@/lib/scrollStore'

export function useSectionInView(id: 'hero' | 'work' | 'about' | 'connect' | 'end') {
  const ref = useRef<HTMLDivElement>(null)
  const setSection = useScrollStore((s) => s.setSection)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSection(id) 
        }
      },
      { threshold: 0.4 } 
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [id, setSection])

  return ref
}