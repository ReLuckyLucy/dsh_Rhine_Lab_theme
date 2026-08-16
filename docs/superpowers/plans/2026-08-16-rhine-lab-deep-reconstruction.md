# Rhine Lab Deep Reconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing reversible `dsh-theme-rhine-lab` bundle into the approved Rhine Lab archive-terminal reconstruction while preserving all DeepSeek Harness behavior.

**Architecture:** Keep Harness components and state ownership intact. Extend the existing theme projector, register one decorative HUD through the official `shell.overlay` slot, and apply the visual reconstruction through alias tokens plus a single deeply scoped stylesheet that targets Harness-owned `data-*` attributes rather than generated class names.

**Tech Stack:** TypeScript, React 18, CSS Modules compiled by Lightning CSS, DeepSeek Harness client slots/theme/settings APIs, Vitest 4, jsdom, Testing Library, pnpm, tsdown.

## Global Constraints

- Support DeepSeek Harness `0.1.0-rc.5`; newer versions receive best-effort visual degradation only.
- Modify `D:\Desktop\dsh_Rhine_Lab_themo`; do not edit `D:\Desktop\deepseek-harness`.
- Keep the package independently installable and reversible from the existing General-settings row.
- Do not replace the `sidebar`, `conversation`, `conversation.session`, composer, or details business components.
- Do not import Harness internal source paths, generated CSS Module names, or reference-site raster/audio assets.
- Use `body[data-rhine-lab-theme]` as the scope for every deep global selector.
- Keep Harness `data-ds-dark-theme` authoritative for light/dark state.
- Keep the HUD decorative: `aria-hidden`, `pointer-events: none`, and no controls or business state.
- Preserve keyboard focus, terminal/preformatted overflow, narrow-screen behavior, and `prefers-reduced-motion`.
- Commit rebuilt `lib/index.js`, `lib/client.js`, and `lib/client.js.map` whenever source changes affect the published package.

---

## File Structure

- `src/client/theme-projector.ts` — owns idempotent token installation and the two theme DOM attributes.
- `src/client/RhineLabHud.tsx` — renders the non-interactive brand, access, serial, edge, and boot-validation surfaces.
- `src/client/RhineLabHud.module.css` — styles and hides/shows only the HUD.
- `src/client/hud-registration.ts` — registers the HUD into `shell.overlay` and exposes a directly testable lifecycle seam.
- `src/client/palette.ts` — maps Rhine Lab light/dark roles onto Harness alias tokens.
- `src/client/rhine.module.css` — contains the full scoped structural reconstruction and motion/responsive rules.
- `src/client/index.ts` — composes settings, projector, HUD registration, locale, and the existing settings row.
- `tests/theme-projector.spec.ts` — proves enable/disable/idempotence/disposal.
- `tests/rhine-hud.spec.tsx` — proves restrained decorative HUD markup and slot registration cleanup.
- `tests/palette.spec.ts` — pins the primary archive-terminal palette roles.
- `tests/reconstruction-css.spec.ts` — enforces scoping, stable anchors, accessibility branches, and banned dependencies.
- `vitest.config.ts` — jsdom/CSS-module test configuration.
- `package.json` and `pnpm-lock.yaml` — test stack, scripts, dependency metadata, and `0.2.0` package version.
- `README.md` and `README.zh.md` — installation, compatibility, design, verification, and screenshot documentation.
- `screenshots/light.png` and `screenshots/dark.png` — live `0.1.0-rc.5` verification captures.

### Task 1: Reversible theme projector and test foundation

**Files:**
- Create: `vitest.config.ts`
- Create: `tests/theme-projector.spec.ts`
- Create: `src/client/theme-projector.ts`
- Modify: `package.json:7-42`
- Modify: `pnpm-lock.yaml`
- Modify: `src/client/index.ts:1-121`
- Modify: `tsconfig.json:2-12`

**Interfaces:**
- Produces: `ThemeProjection` with `setEnabled(enabled: boolean): void` and `dispose(): void`.
- Produces: `createThemeProjector(installTokens: () => () => void, doc: Pick<Document, 'documentElement' | 'body'>): ThemeProjection`.
- Consumes: the existing `ctx.theme.overrideTokens(OVERRIDE_SOURCE, RHINE_TOKENS)` call and `SKIN_ATTRIBUTE` constant.

