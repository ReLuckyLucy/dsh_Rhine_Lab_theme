/**
 * Host registration for the Rhine Lab skin preference: the settings namespace
 * schema that makes `ui-theme-rhine-lab.enabled` a durable, validated section
 * in the user-settings document. The browser half binds the same namespace.
 */

import type { Context } from '@deepseek-ai/cordis'
import { settingsNamespace } from '@deepseek-ai/dsh-settings'
import { RHINE_SETTINGS_NAMESPACE, RhineSettingsSchema } from './theme-settings.ts'

const RHINE_NAMESPACE = settingsNamespace(RHINE_SETTINGS_NAMESPACE)

/**
 * Register the durable skin preference section when the Host settings service
 * is composed.
 * @param ctx - Host context that may acquire the settings service.
 */
export function apply(ctx: Context): void {
  ctx.inject(['settings'], (settingsCtx) => {
    settingsCtx.settings.register(RHINE_NAMESPACE, RhineSettingsSchema)
  })
}
