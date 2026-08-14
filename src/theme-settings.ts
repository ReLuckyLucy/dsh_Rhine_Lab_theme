/** Rhine Lab skin preference stored in the Host user-settings document. */

import z from '@deepseek-ai/schemastery'

/** Settings namespace owned by the Rhine Lab skin plugin. */
export const RHINE_SETTINGS_NAMESPACE = 'ui-theme-rhine-lab'

/** Field carrying whether the Rhine Lab skin is applied. */
export const RHINE_ENABLED_FIELD = 'enabled'

/** Default when the user-settings document has no override: the skin ships on. */
export const DEFAULT_ENABLED = true

/** Durable Rhine Lab skin section shared by the Host schema and the browser scope. */
export interface RhineSettings {
  /** Whether the Rhine Lab skin is applied over the active base theme. */
  enabled: boolean
}

/** Durable settings schema; also the wire envelope the browser scope validates against. */
export const RhineSettingsSchema: z<RhineSettings> = z.object({
  [RHINE_ENABLED_FIELD]: z.boolean().default(DEFAULT_ENABLED),
})
