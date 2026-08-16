import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { afterAll, describe, expect, it } from 'vitest'

type LoaderRegistration = {
  id: string
  factory: (require: (id: string) => unknown) => Record<string, unknown>
}

const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
  runScripts: 'outside-only',
})
let registration: LoaderRegistration | undefined
const loaderWindow = dom.window as unknown as {
  __ModuleLoader__: { load(value: LoaderRegistration): void }
}
loaderWindow.__ModuleLoader__ = { load(value) { registration = value } }
dom.window.eval(readFileSync(resolve(process.cwd(), 'lib/client.js'), 'utf8'))

if (registration === undefined) throw new Error('Built client did not register with the module loader')
const client = registration.factory(id => {
  if (id === 'react/jsx-runtime') {
    return { Fragment: Symbol('Fragment'), jsx() {}, jsxs() {} }
  }
  if (id === '@deepseek-ai/dsh-client-runtime/client') {
    return { defineStore: (value: unknown) => value }
  }
  throw new Error('Unexpected built-client external ' + id)
})

const reconstructionStyle = Array.from(dom.window.document.querySelectorAll('style'))
  .find(tag => tag.dataset.pluginCss?.endsWith('/rhine.module.css'))
const reconstructionSheet = reconstructionStyle?.sheet
if (reconstructionSheet === null || reconstructionSheet === undefined) {
  throw new Error('Built client did not inject the reconstruction stylesheet')
}


const settingsStyle = Array.from(dom.window.document.querySelectorAll('style'))
  .find(tag => tag.dataset.pluginCss?.endsWith('/RhineLabRow.module.css'))
const settingsSheet = settingsStyle?.sheet
if (settingsSheet === null || settingsSheet === undefined) {
  throw new Error('Built client did not inject the settings-row stylesheet')
}

const hudStyle = Array.from(dom.window.document.querySelectorAll('style'))
  .find(tag => tag.dataset.pluginCss?.endsWith('/RhineLabHud.module.css'))
const hudSheet = hudStyle?.sheet
if (hudSheet === null || hudSheet === undefined) {
  throw new Error('Built client did not inject the HUD stylesheet')
}

function flattenRules(rules: CSSRuleList): CSSRule[] {
  return Array.from(rules).flatMap(rule => {
    if ('cssRules' in rule) return [rule, ...flattenRules(rule.cssRules as CSSRuleList)]
    return [rule]
  })
}

const builtRules = flattenRules(reconstructionSheet.cssRules)
const builtStyleRules = builtRules.filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
const builtMediaRules = builtRules.filter((rule): rule is CSSMediaRule => 'conditionText' in rule)

const builtSettingsRules = flattenRules(settingsSheet.cssRules)
  .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
const builtHudRules = flattenRules(hudSheet.cssRules)
const builtHudStyleRules = builtHudRules.filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
const builtHudMediaRules = builtHudRules.filter((rule): rule is CSSMediaRule => 'conditionText' in rule)

afterAll(() => dom.window.close())

describe('built Rhine Lab client loader', () => {
  it('executes the real bundle and exposes the client contract', () => {
    expect(registration?.id).toBe('dsh-theme-rhine-lab')
    expect(client.SKIN_ATTRIBUTE).toBe('data-rhine-lab-theme')
    expect(client.apply).toEqual(expect.any(Function))
  })

  it('injects reconstruction rules without replacing Harness columns at any viewport', () => {
    expect(builtStyleRules.some(rule => rule.selectorText.includes('[data-chat-flow-kind]'))).toBe(true)
    expect(builtStyleRules.some(rule =>
      rule.selectorText.includes(':has(>[data-shell-overlay])')
      && rule.style.getPropertyValue('grid-template-columns') !== '',
    )).toBe(false)
    const responsive = builtMediaRules.find(rule =>
      ['(max-width:900px)', '(width<=900px)']
        .includes(rule.conditionText.replace(/\s/g, '')),
    )
    expect(responsive).toBeDefined()
    const responsiveRules = flattenRules(responsive!.cssRules)
      .filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
    expect(responsiveRules.some(rule =>
      rule.style.getPropertyValue('grid-template-columns') !== '',
    )).toBe(false)
    expect(responsiveRules.some(rule =>
      rule.selectorText.includes(':nth-child(3)')
      && rule.style.getPropertyValue('display') === 'none',
    )).toBe(false)
  })

  it('injects input-transparent seals without fullscreen root effects', () => {
    const runningSeal = builtStyleRules.find(rule =>
      rule.selectorText.includes('[data-state=running]')
      && rule.selectorText.endsWith(':after')
      && rule.style.getPropertyValue('animation') !== '',
    )
    expect(runningSeal?.style.getPropertyValue('pointer-events')).toBe('none')
    expect(builtStyleRules.some(rule =>
      /^(?:html|body).*:(?:before|after)$/.test(rule.selectorText)
      && rule.style.getPropertyValue('position') === 'fixed',
    )).toBe(false)
  })

  it('styles the Chinese send control as a research-orange primary action', () => {
    const chineseSend = builtStyleRules.find(rule =>
      rule.selectorText.includes('aria-label') && rule.selectorText.includes('发送消息')
      && rule.style.getPropertyValue('background') === 'var(--dsw-alias-brand-primary)',
    )

    expect(chineseSend).toBeDefined()
  })
})

