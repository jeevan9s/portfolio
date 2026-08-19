'use client'

import { useEffect, useRef } from 'react'
import { useScrollStore } from '@/lib/scrollStore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const setSection = useScrollStore((s) => s.setSection)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom center',
      onEnter: () => setSection(id),
      onEnterBack: () => setSection(id),
    })

    return () => st.kill()
  }, [id, setSection])

  return (
    <section id={id} ref={containerRef} className="min-h-screen relative">
      {children}
    </section>
  )
}