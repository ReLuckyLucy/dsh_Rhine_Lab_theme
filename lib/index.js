import { settingsNamespace } from "@deepseek-ai/dsh-settings";
import z from "@deepseek-ai/schemastery";
//#region src/theme-settings.ts
/** Rhine Lab skin preference stored in the Host user-settings document. */
/** Settings namespace owned by the Rhine Lab skin plugin. */
const RHINE_SETTINGS_NAMESPACE = "ui-theme-rhine-lab";
/** Durable settings schema; also the wire envelope the browser scope validates against. */
const RhineSettingsSchema = z.object({ ["enabled"]: z.boolean().default(true) });
//#endregion
//#region src/index.ts
const RHINE_NAMESPACE = settingsNamespace(RHINE_SETTINGS_NAMESPACE);
/**
* Register the durable skin preference section when the Host settings service
* is composed.
* @param ctx - Host context that may acquire the settings service.
*/
function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(RHINE_NAMESPACE, RhineSettingsSchema);
	});
}
//#endregion
export { apply };
