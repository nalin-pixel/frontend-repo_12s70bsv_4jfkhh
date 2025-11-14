import React, { useEffect, useMemo, useRef, useState } from 'react'

function Navbar() {
  const links = [
    { name: 'Home', href: '#' },
    { name: 'Collection', href: '#' },
    { name: 'New Arrivals', href: '#' },
    { name: 'Contact', href: '#' },
  ]
  return (
    <header className="w-full sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-b-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="text-xl sm:text-2xl tracking-tight font-semibold text-stone-800">Boutique</div>
        <nav className="hidden sm:flex items-center gap-6 text-stone-700">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              className="relative text-sm font-medium hover:text-stone-900 transition-colors"
            >
              <span>{l.name}</span>
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-stone-900 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

const IMAGES = [
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542060748-10c28b62716e?q=80&w=1400&auto=format&fit=crop',
]

export default function App() {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timeoutRef = useRef(null)

  const activeImage = useMemo(() => IMAGES[active], [active])
  const prevImage = useMemo(() => IMAGES[prev], [prev])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const triggerTransition = (nextIndex) => {
    if (animating || nextIndex === active) return
    setPrev(active)
    setActive(nextIndex)
    setAnimating(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAnimating(false), 400)
  }

  const cycleNext = () => {
    const next = (active + 1) % IMAGES.length
    triggerTransition(next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f2] to-[#f5efe7] text-stone-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 md:gap-10 items-stretch">
            {/* Left: Main showcase */}
            <section className="relative rounded-2xl bg-white shadow-sm ring-1 ring-stone-100 overflow-hidden flex items-center justify-center min-h-[56vh]">
              {/* Decorative subtle gradient blob */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(214,181,141,0.10),transparent_60%)]" />

              {/* Previous image (fade out) */}
              <img
                key={`prev-${prev}`}
                src={prevImage}
                alt="Previous"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                  animating ? 'opacity-0 scale-[1.02] translate-y-1' : 'opacity-0'
                }`}
                aria-hidden
              />

              {/* Current image (fade in) */}
              <img
                key={`active-${active}`}
                src={activeImage}
                alt="Selected clothing"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                  animating ? 'opacity-100 scale-100 translate-y-0' : 'opacity-100'
                }`}
              />

              {/* Center premium circular button */}
              <button
                onClick={cycleNext}
                aria-label="Next item"
                className="relative z-10 group inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-stone-50 to-stone-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-white/60 border border-white/50 backdrop-blur hover:shadow-[0_14px_40px_rgba(214,181,141,0.35)] transition-all duration-300"
              >
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-200/0 via-amber-200/30 to-amber-200/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative text-stone-700 group-hover:text-stone-900 transition-colors"
                >
                  <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </section>

            {/* Right: Vertical panel with thumbnails */}
            <aside className="rounded-2xl bg-white/80 ring-1 ring-stone-100 p-3 sm:p-4 backdrop-blur shadow-sm">
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3 md:gap-4 content-start max-h-[60vh] md:max-h-none overflow-y-auto pr-1">
                {IMAGES.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => triggerTransition(idx)}
                    className={`group relative overflow-hidden rounded-xl shadow-sm ring-1 ring-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 transition ${
                      active === idx ? 'ring-2 ring-amber-300 shadow-md' : ''
                    }`}
                    aria-label={`Select image ${idx + 1}`}
                  >
                    <img
                      src={src}
                      alt={`Clothing ${idx + 1}`}
                      className="w-full h-24 md:h-28 lg:h-32 object-cover transform transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                    {/* subtle overlay on hover */}
                    <span className="pointer-events-none absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/0" />
                  </button>
                ))}
              </div>
            </aside>
          </div>

          {/* Below content for spacing on mobile */}
          <div className="mt-6 text-center text-stone-600 text-sm">
            Click the circular button to browse styles, or tap a look on the right.
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-stone-500">© {new Date().getFullYear()} Boutique — All rights reserved.</footer>
    </div>
  )
}