it('keeps the department index label in a pointer-neutral safe sidebar inset', () => {
  const departmentIndex = builtStyleRules.find(rule =>
    rule.style.getPropertyValue('content').includes('DEPARTMENT INDEX')
    && rule.selectorText.endsWith(':before'),
  )

  expect(departmentIndex).toBeDefined()
  expect(departmentIndex?.style.getPropertyValue('position')).toBe('absolute')
  expect(departmentIndex?.style.getPropertyValue('inset-block-start')).toBe('114px')
  expect(departmentIndex?.style.getPropertyValue('inset-inline-start')).toBe('16px')
  expect(departmentIndex?.style.getPropertyValue('pointer-events')).toBe('none')
  expect(departmentIndex?.style.getPropertyValue('white-space')).toBe('nowrap')
})

it('hides the built department index label after Harness collapses the sidebar rail', () => {
  const responsive = builtMediaRules.find(rule =>
    ['(max-width:1024px)', '(width<=1024px)']
      .includes(rule.conditionText.replace(/\s/g, '')),
  )
  const responsiveRules = responsive === undefined
    ? []
    : flattenRules(responsive.cssRules).filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
  const departmentIndex = responsiveRules.find(rule =>
    rule.selectorText.includes(':has(>[data-shell-overlay])')
    && rule.selectorText.includes(':first-child:not([data-shell-overlay]):before'),
  )

  expect(departmentIndex?.style.getPropertyValue('display')).toBe('none')
})

  it('keeps the fixed HUD plate outside Harness identity at wide and responsive widths', () => {
    const root = builtHudStyleRules.find(rule =>
      rule.style.getPropertyValue('position') === 'fixed'
      && rule.style.getPropertyValue('pointer-events') === 'none',
    )
    const plate = builtHudStyleRules.find(rule =>
      rule.style.getPropertyValue('grid-template-columns') === 'auto 1fr'
      && rule.style.getPropertyValue('position') === 'absolute',
    )
    const responsive = builtHudMediaRules.find(rule =>
      ['(max-width:1100px)', '(width<=1100px)'].includes(rule.conditionText.replace(/\s/g, '')),
    )
    const responsiveRules = responsive === undefined
      ? []
      : flattenRules(responsive.cssRules).filter((rule): rule is CSSStyleRule => 'selectorText' in rule)

    expect(root).toBeDefined()
    expect(plate?.style.getPropertyValue('left')).toBe('560px')
    expect(responsiveRules.some(rule =>
      rule.selectorText.includes(plate?.selectorText ?? '__missing_plate__')
      && rule.style.getPropertyValue('display') === 'none',
    )).toBe(true)
  })

  it('reserves separate upper-right regions for archive copy and validation squares', () => {
    const archive = builtStyleRules.find(rule =>
      rule.style.getPropertyValue('content').includes('RL / ARCHIVE')
      && rule.selectorText.endsWith(':before'),
    )
    const validation = builtHudStyleRules.find(rule =>
      rule.style.getPropertyValue('display') === 'flex'
      && rule.style.getPropertyValue('gap') === '4px'
      && rule.style.getPropertyValue('position') === 'absolute',
    )

    expect(archive?.style.getPropertyValue('inset-inline-end')).toBe('64px')
    expect(archive?.style.getPropertyValue('pointer-events')).toBe('none')
    expect(validation?.style.getPropertyValue('right')).toBe('16px')
    expect(validation?.style.getPropertyValue('top')).toBe('16px')
  })

  it('injects square research-orange settings controls', () => {
    const segment = builtSettingsRules.find(rule =>
      rule.style.getPropertyValue('padding') === '5px 14px',
    )
    const selectedSegment = builtSettingsRules.find(rule =>
      rule.style.getPropertyValue('background') === 'var(--dsw-alias-brand-primary)'
      && rule.style.getPropertyValue('color') === 'var(--dsw-alias-label-primary-foreground)',
    )
    const enabledSeal = builtSettingsRules.find(rule =>
      rule.selectorText.includes('[data-on]')
      && rule.style.getPropertyValue('animation') !== '',
    )

    expect(segment?.style.getPropertyValue('border-radius')).toMatch(/^0(?:px)?$/)
    expect(selectedSegment).toBeDefined()
    expect(enabledSeal?.style.getPropertyValue('box-shadow')).toContain('var(--dsw-alias-brand-primary)')
  })
