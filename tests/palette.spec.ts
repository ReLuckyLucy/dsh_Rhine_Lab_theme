import { describe, expect, it } from 'vitest'
import { RHINE_TOKENS } from '../src/client/palette.ts'

describe('Rhine Lab palette', () => {
  it('provides a complete light and dark override pair at the theme boundary', () => {
    expect(Object.keys(RHINE_TOKENS).length).toBeGreaterThan(80)

    for (const pair of Object.values(RHINE_TOKENS)) {
      expect(pair).toEqual({
        light: expect.any(String),
        dark: expect.any(String),
      })
    }
  })

  it('projects archive paper, ink, and research-orange user interface roles', () => {
    expect(RHINE_TOKENS['--dsw-alias-bg-base']).toEqual({
      light: 'rgb(231, 229, 223)', dark: 'rgb(17, 21, 25)',
    })
    expect(RHINE_TOKENS['--dsw-alias-label-primary']).toEqual({
      light: 'rgb(9, 11, 13)', dark: 'rgb(231, 230, 223)',
    })
    expect(RHINE_TOKENS['--dsw-alias-brand-primary']).toEqual({
      light: 'rgb(242, 122, 34)', dark: 'rgb(255, 135, 50)',
    })
    expect(RHINE_TOKENS['--dsw-alias-button-primary-fill']).toEqual(
      RHINE_TOKENS['--dsw-alias-brand-primary'],
    )
  })

  it('projects cyan operating states and security-red failures', () => {
    expect(RHINE_TOKENS['--dsw-alias-feedback-positive']).toEqual({
      light: 'rgb(43, 159, 189)', dark: 'rgb(91, 194, 216)',
    })
    expect(RHINE_TOKENS['--dsw-alias-state-success-primary']).toEqual({
      light: 'rgb(43, 159, 189)', dark: 'rgb(91, 194, 216)',
    })
    expect(RHINE_TOKENS['--dsw-alias-state-error-primary']).toEqual({
      light: 'rgb(190, 54, 48)', dark: 'rgb(244, 100, 88)',
    })
  })
})
