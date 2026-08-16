import { describe, expect, it } from 'vitest'
import { RHINE_TOKENS } from '../src/client/palette.ts'

function relativeLuminance(rgb: string): number {
  const channels = rgb.match(/[\d.]+/g)?.map(Number)
  if (channels?.length !== 3) throw new Error('Expected rgb() color, received ' + rgb)
  const [red, green, blue] = channels.map(channel => {
    const srgb = channel / 255
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrastRatio(first: string, second: string): number {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)]
    .sort((left, right) => right - left)
  return (lighter + 0.05) / (darker + 0.05)
}

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

  it('keeps primary-button foreground contrast at or above the previous theme', () => {
    const fill = RHINE_TOKENS['--dsw-alias-button-primary-fill']
    const foreground = RHINE_TOKENS['--dsw-alias-label-primary-foreground']

    for (const mode of ['light', 'dark'] as const) {
      expect(contrastRatio(fill[mode], foreground[mode])).toBeGreaterThanOrEqual(4.875)
    }
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
