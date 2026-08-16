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

function mediaAtMaxWidth(px: number): CSSMediaRule {
  const queries = ['(max-width:' + px + 'px)', '(width<=' + px + 'px)']
  const rule = mediaRules.find(candidate =>
    queries.includes(candidate.conditionText.replace(/\s/g, '')),
  )
  if (rule === undefined) throw new Error('Missing max-width ' + px + 'px media rule')
  return rule
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

  it('scopes every compiled global style selector to the enabled body theme', () => {
    expect(styleRules.length).toBeGreaterThan(20)
    expect(styleRules.every(rule =>
      rule.selectorText.split(',').every(isThemeScoped),
    )).toBe(true)
  })

  it('compiles the square archive frame and command deck treatments', () => {
    const frame = rulesTargeting(':has(>[data-shell-overlay])')
      .find(rule => rule.style.getPropertyValue('display') === 'grid')
    expect(frame?.style.getPropertyValue('display')).toBe('grid')
    expect(frame?.style.getPropertyValue('border-radius')).toMatch(/^0(?:px)?$/)
    expect(rulesTargeting(':has(>[data-shell-overlay])').some(rule =>
      rule.style.getPropertyValue('grid-template-columns') !== '',
    )).toBe(false)

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

  it('removes only inscriptions and metadata at 900px without replacing Harness tracks', () => {
    const responsiveRules = flattenRules(mediaAtMaxWidth(900).cssRules)
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)

    const frameInscription = responsiveRules.find(rule =>
      rule.selectorText.includes(':has(>[data-shell-overlay])')
      && rule.selectorText.includes(':before'),
    )
    const phaseMetadata = responsiveRules.find(rule =>
      rule.selectorText.includes('[data-phase]') && rule.selectorText.includes(':after'),
    )
    expect(frameInscription?.style.getPropertyValue('content')).toBe('none')
    expect(phaseMetadata?.style.getPropertyValue('content')).toBe('none')
    expect(responsiveRules.some(rule =>
      rule.style.getPropertyValue('grid-template-columns') !== '',
    )).toBe(false)
    expect(responsiveRules.some(rule =>
      rule.selectorText.includes(':nth-child(3)')
      && rule.style.getPropertyValue('display') === 'none',
    )).toBe(false)
  })

  it('hides the nonessential department index after Harness collapses the sidebar rail', () => {
    const narrowRules = flattenRules(mediaAtMaxWidth(1024).cssRules)
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    const departmentIndex = narrowRules.find(rule =>
      rule.selectorText.includes(':has(>[data-shell-overlay])')
      && rule.selectorText.includes(':first-child:not([data-shell-overlay]):before'),
    )

    expect(departmentIndex?.style.getPropertyValue('display')).toBe('none')
  })

  it('reduces only file-header and record gutters at 640px', () => {
    const mobileRules = flattenRules(mediaAtMaxWidth(640).cssRules)
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    const phase = mobileRules.find(rule => rule.selectorText.endsWith('[data-phase]'))
    const record = mobileRules.find(rule => rule.selectorText.endsWith('[data-chat-flow-kind]'))

    expect(phase?.style.getPropertyValue('min-height')).toBe('46px')
    expect(phase?.style.getPropertyValue('padding-inline')).toBe('14px')
    expect(record?.style.getPropertyValue('padding')).toBe('16px 10px 16px 38px')
    expect(mobileRules.some(rule =>
      rule.style.getPropertyValue('grid-template-columns') !== '',
    )).toBe(false)
  })

  it('makes every absolute decorative pseudo input-transparent', () => {
    const absolutePseudos = styleRules.filter(rule =>
      /:(?:before|after)$/.test(rule.selectorText)
      && rule.style.getPropertyValue('position') === 'absolute',
    )
    expect(absolutePseudos.length).toBeGreaterThanOrEqual(4)
    expect(absolutePseudos.every(rule =>
      rule.style.getPropertyValue('pointer-events') === 'none',
    )).toBe(true)
  })

  it('stops the running seal under reduced motion', () => {
    const runningSeal = styleRules.find(rule =>
      rule.selectorText.includes('[data-state=running]')
      && rule.selectorText.endsWith(':after')
      && rule.style.getPropertyValue('animation') !== '',
    )
    expect(runningSeal?.style.getPropertyValue('pointer-events')).toBe('none')

    const reducedMotion = mediaRules.find(rule =>
      rule.conditionText.replace(/\s/g, '').includes('prefers-reduced-motion:reduce'),
    )
    expect(reducedMotion).toBeDefined()
    const reducedRules = flattenRules(reducedMotion!.cssRules)
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    expect(reducedRules.some(rule =>
      rule.selectorText.includes('[data-state=running]')
      && rule.selectorText.endsWith(':after')
      && rule.style.getPropertyValue('animation') === 'none',
    )).toBe(true)
  })

  it('does not compile fullscreen scan, boot, or vignette layers', () => {
    const fullscreenRootPseudos = styleRules.filter(rule =>
      /^(?:html|body)(?:\[[^\]]+\])*:(?:before|after)$/.test(rule.selectorText)
      && rule.style.getPropertyValue('position') === 'fixed',
    )
    const animatedRootPseudos = styleRules.filter(rule =>
      /^(?:html|body)(?:\[[^\]]+\])*:(?:before|after)$/.test(rule.selectorText)
      && rule.style.getPropertyValue('animation') !== '',
    )
    const vignetteRootPseudos = styleRules.filter(rule =>
      /^(?:html|body)(?:\[[^\]]+\])*:(?:before|after)$/.test(rule.selectorText)
      && rule.style.getPropertyValue('background').includes('radial-gradient'),
    )
    expect(fullscreenRootPseudos).toEqual([])
    expect(animatedRootPseudos).toEqual([])
    expect(vignetteRootPseudos).toEqual([])
  })

  it('does not override code, terminal, or diff overflow behavior', () => {
    const forbiddenProperties = ['white-space', 'overflow-x', 'width', 'min-width', 'max-width']
    const codeSurfaceRules = styleRules.filter(rule =>
      /(^|[\s>+~,:])(pre|code)(?=$|[.:[\s>+~])|terminal|diff/i.test(rule.selectorText),
    )
    const forbiddenDeclarations = codeSurfaceRules.flatMap(rule =>
      forbiddenProperties
        .filter(property => rule.style.getPropertyValue(property) !== '')
        .map(property => rule.selectorText + ' { ' + property + ' }'),
    )
    expect(forbiddenDeclarations).toEqual([])
  })
})
