import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { RhineLabHud } from '../src/client/RhineLabHud.tsx'
import { registerRhineLabHud } from '../src/client/hud-registration.ts'

describe('RhineLabHud', () => {
  it('renders restrained decorative branding without controls', () => {
    const { container } = render(<RhineLabHud />)
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByText('RHINE LAB LLC.')).toBeTruthy()
    expect(screen.getByText('SYNTHESIZE INFORMATION ANALYSIS OS')).toBeTruthy()
    expect(container.querySelector('button, input, textarea, a')).toBeNull()
  })

  it('registers through shell.overlay and relays disposal', () => {
    const disposeEntry = vi.fn()
    const disposeInjection = vi.fn()
    const register = vi.fn(() => disposeEntry)
    const inject = vi.fn((_key: string, callback: () => () => void) => {
      const disposeActive = callback()
      return () => { disposeActive(); disposeInjection() }
    })
    const slots = { register, inject } as unknown as ClientContext['slots']

    const dispose = registerRhineLabHud(slots)
    expect(inject).toHaveBeenCalledWith('shell.overlay', expect.any(Function))
    expect(register).toHaveBeenCalledWith(
      { name: 'shell.overlay', id: 'rhine-lab-hud', order: -100 },
      RhineLabHud,
    )
    dispose()
    expect(disposeEntry).toHaveBeenCalledTimes(1)
    expect(disposeInjection).toHaveBeenCalledTimes(1)
  })
})
