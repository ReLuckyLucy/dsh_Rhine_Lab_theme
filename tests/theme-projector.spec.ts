import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createThemeProjector,
  SKIN_ATTRIBUTE,
} from '../src/client/theme-projector.ts'
import { SKIN_ATTRIBUTE as CLIENT_SKIN_ATTRIBUTE } from '../src/client/index.ts'

describe('Rhine Lab theme projector', () => {
  afterEach(() => {
    document.documentElement.removeAttribute(SKIN_ATTRIBUTE)
    document.body.removeAttribute(SKIN_ATTRIBUTE)
  })

  it('installs once, retracts once, and owns both attributes', () => {
    const retract = vi.fn()
    const install = vi.fn(() => retract)
    const projection = createThemeProjector(install, document)

    projection.setEnabled(true)
    projection.setEnabled(true)
    expect(install).toHaveBeenCalledTimes(1)
    expect(document.documentElement.hasAttribute(SKIN_ATTRIBUTE)).toBe(true)
    expect(document.body.hasAttribute(SKIN_ATTRIBUTE)).toBe(true)

    projection.setEnabled(false)
    projection.setEnabled(false)
    expect(retract).toHaveBeenCalledTimes(1)
    expect(document.documentElement.hasAttribute(SKIN_ATTRIBUTE)).toBe(false)
    expect(document.body.hasAttribute(SKIN_ATTRIBUTE)).toBe(false)
  })

  it('disposes an enabled projection idempotently', () => {
    const retract = vi.fn()
    const projection = createThemeProjector(() => retract, document)
    projection.setEnabled(true)
    projection.dispose()
    projection.dispose()
    expect(retract).toHaveBeenCalledTimes(1)
  })

  it('exports the skin attribute from the public client entry', () => {
    expect(CLIENT_SKIN_ATTRIBUTE).toBe('data-rhine-lab-theme')
  })
})
