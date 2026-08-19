'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sections } from '@/lib/sections'

gsap.registerPlugin(ScrollTrigger)

export default function BackgroundLayer() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      sections.slice(1).forEach((section) => {
        const target = document.getElementById(section.id)
        if (!target) return

        gsap.to(el, {
          backgroundColor: `#${section.bgColor}`, 
          ease: 'none',
          scrollTrigger: {
            trigger: target,
            start: 'top center', 
            end: 'bottom center',
            scrub: true,
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={bgRef}
      style={{ backgroundColor: `#${sections[0].bgColor}` }}
      className="fixed inset-0 -z-10 transition-colors"
    />
  )
}