import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

function run(command: string, args: string[], cwd: string) {
  return spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
  })
}

describe('git-hosted installation', () => {
  it('installs committed build artifacts without requiring lifecycle scripts', () => {
    const root = mkdtempSync(join(tmpdir(), 'rhine-git-install-'))
    const source = join(root, 'source')
    const consumer = join(root, 'consumer')
    mkdirSync(source)
    mkdirSync(consumer)

    try {
      for (const entry of ['package.json', 'lib', 'cordis.patch.yml', 'LICENSE']) {
        cpSync(resolve(entry), join(source, entry), { recursive: true })
      }
      writeFileSync(join(source, 'qa-nonce.txt'), `${Date.now()}-${Math.random()}\n`)

      expect(run('git', ['init'], source).status).toBe(0)
      expect(run('git', ['config', 'user.name', 'Codex QA'], source).status).toBe(0)
      expect(run('git', ['config', 'user.email', 'qa@example.invalid'], source).status).toBe(0)
      expect(run('git', ['add', '.'], source).status).toBe(0)
      expect(run('git', ['commit', '-m', 'qa: git install fixture'], source).status).toBe(0)

      writeFileSync(join(consumer, 'package.json'), JSON.stringify({
        name: 'rhine-git-install-consumer',
        version: '1.0.0',
        private: true,
      }, null, 2))

      const gitUrl = `git+file:///${source.replaceAll('\\', '/')}`
      const pnpmEntry = process.env.npm_execpath
      expect(pnpmEntry).toBeTruthy()
      const installed = run(process.execPath, [pnpmEntry!, 'add', '--ignore-scripts', gitUrl], consumer)
      const output = `${installed.stdout}\n${installed.stderr}`

      expect(installed.status, output).toBe(0)
      expect(output).not.toContain('has to be built but the build scripts were ignored')
      expect(existsSync(join(
        consumer,
        'node_modules',
        'dsh-theme-rhine-lab',
        'lib',
        'index.js',
      ))).toBe(true)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  }, 30_000)
})
