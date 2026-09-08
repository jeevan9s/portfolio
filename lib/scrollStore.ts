import { create } from 'zustand'

export const useScrollStore = create<{ section: string; setSection: (id: string) => void }>(
  (set) => ({
    section: 'hero',
    setSection: (id) => set((state) => (state.section === id ? state : { section: id })),
  })
)
