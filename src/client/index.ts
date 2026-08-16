/**
 * Rhine Lab skin plugin, browser half: a durable on/off preference projected
 * onto the theme service and the document. While enabled, a `theme.overrideTokens`
 * layer restyles both palettes (the existing Appearance row keeps selecting
 * light/dark/system) and `data-rhine-lab-theme` is pinned on html and body,
 * which arms the archive-terminal stylesheet and restrained shell HUD. The
 * plugin also registers the feature-owned skin row into the General settings
 * section. The Host settings scope loads and stores the
 * preference in the user-settings document.
 */
import type { BoundActions } from '@deepseek-ai/dsh-client-ui-slots'
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the theme plugin's Context merge (ctx.theme).
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
// Type-only: pulls the settings plugin's Context merge (ctx.settingsScope).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the layout plugin's slot declarations.
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
import type { RhineLabRowInjected } from './RhineLabRow.tsx'
import { RhineLabRow } from './RhineLabRow.tsx'
import { registerRhineLabHud } from './hud-registration.ts'
import { createRhineLabRowStore } from './settings-store.ts'
import { en, zh, type RhineKey } from './locales.ts'
import {
  DEFAULT_ENABLED, RHINE_ENABLED_FIELD, RHINE_SETTINGS_NAMESPACE,
  type RhineSettings,
} from '../theme-settings.ts'
import { createThemeProjector } from './theme-projector.ts'
export { SKIN_ATTRIBUTE } from './theme-projector.ts'
import { RHINE_TOKENS } from './palette.ts'
import './rhine.module.css'

export type { RhineLabRowComponentProps, RhineLabRowInjected } from './RhineLabRow.tsx'
export type { RhineLabRowState } from './settings-store.ts'
export type { RhineKey } from './locales.ts'
export type { RhineSettings } from '../theme-settings.ts'

/** Namespace owning this feature's settings-row copy. */
export const SETTINGS_NS = 'settings.rhine-lab'

/** Override-layer identity under ctx.theme.overrideTokens. */
export const OVERRIDE_SOURCE = 'dsh-theme-rhine-lab'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The Rhine Lab skin row's copy. */
    'settings.rhine-lab': RhineKey
  }
}

/** Required services: the theme override layer, the durable preference scope, and the settings-row seats. */
export const inject = ['theme', 'settingsScope', 'slots', 'locale']

/**
 * Client plugin body: keep the durable on/off preference, project it onto
 * the theme service (token layer) and the document (skin attribute), and
 * register the feature-owned skin row into the General settings section.
 * @param ctx - client cordis context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => registerRhineLabHud(ctx.slots), 'rhine-lab: shell HUD')

  const host = ctx.settingsScope.bind<RhineSettings>({ namespace: RHINE_SETTINGS_NAMESPACE })
  const projection = createThemeProjector(
    () => ctx.theme.overrideTokens(OVERRIDE_SOURCE, RHINE_TOKENS),
    document,
  )

  const store = createRhineLabRowStore()
  let bound: BoundActions<typeof store> | undefined
  const syncRow = (enabled: boolean): void => { bound?.sync(enabled) }
  const readEnabled = (): boolean => host.getSnapshot().value?.enabled ?? DEFAULT_ENABLED

  ctx.effect(() => {
    const read = (): void => {
      const next = readEnabled()
      projection.setEnabled(next)
      syncRow(next)
    }
    const off = host.subscribe(read)
    read()
    return () => {
      off()
      // Retract this plugin's layer and attribute with the fiber (HMR-safe).
      projection.dispose()
    }
  }, 'rhine-lab: settings adoption + skin projection')

  ctx.effect(() => ctx.locale.register(SETTINGS_NS, { zh, en }), 'rhine-lab: settings row dictionaries')

  const injected = (actions: BoundActions<typeof store>): RhineLabRowInjected => {
    bound = actions
    // Re-sync from the getter so no acceptance is lost between subscription
    // and first render.
    syncRow(readEnabled())
    return {
      setEnabled: (next) => {
        void host.set(RHINE_ENABLED_FIELD, next)
        projection.setEnabled(next)
        syncRow(next)
      },
    }
  }
  ctx.slots.inject('settings.general.item', () => ctx.slots.register({
    name: 'settings.general.item',
    id: 'rhine-lab',
    order: 20,
    store,
    locale: SETTINGS_NS,
    inject: injected,
  }, RhineLabRow))
}
