import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { RhineLabRow } from '../src/client/RhineLabRow.tsx'

const renderedCopy = {
  'rhine.title': '莱茵生命深度界面',
  'rhine.desc': '将 Harness 重组为莱茵生命内部研究终端',
  'rhine.on': '授权',
  'rhine.off': '停用',
} as const

describe('RhineLabRow', () => {
  it('renders localized settings controls and writes the unchanged enabled preference', () => {
    const setEnabled = vi.fn()
    const useStore = <T,>(select: (state: { enabled: boolean }) => T): T => select({ enabled: true })

    render(
      <RhineLabRow
        t={key => renderedCopy[key]}
        setEnabled={setEnabled}
        useStore={useStore}
      />,
    )

    expect(screen.getByText(renderedCopy['rhine.title'])).toBeTruthy()
    expect(screen.getByText(renderedCopy['rhine.desc'])).toBeTruthy()
    expect(screen.getByRole('button', { name: renderedCopy['rhine.on'] }).getAttribute('aria-pressed')).toBe('true')
    fireEvent.click(screen.getByRole('button', { name: renderedCopy['rhine.off'] }))
    expect(setEnabled).toHaveBeenCalledWith(false)
  })
})
