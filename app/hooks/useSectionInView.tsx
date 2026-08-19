'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollStore } from '@/lib/scrollStore'

gsap.registerPlugin(ScrollTrigger)

export function useSectionInView(id: string) {
  const ref = useRef<HTMLDivElement>(null)
  const setSection = useScrollStore((s) => s.setSection)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setSection(id),
        onEnterBack: () => setSection(id),
      })
    })

    return () => ctx.revert()
  }, [id, setSection])

  return ref
}