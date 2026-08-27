import { createElement, type ComponentType } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { fireEvent, render, screen } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { JSDOM } from 'jsdom'
import { afterAll, describe, expect, it, vi } from 'vitest'

type LoaderRegistration = {
  id: string
  factory: (require: (id: string) => unknown) => Record<string, unknown>
}

type SlotRegistration = {
  entry: Record<string, unknown>
  Component: ComponentType<Record<string, unknown>>
}

const bundleDom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
  runScripts: 'outside-only',
})
let registration: LoaderRegistration | undefined
const loaderWindow = bundleDom.window as unknown as {
  __ModuleLoader__: { load(value: LoaderRegistration): void }
}
loaderWindow.__ModuleLoader__ = { load(value) { registration = value } }
bundleDom.window.eval(readFileSync(resolve(process.cwd(), 'lib/client.js'), 'utf8'))

if (registration === undefined) throw new Error('Built client did not register with the module loader')
const client = registration.factory(id => {
  if (id === 'react/jsx-runtime') return jsxRuntime
  if (id === '@deepseek-ai/dsh-client-runtime/client') {
    return { defineStore: (value: unknown) => value }
  }
  throw new Error('Unexpected built-client external ' + id)
})

afterAll(() => bundleDom.window.close())

describe('built Rhine Lab component output', () => {
  it('renders the registered HUD and settings row with working pressed-state actions', () => {
    const registered: SlotRegistration[] = []
    const set = vi.fn()
    const ctx = {
      effect(run: () => unknown) {
        run()
      },
      slots: {
        inject(_name: string, run: () => unknown) {
          return run()
        },
        register(entry: Record<string, unknown>, Component: ComponentType<Record<string, unknown>>) {
          registered.push({ entry, Component })
          return () => {}
        },
      },
      settingsScope: {
        bind() {
          return {
            getSnapshot: () => ({ value: { enabled: true } }),
            subscribe: () => () => {},
            set,
          }
        },
      },
      theme: { overrideTokens: () => () => {} },
      locale: { register: () => () => {} },
    }

    const apply = client.apply as (value: unknown) => void
    apply(ctx)

    const hud = registered.find(item => item.entry.id === 'rhine-lab-hud')
    const row = registered.find(item => item.entry.id === 'rhine-lab')
    expect(hud).toBeDefined()
    expect(row).toBeDefined()

    const hudView = render(createElement(hud!.Component))
    expect(screen.queryByText('RHINE LAB LLC.')).toBeNull()
    expect(screen.queryByText('+', { exact: true })).toBeNull()
    hudView.unmount()

    const setEnabled = vi.fn()
    render(createElement(row!.Component, {
      t: (key: string) => ({
        'rhine.title': '莱茵生命深度界面',
        'rhine.desc': '将 Harness 重组为莱茵生命内部研究终端',
        'rhine.on': '授权',
        'rhine.off': '停用',
      }[key] ?? key),
      setEnabled,
      useStore: (select: (state: { enabled: boolean }) => unknown) => select({ enabled: true }),
    }))

    expect(screen.getByRole('button', { name: '授权' }).getAttribute('aria-pressed')).toBe('true')
    expect(screen.getByRole('button', { name: '停用' }).getAttribute('aria-pressed')).toBe('false')
    fireEvent.click(screen.getByRole('button', { name: '停用' }))
    expect(setEnabled).toHaveBeenCalledWith(false)
  })
})
