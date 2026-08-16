import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import buildConfigs from '../tsdown.config.ts'

type BuildPlugin = {
  name: string
  resolveId?: (source: string, importer?: string) => string | null
  load?: (id: string) => Promise<string | null>
}

describe('CSS Modules build boundary', () => {
  it('emits the class map in a stable locale-independent key order', async () => {
    const clientConfig = buildConfigs[1]
    const plugin = clientConfig.plugins?.find(candidate => candidate.name === 'dsh-css-modules-inline') as BuildPlugin | undefined
    const importer = resolve(process.cwd(), 'tests/css-modules-inline.spec.ts')
    const fixture = './fixtures/deterministic.module.css'
    const virtualId = plugin?.resolveId?.call({}, fixture, importer)

    expect(plugin).toBeDefined()
    expect(virtualId).toEqual(expect.any(String))

    const keyOrders: string[][] = []
    for (let run = 0; run < 5; run += 1) {
      const source = await plugin!.load!.call({ addWatchFile() {} }, virtualId!)
      expect(source).toEqual(expect.any(String))
      const moduleUrl = `data:text/javascript;base64,${Buffer.from(source!).toString('base64')}#${run}`
      const loaded = await import(moduleUrl) as { default: Record<string, string> }
      keyOrders.push(Object.keys(loaded.default))
    }

    expect(keyOrders).toEqual(Array.from({ length: 5 }, () => [
      'alpha',
      'beta',
      'delta',
      'gamma',
      'lambda',
      'theta',
      'zeta',
    ]))
  })
})