- [ ] **Step 1: Add the test runner dependencies and scripts**

Update `package.json` to include:

```json
{
  "scripts": {
    "build": "tsdown",
    "test": "vitest run",
    "test:watch": "vitest",
    "prepare": "tsdown"
  },
  "devDependencies": {
    "@testing-library/react": "^16.3.0",
    "@types/react": "~18.3.1",
    "@types/react-dom": "^18.3.7",
    "jsdom": "^29.1.1",
    "lightningcss": "^1.32.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tsdown": "^0.22.2",
    "typescript": "^6.0.3",
    "vitest": "^4.1.8"
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  css: { modules: { classNameStrategy: 'non-scoped' } },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.tsx'],
    restoreMocks: true,
  },
})
```

Add `vitest.config.ts` and `tests` to `tsconfig.json`'s `include` array, run `pnpm install`, and retain the resulting lockfile.

- [ ] **Step 2: Write the failing projector tests**

Create `tests/theme-projector.spec.ts`:

```ts
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  createThemeProjector,
  SKIN_ATTRIBUTE,
} from '../src/client/theme-projector.ts'

describe('Rhine Lab theme projector', () => {
  afterEach(() => {
    document.documentElement.removeAttribute(SKIN_ATTRIBUTE)
    document.body.removeAttribute(SKIN_ATTRIBUTE)
  })

  it('installs once, retracts once, and owns both attributes', () => {
    const retract = vi.fn()
    const install = vi.fn(() => retract)
    const projection = createThemeProjector(install, document)

    projection.setEnabled(true)
    projection.setEnabled(true)
    expect(install).toHaveBeenCalledTimes(1)
    expect(document.documentElement.hasAttribute(SKIN_ATTRIBUTE)).toBe(true)
    expect(document.body.hasAttribute(SKIN_ATTRIBUTE)).toBe(true)

    projection.setEnabled(false)
    projection.setEnabled(false)
    expect(retract).toHaveBeenCalledTimes(1)
    expect(document.documentElement.hasAttribute(SKIN_ATTRIBUTE)).toBe(false)
    expect(document.body.hasAttribute(SKIN_ATTRIBUTE)).toBe(false)
  })

  it('disposes an enabled projection idempotently', () => {
    const retract = vi.fn()
    const projection = createThemeProjector(() => retract, document)
    projection.setEnabled(true)
    projection.dispose()
    projection.dispose()
    expect(retract).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 3: Run the test and verify the intended failure**

Run: `pnpm test -- tests/theme-projector.spec.ts`

Expected: FAIL because `src/client/theme-projector.ts` does not exist.

- [ ] **Step 4: Implement the projector**

Create `src/client/theme-projector.ts`:

```ts
export const SKIN_ATTRIBUTE = 'data-rhine-lab-theme'

export interface ThemeProjection {
  setEnabled: (enabled: boolean) => void
  dispose: () => void
}

