'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'

const FADE_DURATION_MS = 320
const HERO_HEIGHT_TRANSITION_MS = 280
const FADE_IN_DURATION_MS = 520
const HERO_HEIGHT_ANIMATING_ATTR = 'data-hero-height-animating'
const HERO_HEIGHT_ANIMATION_END_EVENT = 'hero-height-animation-end'

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const timersRef = useRef<number[]>([])
  const rafRef = useRef<number | null>(null)
  const heroRafRef = useRef<number | null>(null)
  const pendingHeroHeightRef = useRef<number | null>(null)
  const hasMountedRef = useRef(false)

  const setHeroHeightAnimating = (isAnimating: boolean) => {
    const root = document.documentElement
    if (isAnimating) {
      root.setAttribute(HERO_HEIGHT_ANIMATING_ATTR, 'true')
      return
    }
    const wasAnimating = root.getAttribute(HERO_HEIGHT_ANIMATING_ATTR) === 'true'
    root.removeAttribute(HERO_HEIGHT_ANIMATING_ATTR)
    if (wasAnimating) {
      window.dispatchEvent(new Event(HERO_HEIGHT_ANIMATION_END_EVENT))
    }
  }

  const parseDurationMs = (value: string): number => {
    const trimmed = value.trim()
    if (!trimmed) return 0
    if (trimmed.endsWith('ms')) {
      const parsedMs = Number.parseFloat(trimmed.slice(0, -2))
      return Number.isFinite(parsedMs) ? Math.max(0, parsedMs) : 0
    }
    if (trimmed.endsWith('s')) {
      const parsedS = Number.parseFloat(trimmed.slice(0, -1))
      return Number.isFinite(parsedS) ? Math.max(0, parsedS * 1000) : 0
    }
    const parsed = Number.parseFloat(trimmed)
    return Number.isFinite(parsed) ? Math.max(0, parsed) : 0
  }

  const runEnterAnimation = (content: HTMLDivElement | null) => {
    if (!content) return

    content.style.removeProperty('--page-transition-duration')
    content.classList.remove('page-transition-leave', 'page-transition-enter', 'page-transition-enter-start')
    content.classList.add('page-transition-enter-start')
    // Force start state to be committed first.
    content.getBoundingClientRect()
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = window.requestAnimationFrame(() => {
        content.classList.remove('page-transition-enter-start')
        content.classList.add('page-transition-enter')
      })
    })
    timersRef.current.push(
      window.setTimeout(() => {
        content.classList.remove('page-transition-enter')
      }, FADE_IN_DURATION_MS),
    )
  }

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (heroRafRef.current !== null) {
      window.cancelAnimationFrame(heroRafRef.current)
      heroRafRef.current = null
    }
    setHeroHeightAnimating(false)
  }

  const getSkippedHero = () => {
    const content = contentRef.current
    if (!content) return null
    return content.querySelector('[data-transition-skip="true"]') as HTMLElement | null
  }

  const animateHeroHeightIfNeeded = () => {
    const hero = getSkippedHero()
    const previousHeight = pendingHeroHeightRef.current
    pendingHeroHeightRef.current = null
    if (!hero || !previousHeight) {
      setHeroHeightAnimating(false)
      return
    }

    const nextHeight = hero.getBoundingClientRect().height
    if (Math.abs(nextHeight - previousHeight) < 1) {
      setHeroHeightAnimating(false)
      return
    }

    hero.style.overflow = 'hidden'
    hero.style.height = `${previousHeight}px`
    hero.style.transition = 'none'
    // Force style flush before starting the transition.
    hero.getBoundingClientRect()
    setHeroHeightAnimating(true)

    heroRafRef.current = window.requestAnimationFrame(() => {
      hero.style.transition = `height ${HERO_HEIGHT_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
      hero.style.height = `${nextHeight}px`
      timersRef.current.push(
        window.setTimeout(() => {
          hero.style.removeProperty('height')
          hero.style.removeProperty('overflow')
          hero.style.removeProperty('transition')
          setHeroHeightAnimating(false)
        }, HERO_HEIGHT_TRANSITION_MS),
      )
    })
  }

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as Element | null
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== '_self') return
      if (anchor.hasAttribute('download')) return

      const nextUrl = new URL(anchor.href, window.location.href)
      if (nextUrl.origin !== window.location.origin) return

      const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
      const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
      if (nextPath === currentPath) return

      // In-page anchor jumps should not run route transition.
      if (
        nextUrl.pathname === window.location.pathname &&
        nextUrl.search === window.location.search &&
        nextUrl.hash.length > 0
      ) {
        return
      }

      const currentHero = getSkippedHero()
      pendingHeroHeightRef.current = currentHero ? currentHero.getBoundingClientRect().height : null

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        event.preventDefault()
        router.push(nextPath)
        return
      }

      event.preventDefault()
      clearTimers()
      const content = contentRef.current
      content?.classList.remove('page-transition-enter-start', 'page-transition-enter')
      content?.classList.add('page-transition-leave')
      const heading = content?.querySelector('.hero-heading') as HTMLElement | null
      const headingLeaveDurationMs = heading
        ? parseDurationMs(getComputedStyle(heading).getPropertyValue('--hero-word-leave-total-ms'))
        : 0
      const leaveDelayMs = Math.max(FADE_DURATION_MS, headingLeaveDurationMs)
      content?.style.setProperty('--page-transition-duration', `${leaveDelayMs}ms`)
      timersRef.current.push(window.setTimeout(() => router.push(nextPath), leaveDelayMs))
    }

    document.addEventListener('click', onDocumentClick, true)
    return () => {
      document.removeEventListener('click', onDocumentClick, true)
    }
  }, [router, pathname])

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const content = contentRef.current
    clearTimers()

    // Run the same fade-in on initial load and route navigations.
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      runEnterAnimation(content)
      return clearTimers
    }

    animateHeroHeightIfNeeded()

    runEnterAnimation(content)

    return clearTimers
  }, [pathname])

  const pageTransitionClassName = 'page-transition page-transition-bg-primary'

  return (
    <div ref={contentRef} className={pageTransitionClassName} data-transition-region="content">
      {children}
    </div>
  )
}
