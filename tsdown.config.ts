/**
 * Self-contained build for the published plugin. No monorepo context, no
 * project references, no typecheck — `pnpm build` (and the npm/git `prepare`
 * hook) emits two artifacts:
 *
 * - `lib/index.js` (node half, ESM): host externals stay bare so the profile's
 *   node_modules resolves them at runtime.
 * - `lib/client.js` (browser half, CJS): wrapped in
 *   `window.__ModuleLoader__.load(...)` exactly as the dsh web shell expects;
 *   platform modules stay external (the shell's frozen module table answers
 *   them), everything else is inlined, and CSS Modules are compiled to
 *   auto-injected `<style data-plugin>` tags by lightningcss.
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { transform } from 'lightningcss'
import type { UserConfig } from 'tsdown'

const ID = 'dsh-theme-rhine-lab'

/** Module specifiers the dsh web shell shares into its frozen module table. */
const PLATFORM_MODULES = [
  'react', 'react/jsx-runtime', 'react-dom', 'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
  '@deepseek-ai/dsh-client-web-react',
  '@deepseek-ai/dsh-client-ui-primitives',
  '@deepseek-ai/dsh-client-ui-attachment',
  '@deepseek-ai/dsh-client-schema-form',
  '@deepseek-ai/dsh-client-runtime/client',
] as const

/** CSS-module virtual-id wrapper (keeps module CSS away from tsdown's css pipeline). */
const CSS_VIRTUAL_PREFIX = '\0dsh-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

/** Resolve one .module.css import against its importer. */
function sourceAssetPath(source: string, importer: string | undefined): string {
  if (importer !== undefined && existsSync(resolve(dirname(importer), source))) {
    return resolve(dirname(importer), source)
  }
  return source
}

/** Inline one CSS Module: hashed class map export plus a `<style data-plugin>` tag. */
function cssModulesInline(): NonNullable<UserConfig['plugins']>[number] {
  return {
    name: 'dsh-css-modules-inline',
    resolveId(source: string, importer: string | undefined) {
      if (!source.endsWith('.module.css')) return null
      return CSS_VIRTUAL_PREFIX + sourceAssetPath(source, importer) + CSS_VIRTUAL_SUFFIX
    },
    async load(virtualId: string) {
      if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
      const fileId = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
      // The virtual id otherwise hides the physical stylesheet from the watch graph.
      this.addWatchFile(fileId)
      const source = await readFile(fileId)
      const { code, exports: cssExports } = transform({
        filename: fileId,
        code: source,
        cssModules: { pattern: '[hash]_[local]' },
        minify: true,
      })
      const classMap: Record<string, string> = {}
      for (const [local, exp] of Object.entries(cssExports ?? {})) classMap[local] = exp.name
      // One <style data-plugin> per module file; idempotent under re-evaluation.
      return [
        `const css = ${JSON.stringify(code.toString())};`,
        `const tagId = ${JSON.stringify(`${ID}/${fileId.split(/[\\/]/).pop() ?? 'css'}`)};`,
        'if (typeof document !== \'undefined\' && document.querySelector(\'style[data-plugin-css=\' + JSON.stringify(tagId) + \']\') === null) {',
        '  const tag = document.createElement(\'style\');',
        `  tag.dataset.plugin = ${JSON.stringify(ID)};`,
        '  tag.dataset.pluginCss = tagId;',
        '  tag.textContent = css;',
        '  document.head.appendChild(tag);',
        '}',
        `export default ${JSON.stringify(classMap)};`,
      ].join('\n')
    },
  }
}

/** Node half: bare @deepseek-ai imports resolve from the profile at runtime. */
const node: UserConfig = {
  entry: { index: 'src/index.ts' },
  outDir: 'lib',
  format: ['esm'],
  platform: 'node',
  dts: false,
  clean: false,
  fixedExtension: false,
  external: [/^@deepseek-ai\//],
}

/** Browser half: the dsh web shell's client bundle format. */
const client: UserConfig = {
  entry: { client: 'src/client/index.ts' },
  outDir: 'lib',
  format: ['cjs'],
  platform: 'browser',
  dts: false,
  clean: false,
  sourcemap: true,
  external: [...PLATFORM_MODULES],
  // Substitutions the bundled browser deps expect (zustand-style probes).
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    'import.meta.env.MODE': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    'import.meta.env': JSON.stringify({ MODE: process.env.NODE_ENV ?? 'production' }),
  },
  // Everything outside the platform table inlines (schemastery, etc.).
  noExternal: (id: string) => (PLATFORM_MODULES.includes(id) ? undefined : true),
  plugins: [cssModulesInline()],
  outputOptions: {
    entryFileNames: 'client.js',
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(ID)}, factory: (require) => {`,
    footer: 'return module.exports; } });',
    intro: 'var module = { exports: {} }; var exports = module.exports;',
  },
}

export default [node, client]