export function createThemeProjector(
  installTokens: () => () => void,
  doc: Pick<Document, 'documentElement' | 'body'>,
): ThemeProjection {
  let retractTokens: (() => void) | undefined

  const setEnabled = (enabled: boolean): void => {
    if (enabled) {
      retractTokens ??= installTokens()
      doc.documentElement.setAttribute(SKIN_ATTRIBUTE, '')
      doc.body.setAttribute(SKIN_ATTRIBUTE, '')
      return
    }
    retractTokens?.()
    retractTokens = undefined
    doc.documentElement.removeAttribute(SKIN_ATTRIBUTE)
    doc.body.removeAttribute(SKIN_ATTRIBUTE)
  }

  return { setEnabled, dispose: () => { setEnabled(false) } }
}
```

Remove the old `SKIN_ATTRIBUTE` declaration from `src/client/index.ts`, import the exported constant and `createThemeProjector` from `theme-projector.ts`, then replace the local `project()` closure with:

```ts
const projection = createThemeProjector(
  () => ctx.theme.overrideTokens(OVERRIDE_SOURCE, RHINE_TOKENS),
  document,
)
```

Use `projection.setEnabled(next)` for live writes and `projection.dispose()` in fiber cleanup.

- [ ] **Step 5: Run focused tests and the existing build**

Run: `pnpm test -- tests/theme-projector.spec.ts`

Expected: 2 tests PASS.

Run: `pnpm build`

Expected: `lib/index.js`, `lib/client.js`, and `lib/client.js.map` rebuild successfully.

- [ ] **Step 6: Commit the projector foundation**

```powershell
git add package.json pnpm-lock.yaml tsconfig.json vitest.config.ts tests/theme-projector.spec.ts src/client/theme-projector.ts src/client/index.ts lib
git diff --cached --check
git commit -m "test: cover Rhine Lab theme lifecycle"
```

### Task 2: Official shell HUD and slot lifecycle

**Files:**
- Create: `src/client/RhineLabHud.tsx`
- Create: `src/client/RhineLabHud.module.css`
- Create: `src/client/hud-registration.ts`
- Create: `tests/rhine-hud.spec.tsx`
- Modify: `src/client/index.ts:1-121`
- Modify: `package.json:20-38`
- Modify: `tsdown.config.ts:16-24`

**Interfaces:**
- Consumes: Harness `shell.overlay` list slot declared by `@deepseek-ai/dsh-client-ui-layout`.
- Produces: `RhineLabHud(): JSX.Element`.
- Produces: `registerRhineLabHud(slots: ClientContext['slots']): () => void`.
- Produces: slot entry `{ name: 'shell.overlay', id: 'rhine-lab-hud', order: -100 }`.

- [ ] **Step 1: Write failing HUD markup and lifecycle tests**

Create `tests/rhine-hud.spec.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import { RhineLabHud } from '../src/client/RhineLabHud.tsx'
import { registerRhineLabHud } from '../src/client/hud-registration.ts'

