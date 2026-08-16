import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { transform } from 'lightningcss'
import { afterAll, describe, expect, it } from 'vitest'

const filename = resolve(process.cwd(), 'src/client/rhine.module.css')
const compiled = transform({
  filename,
  code: readFileSync(filename),
  cssModules: { pattern: '[hash]_[local]' },
  minify: true,
}).code.toString()

const style = document.createElement('style')
style.textContent = compiled
document.head.appendChild(style)

const sheet = style.sheet
if (sheet === null) throw new Error('Lightning CSS output did not produce a CSSOM stylesheet')

function flattenRules(rules: CSSRuleList): CSSRule[] {
  return Array.from(rules).flatMap(rule => {
    if ('cssRules' in rule) return [rule, ...flattenRules(rule.cssRules as CSSRuleList)]
    return [rule]
  })
}

const rules = flattenRules(sheet.cssRules)
const styleRules = rules.filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
const mediaRules = rules.filter((rule): rule is CSSMediaRule => 'conditionText' in rule)

function rulesTargeting(anchor: string): CSSStyleRule[] {
  return styleRules.filter(rule => rule.selectorText.includes(anchor))
}
function isThemeScoped(selector: string): boolean {
  const subject = selector.trim().split(/\s/, 1)[0]
  return subject.startsWith('body') && subject.includes('[data-rhine-lab-theme]')
}

function hasMaxWidth(px: number): boolean {
  const normalized = mediaRules.map(rule => rule.conditionText.replace(/\s/g, ''))
  return normalized.includes('(max-width:' + px + 'px)')
    || normalized.includes('(width<=' + px + 'px)')
}


afterAll(() => style.remove())

describe('compiled Rhine Lab reconstruction stylesheet', () => {
  it.each([
    '[data-shell-overlay]', '[data-phase]', '[data-conversation-scroll]',
    '[data-chat-flow]', '[data-chat-flow-kind]', '[data-composer-card]',
    '[data-input-scroll]', '[data-queue-dock]', '[data-approval-key]',
    '[data-variant][data-state]',
  ])('scopes stable Harness anchor %s to the enabled theme', anchor => {
    const matchingRules = rulesTargeting(anchor)
    expect(matchingRules.length).toBeGreaterThan(0)
    expect(matchingRules.every(rule =>
      rule.selectorText.split(',').every(isThemeScoped),
    )).toBe(true)
  })

  it('compiles the square archive frame and command deck treatments', () => {
    const frame = rulesTargeting(':has(>[data-shell-overlay])')
      .find(rule => rule.style.getPropertyValue('grid-template-columns') !== '')
    expect(frame?.style.getPropertyValue('display')).toBe('grid')
    expect(frame?.style.getPropertyValue('grid-template-columns')).toContain('minmax')
    expect(frame?.style.getPropertyValue('border-radius')).toMatch(/^0(?:px)?$/)

    const composer = rulesTargeting('[data-composer-card]')
      .find(rule => rule.style.getPropertyValue('box-shadow') !== '')
    expect(composer?.style.getPropertyValue('border-radius')).toBe('2px')
    expect(composer?.style.getPropertyValue('box-shadow')).toContain('5px 5px')
  })

  it('keeps dark mode authoritative for the command deck', () => {
    const darkComposer = styleRules.find(rule =>
      rule.selectorText.includes('body[data-ds-dark-theme][data-rhine-lab-theme]')
      && rule.selectorText.includes('[data-composer-card]')
      && rule.style.getPropertyValue('box-shadow') !== '',
    )
    expect(darkComposer).toBeDefined()
  })

  it('compiles desktop, mobile, and reduced-motion adaptation rules', () => {
    expect(hasMaxWidth(900)).toBe(true)
    expect(hasMaxWidth(640)).toBe(true)

    const reducedMotion = mediaRules.find(rule =>
      rule.conditionText.replace(/\s/g, '').includes('prefers-reduced-motion:reduce'),
    )
    expect(reducedMotion).toBeDefined()
    const reducedRules = flattenRules(reducedMotion!.cssRules)
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    expect(reducedRules.some(rule => rule.style.getPropertyValue('animation') === 'none')).toBe(true)
  })
})
