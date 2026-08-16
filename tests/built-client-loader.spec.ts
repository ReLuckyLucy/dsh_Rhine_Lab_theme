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

function flattenRules(rules: CSSRuleList): CSSRule[] {
  return Array.from(rules).flatMap(rule => {
    if ('cssRules' in rule) return [rule, ...flattenRules(rule.cssRules as CSSRuleList)]
    return [rule]
  })
}

const builtRules = flattenRules(reconstructionSheet.cssRules)
const builtStyleRules = builtRules.filter((rule): rule is CSSStyleRule => 'selectorText' in rule)
const builtMediaRules = builtRules.filter((rule): rule is CSSMediaRule => 'conditionText' in rule)

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
})