describe('RhineLabHud', () => {
  it('renders restrained decorative branding without controls', () => {
    const { container } = render(<RhineLabHud />)
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByText('RHINE LAB LLC.')).toBeTruthy()
    expect(screen.getByText('SYNTHESIZE INFORMATION ANALYSIS OS')).toBeTruthy()
    expect(container.querySelector('button, input, textarea, a')).toBeNull()
  })

  it('registers through shell.overlay and relays disposal', () => {
    const disposeEntry = vi.fn()
    const disposeInjection = vi.fn()
    const register = vi.fn(() => disposeEntry)
    const inject = vi.fn((_key: string, callback: () => () => void) => {
      const disposeActive = callback()
      return () => { disposeActive(); disposeInjection() }
    })
    const slots = { register, inject } as unknown as ClientContext['slots']

    const dispose = registerRhineLabHud(slots)
    expect(inject).toHaveBeenCalledWith('shell.overlay', expect.any(Function))
    expect(register).toHaveBeenCalledWith(
      { name: 'shell.overlay', id: 'rhine-lab-hud', order: -100 },
      RhineLabHud,
    )
    dispose()
    expect(disposeEntry).toHaveBeenCalledTimes(1)
    expect(disposeInjection).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: Run the HUD test and verify the intended failure**

Run: `pnpm test -- tests/rhine-hud.spec.tsx`

Expected: FAIL because the HUD modules do not exist.

- [ ] **Step 3: Implement the decorative HUD component**

Create `src/client/RhineLabHud.tsx` with this exact content hierarchy:

```tsx
import css from './RhineLabHud.module.css'

export function RhineLabHud() {
  return (
    <div className={css.root} aria-hidden="true">
      <div className={css.plate}>
        <span className={css.mark}><i>+</i><i>−</i></span>
        <span className={css.company}>RHINE LAB LLC.</span>
        <span className={css.system}>SYNTHESIZE INFORMATION ANALYSIS OS</span>
      </div>
      <div className={css.access}>
        <span>ACCESS PERMISSION // AUTHORIZED</span>
        <span>FILE NO. DSH–RL–001</span>
      </div>
      <div className={css.edge}>COMPONENT CONTROL SECTION · INTERNAL DATABASE</div>
      <div className={css.validation}><i /><i /><i /></div>
    </div>
  )
}
```

`RhineLabHud.module.css` must make `.root` fixed, inset `0`, hidden by default, above the frame overlay, and pointer-neutral. Reveal it only through `:global(body[data-rhine-lab-theme]) .root`. Use `:global(body[data-ds-dark-theme][data-rhine-lab-theme])` for the night treatment. Put the 900ms one-shot validation animation on `.plate`, `.access`, and `.validation`, then disable all three under reduced motion.

- [ ] **Step 4: Implement and compose slot registration**

Create `src/client/hud-registration.ts`:

```ts
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import { RhineLabHud } from './RhineLabHud.tsx'

export function registerRhineLabHud(slots: ClientContext['slots']): () => void {
  return slots.inject('shell.overlay', () => slots.register({
    name: 'shell.overlay',
    id: 'rhine-lab-hud',
    order: -100,
  }, RhineLabHud))
}
```

Call `registerRhineLabHud(ctx.slots)` once inside `apply()`. Add `@deepseek-ai/dsh-client-ui-slots` and `@deepseek-ai/dsh-client-ui-layout` to `package.json > dsh.client.inject`. Add `@deepseek-ai/dsh-client-ui-layout/client` to `PLATFORM_MODULES` only if the built bundle contains a runtime import after compilation; the intended type-only import should be erased.

- [ ] **Step 5: Run HUD tests and rebuild**

Run: `pnpm test -- tests/rhine-hud.spec.tsx tests/theme-projector.spec.ts`

Expected: 4 tests PASS.

Run: `pnpm build`

Expected: build PASS and `rg "dsh-client-ui-layout/client" lib/client.js` returns no runtime import.

- [ ] **Step 6: Commit the HUD unit**

```powershell
git add package.json tsdown.config.ts src/client/RhineLabHud.tsx src/client/RhineLabHud.module.css src/client/hud-registration.ts src/client/index.ts tests/rhine-hud.spec.tsx lib
git diff --cached --check
git commit -m "feat: add Rhine Lab shell HUD"
```

### Task 3: Archive-terminal palette and deep reconstruction sheet

**Files:**
- Create: `tests/palette.spec.ts`
- Create: `tests/reconstruction-css.spec.ts`
- Modify: `src/client/palette.ts:1-147`
- Modify: `src/client/rhine.module.css:1-109`
- Modify: `src/client/RhineLabHud.module.css`

**Interfaces:**
- Consumes: `RHINE_TOKENS` through the projector from Task 1.
- Consumes: `data-rhine-lab-theme`, `data-ds-dark-theme`, and the Harness attributes listed below.
- Produces: research-orange primary tokens and the complete scoped visual reconstruction.

- [ ] **Step 1: Write failing palette contract tests**

Create `tests/palette.spec.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { RHINE_TOKENS } from '../src/client/palette.ts'

describe('Rhine Lab palette', () => {
  it('uses archive paper, ink, research orange, and cyan data states', () => {
    expect(RHINE_TOKENS['--dsw-alias-bg-base']).toEqual({
      light: 'rgb(231, 229, 223)', dark: 'rgb(17, 21, 25)',
    })
    expect(RHINE_TOKENS['--dsw-alias-label-primary']).toEqual({
      light: 'rgb(9, 11, 13)', dark: 'rgb(231, 230, 223)',
    })
    expect(RHINE_TOKENS['--dsw-alias-brand-primary']).toEqual({
      light: 'rgb(242, 122, 34)', dark: 'rgb(255, 135, 50)',
    })
    expect(RHINE_TOKENS['--dsw-alias-feedback-positive']).toEqual({
      light: 'rgb(43, 159, 189)', dark: 'rgb(91, 194, 216)',
    })
  })
})
```

- [ ] **Step 2: Write failing stylesheet contract tests**

Create `tests/reconstruction-css.spec.ts`:

```ts
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(new URL('../src/client/rhine.module.css', import.meta.url), 'utf8')
const clientSource = readdirSync(new URL('../src/client', import.meta.url))
  .filter(name => /\.(ts|tsx)$/.test(name))
  .map(name => readFileSync(new URL(`../src/client/${name}`, import.meta.url), 'utf8'))
  .join('\n')

describe('Rhine Lab reconstruction contract', () => {
  it.each([
    '[data-shell-overlay]', '[data-phase]', '[data-conversation-scroll]',
    '[data-chat-flow]', '[data-chat-flow-kind]', '[data-composer-card]',
    '[data-input-scroll]', '[data-queue-dock]', '[data-approval-key]',
  ])('targets stable Harness anchor %s', anchor => {
    expect(css).toContain(anchor)
  })

  it('is theme-scoped, dark-aware, reduced-motion-aware, and avoids runtime DOM patching', () => {
    expect((css.match(/body\[data-rhine-lab-theme\]/g) ?? []).length).toBeGreaterThan(12)
    expect(css).toContain('body[data-ds-dark-theme][data-rhine-lab-theme]')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
    expect(css).not.toContain('rhine-scan')
    expect(clientSource).not.toContain('MutationObserver')
  })
})
```

- [ ] **Step 3: Run both contracts and verify they fail**

Run: `pnpm test -- tests/palette.spec.ts tests/reconstruction-css.spec.ts`

Expected: palette assertions FAIL on cyan primary values; CSS anchor assertions FAIL on the current holographic sheet.

- [ ] **Step 4: Rebuild the token palette**

Retain the current complete alias-token key set, but define and apply these role constants:

```ts
const PAPER = 'rgb(231, 229, 223)'
const NIGHT = 'rgb(17, 21, 25)'
const INK = 'rgb(9, 11, 13)'
const OFF_WHITE = 'rgb(231, 230, 223)'
const RESEARCH_ORANGE = 'rgb(242, 122, 34)'
const RESEARCH_ORANGE_DARK = 'rgb(255, 135, 50)'
const DATA_CYAN = 'rgb(43, 159, 189)'
const DATA_CYAN_DARK = 'rgb(91, 194, 216)'
const SECURITY_RED = 'rgb(190, 54, 48)'
const SECURITY_RED_DARK = 'rgb(244, 100, 88)'
```

Map brand and primary button tokens to orange, positive/running tokens to cyan, negative tokens to security red, background layers to paper/charcoal steps, labels to ink/off-white steps, and borders to low-alpha ink/steel rules. Keep contrast at or above the existing theme's text contrast.

- [ ] **Step 5: Replace the holographic sheet with the reconstruction sheet**

Delete the continuous scan band, boot wash, full-screen hex lattice, and vignette. Implement the following selector map in `rhine.module.css`:

| Surface | Required selector | Required treatment |
| --- | --- | --- |
| Frame | `body[data-rhine-lab-theme] :has(> [data-shell-overlay])` | square three-column archive frame, technical grid, no rounded outer chrome |
| Sidebar | frame direct first child | department-index rule, orange active edge, condensed labels |
| Conversation | `[data-phase]` and `[data-conversation-scroll]` | file-header spacing, flat research-log scroll surface |
| Log list | `[data-chat-flow]` | numbered vertical record rail |
| Log rows | `[data-chat-flow-kind]` | kind-specific record borders without changing DOM/order |
| Tool/reasoning | `[data-variant][data-state]` | dark execution card, cyan running seal, red error edge |
| Composer | `[data-composer-card]` and `[data-input-scroll]` | command deck, serial header via pseudo-element, orange submit treatment |
| Queue/approval | `[data-queue-dock]`, `[data-approval-key]` | full-width internal notice records |
| Details | frame direct third child | specimen/execution record panel |

Use this core pattern for each global rule:

```css
body[data-rhine-lab-theme] {
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font-family: Bahnschrift, "Arial Narrow", "Noto Sans SC", sans-serif;
}

body[data-rhine-lab-theme] [data-chat-flow-kind] {
  position: relative;
  border-block-end: 1px solid var(--dsw-alias-border-l2);
  border-radius: 0;
}

body[data-rhine-lab-theme] [data-composer-card] {
  border: 1px solid var(--dsw-alias-label-primary);
  border-radius: 2px;
  box-shadow: 5px 5px 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 32%, transparent);
}

body[data-ds-dark-theme][data-rhine-lab-theme] [data-composer-card] {
  box-shadow: 5px 5px 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 44%, transparent);
}
```

At `max-width: 900px`, remove edge inscriptions and nonessential metadata. At `max-width: 640px`, reduce file-header height and record gutters while leaving the Harness collapsed rail untouched. Never set `white-space`, `overflow-x`, or fixed widths on `pre`, `code`, terminal, or diff descendants.

- [ ] **Step 6: Run the visual contracts and full unit suite**

Run: `pnpm test -- tests/palette.spec.ts tests/reconstruction-css.spec.ts`

Expected: both files PASS.

Run: `pnpm test`

Expected: all tests PASS.

Run: `pnpm build`

Expected: build PASS and the bundled CSS contains `data-chat-flow-kind`, `data-composer-card`, `prefers-reduced-motion`, and no `rhine-scan`.

- [ ] **Step 7: Commit the visual reconstruction**

```powershell
git add src/client/palette.ts src/client/rhine.module.css src/client/RhineLabHud.module.css tests/palette.spec.ts tests/reconstruction-css.spec.ts lib
git diff --cached --check
git commit -m "feat: reconstruct Harness as Rhine Lab archive terminal"
```

### Task 4: Settings copy, package metadata, documentation, and publish artifacts

**Files:**
- Modify: `src/client/RhineLabRow.module.css:1-97`
- Modify: `src/client/locales.ts:1-20`
- Modify: `README.md:1-90`
- Modify: `README.zh.md:1-90`
- Modify: `package.json:1-42`
- Modify: `pnpm-lock.yaml`
- Modify: `lib/index.js`
- Modify: `lib/client.js`
- Modify: `lib/client.js.map`

**Interfaces:**
- Consumes: the existing `ui-theme-rhine-lab.enabled` setting without migration.
- Produces: package version `0.2.0` and documentation matching the implemented reconstruction.

- [ ] **Step 1: Write a failing documentation/package contract**

Extend `tests/reconstruction-css.spec.ts` with:

```ts
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')) as {
  version: string
  description: string
}
const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8')
const readmeZh = readFileSync(new URL('../README.zh.md', import.meta.url), 'utf8')

it('documents the supported reconstruction and package version', () => {
  expect(pkg.version).toBe('0.2.0')
  expect(pkg.description).toContain('archive-terminal reconstruction')
  expect(readme).toContain('DeepSeek Harness 0.1.0-rc.5')
  expect(readme).toContain('safe degradation')
  expect(readmeZh).toContain('DeepSeek Harness 0.1.0-rc.5')
  expect(readmeZh).toContain('安全降级')
})
```

- [ ] **Step 2: Run the contract and verify it fails**

Run: `pnpm test -- tests/reconstruction-css.spec.ts`

Expected: FAIL because the package is still `0.1.0` and the READMEs describe cyan holographic decoration.

- [ ] **Step 3: Restyle and recopy the settings row**

Keep the existing control behavior. Change the enabled seal and selected segment from cyan glow to research orange, square the segment geometry, and use these strings:

```ts
export const zh = {
  'rhine.title': '莱茵生命深度界面',
  'rhine.desc': '将 Harness 重组为莱茵生命内部研究终端',
  'rhine.on': '授权',
  'rhine.off': '停用',
} satisfies Record<string, string>

export const en = {
  'rhine.title': 'Rhine Lab Reconstruction',
  'rhine.desc': 'Recompose Harness as a Rhine Lab internal research terminal',
  'rhine.on': 'Authorize',
  'rhine.off': 'Disable',
} satisfies Record<RhineKey, string>
```

- [ ] **Step 4: Update package metadata and both READMEs**

Set `version` to `0.2.0`. Set the description to:

```text
Arknights Rhine Lab archive-terminal reconstruction for the DeepSeek Harness Web GUI, with reversible deep styling and restrained institutional HUD
```

Both READMEs must document:

- the archive-terminal visual system and restrained direct branding;
- light headquarters archive and dark night-operations modes;
- the unchanged General-settings toggle and durable namespace;
- the exact `0.1.0-rc.5` compatibility target and safe degradation behavior;
- that no local reference-site media is redistributed;
- reduced motion and responsive behavior;
- source/tarball installation commands;
- real screenshot links at `screenshots/light.png` and `screenshots/dark.png` after Task 5.

Remove every statement about continuous scanning, holographic hex lattices, or the former cyan primary color.

- [ ] **Step 5: Verify package tests, build, and tarball contents**

Run: `pnpm test`

Expected: all tests PASS.

Run: `pnpm build`

Expected: build PASS.

Run: `pnpm pack --dry-run`

Expected: package name is `dsh-theme-rhine-lab@0.2.0`; output includes `lib`, `src`, `cordis.patch.yml`, both READMEs, and `LICENSE`; it excludes `tests`, `docs`, `.superpowers`, and local reference media.

- [ ] **Step 6: Commit docs and published artifacts**

```powershell
git add package.json pnpm-lock.yaml README.md README.zh.md src/client/RhineLabRow.module.css src/client/locales.ts tests/reconstruction-css.spec.ts lib
git diff --cached --check
git commit -m "docs: publish Rhine Lab reconstruction metadata"
```

### Task 5: Live Harness verification and real screenshots

**Files:**
- Create: `screenshots/light.png`
- Create: `screenshots/dark.png`
- Modify: `README.md`
- Modify: `README.zh.md`

**Interfaces:**
- Consumes: the packed `dsh-theme-rhine-lab-0.2.0.tgz` and the unmodified `D:\Desktop\deepseek-harness` checkout at `0.1.0-rc.5`.
- Produces: verified screenshots and an evidence-backed completion report.

- [ ] **Step 1: Establish clean baselines**

Run in the theme repository:

```powershell
git status --short
pnpm test
pnpm build
```

Expected: clean status before generated screenshot work, all tests PASS, build PASS.

Run against the Harness checkout:

```powershell
git -C 'D:\Desktop\deepseek-harness' status --short
git -C 'D:\Desktop\deepseek-harness' describe --tags --always
```

Expected: no source modifications caused by this project and the checkout resolves to the `0.1.0-rc.5` release line.

- [ ] **Step 2: Pack and install into an isolated Harness home**

Use one PowerShell session so `DSH_HOME` applies to install and server:

```powershell
$qaRoot = Join-Path $env:TEMP 'dsh-rhine-lab-qa'
$packRoot = Join-Path $env:TEMP 'dsh-rhine-lab-pack'
New-Item -ItemType Directory -Force -Path $qaRoot, $packRoot | Out-Null
$env:DSH_HOME = $qaRoot
pnpm pack --pack-destination $packRoot
$tarball = Join-Path $packRoot 'dsh-theme-rhine-lab-0.2.0.tgz'
pnpm -C 'D:\Desktop\deepseek-harness' dsh plugin --profile web add $tarball
pnpm -C 'D:\Desktop\deepseek-harness' dsh --profile web --port 3080
```

Expected: the profile installs under the isolated `$qaRoot`; no file in the Harness checkout changes; the terminal prints a live `http://localhost:3080` URL.

- [ ] **Step 3: Exercise the complete visual/interaction matrix**

Open `http://localhost:3080/?fixture` and verify:

1. blank-session hero renders with lab plate and no blocked controls;
2. settings row toggles the reconstruction off and on without reload;
3. disabling restores the original Harness geometry and colors;
4. light, dark, and system appearances use the approved two-mode design;
5. user, assistant, reasoning, command, running tool, successful tool, error, queue, approval, and turn-tail records remain readable;
6. textarea typing, slash command, attachment, permission, plan, model, send, stop, and keyboard focus remain functional;
7. sidebar collapse/expand and details open/close still follow Harness state;
8. 1440×900, 900×900, and 640×900 viewports have no decorative horizontal overflow;
9. reduced-motion disables validation drawing and state pulses;
10. terminal, diff, code, and long Chinese prose retain their original overflow/readability behavior.

Any functional regression blocks screenshots and returns to the owning task's test cycle.

- [ ] **Step 4: Capture and inspect real screenshots**

At 1440×900, save the active conversation in light mode as `screenshots/light.png` and the same state in dark mode as `screenshots/dark.png`. Each screenshot must show the sidebar, file header, at least one user record, one assistant record, one tool/reasoning record, the composer, and restrained HUD branding.

Inspect both image files at original resolution. Reject captures with clipped controls, unreadable text, accidental scrollbars, oversized branding, or cyan acting as the primary action color.

- [ ] **Step 5: Link screenshots and rerun release verification**

Add these README image links:

```markdown
![Rhine Lab light archive mode](screenshots/light.png)
![Rhine Lab dark night-operations mode](screenshots/dark.png)
```

Run:

```powershell
pnpm test
pnpm build
pnpm pack --dry-run
git diff --check
git status --short
git -C 'D:\Desktop\deepseek-harness' status --short
```

Expected: tests/build/pack PASS; only intended theme files are changed; Harness checkout remains unmodified.

- [ ] **Step 6: Commit verified previews**

```powershell
git add screenshots/light.png screenshots/dark.png README.md README.zh.md lib
git diff --cached --check
git commit -m "docs: add verified Rhine Lab theme previews"
```

- [ ] **Step 7: Final evidence check**

Run:

```powershell
git status --short
git log --oneline -6
```

Expected: clean theme worktree with the design and implementation-plan commits followed by five focused implementation commits. Report the exact test, build, pack, Harness version, viewport, and interaction evidence; do not claim compatibility beyond what was exercised.
