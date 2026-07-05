'use client'

import { useEffect, useRef, useState } from 'react'
import { Bot, CalendarCheck, RotateCcw } from 'lucide-react'
import { track } from './track'

interface Msg {
  from: 'customer' | 'ai'
  text: string
}

const SCRIPT: Msg[] = [
  { from: 'customer', text: 'Hi, available po ba for haircut tomorrow afternoon?' },
  { from: 'ai', text: 'Yes! We have available appointments at 2:00 PM, 3:30 PM, and 5:00 PM.' },
  { from: 'customer', text: '3:30 na lang.' },
  { from: 'ai', text: "You're booked for tomorrow at 3:30 PM. See you then!" },
]

export default function AiDemo() {
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)
  const started = useRef(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)

  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function play() {
    if (reduceMotion) {
      setShown(SCRIPT.length)
      setDone(true)
      return
    }
    setShown(0)
    setDone(false)
    let i = 0
    const next = () => {
      if (i >= SCRIPT.length) {
        setTyping(false)
        setDone(true)
        return
      }
      const isAi = SCRIPT[i].from === 'ai'
      setTyping(isAi)
      window.setTimeout(
        () => {
          setTyping(false)
          i += 1
          setShown(i)
          window.setTimeout(next, 700)
        },
        isAi ? 1100 : 400
      )
    }
    next()
  }

  // Start when scrolled into view, once.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true
          play()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={rootRef}>
      <div className="as-glass-strong rounded-2xl p-4 sm:p-5">
        <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
            <Bot className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Salon Messenger inbox</p>
            <p className="text-xs text-emerald-300">AI Receptionist · replies instantly</p>
          </div>
        </div>

        <div className="flex min-h-[220px] flex-col justify-end gap-2" aria-live="polite">
          {SCRIPT.slice(0, shown).map((m, idx) => (
            <p
              key={idx}
              className={
                m.from === 'customer'
                  ? 'ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-emerald-500 px-3.5 py-2 text-sm text-slate-950'
                  : 'mr-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2 text-sm text-slate-100'
              }
            >
              {m.text}
            </p>
          ))}
          {typing && (
            <p className="as-typing mr-auto rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2.5 text-slate-300">
              <span /><span /><span />
            </p>
          )}
        </div>

        {done && (
          <div className="as-appt-pop-none mt-3 rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-2">
            <p className="text-xs text-amber-200">
              <CalendarCheck className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
              Added to your dashboard: <strong>Haircut · Tomorrow 3:30 PM</strong>
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (!tracked.current) {
            tracked.current = true
          }
          track('ai_demo_interacted', {})
          play()
        }}
        className="mt-3 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:text-white as-glass focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <RotateCcw className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" aria-hidden />
        Replay conversation
      </button>
    </div>
  )
}
