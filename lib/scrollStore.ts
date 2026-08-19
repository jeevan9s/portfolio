import { create } from 'zustand'

type Section = 'hero' | 'work' | 'about' | 'connect' | 'end'
export const useScrollStore = create<{ section: Section; setSection: (s: Section) => void }>(
  (set) => ({ section: 'hero', setSection: (s) => set({ section: s }) })
)