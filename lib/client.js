window.__ModuleLoader__.load({
	id: "dsh-theme-rhine-lab",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region \0dsh-css:D:\Desktop\dsh_Rhine_Lab_themo\.worktrees\rhine-lab-deep-reconstruction\src\client\RhineLabRow.module.css.mjs
		const css$2 = ".FIu8dW_group{flex-direction:column;gap:12px;display:flex}.FIu8dW_head{align-items:center;gap:10px;display:flex}.FIu8dW_badge{background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l3);clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);width:22px;height:22px;transition:background var(--ds-transition-duration) var(--ds-ease-in-out);flex:none}.FIu8dW_badge[data-on]{background:var(--dsw-alias-brand-primary);box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1), 0 0 10px 1px #4abee88c;border-color:#0000;animation:2.4s ease-in-out infinite FIu8dW_rhine-seal-pulse}@keyframes FIu8dW_rhine-seal-pulse{0%,to{opacity:1}50%{opacity:.72}}@media (prefers-reduced-motion:reduce){.FIu8dW_badge[data-on]{animation:none}}.FIu8dW_copy{flex-direction:column;gap:2px;min-width:0;display:flex}.FIu8dW_title{color:var(--dsw-alias-label-primary);font:var(--dsw-font-base-strong-16)}.FIu8dW_desc{color:var(--dsw-alias-label-tertiary);font:var(--dsw-font-xs-13)}.FIu8dW_seg{gap:6px;display:inline-flex}.FIu8dW_segBtn{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-button-elevated-fill);color:var(--dsw-alias-label-secondary);font:var(--dsw-font-s-strong-14);cursor:pointer;transition:background var(--ds-transition-duration-fast) var(--ds-ease-in-out), color var(--ds-transition-duration-fast) var(--ds-ease-in-out), border-color var(--ds-transition-duration-fast) var(--ds-ease-in-out);border-radius:6px;padding:5px 14px}.FIu8dW_segBtn:hover{background:var(--dsw-alias-button-floating-hover);color:var(--dsw-alias-label-primary)}.FIu8dW_segOn{background:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary-foreground);border-color:#0000}.FIu8dW_segOn:hover{background:var(--dsw-alias-button-primary-hover);color:var(--dsw-alias-label-primary-foreground)}";
		const tagId$2 = "dsh-theme-rhine-lab/RhineLabRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-theme-rhine-lab";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var RhineLabRow_module_css_default = {
			"head": "FIu8dW_head",
			"title": "FIu8dW_title",
			"segBtn": "FIu8dW_segBtn",
			"rhine-seal-pulse": "FIu8dW_rhine-seal-pulse",
			"group": "FIu8dW_group",
			"badge": "FIu8dW_badge",
			"seg": "FIu8dW_seg",
			"segOn": "FIu8dW_segOn",
			"desc": "FIu8dW_desc",
			"copy": "FIu8dW_copy"
		};
		//#endregion
		//#region src/client/RhineLabRow.tsx
		/** Toggle pair order (enabled first). */
		const OPTIONS = [{
			value: true,
			labelKey: "rhine.on"
		}, {
			value: false,
			labelKey: "rhine.off"
		}];
		/**
		* Render the Rhine Lab skin row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function RhineLabRow({ t, setEnabled, useStore }) {
			const enabled = useStore((s) => s.enabled);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: RhineLabRow_module_css_default.group,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: RhineLabRow_module_css_default.head,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: RhineLabRow_module_css_default.badge,
						"data-on": enabled || void 0,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: RhineLabRow_module_css_default.copy,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: RhineLabRow_module_css_default.title,
							children: t("rhine.title")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: RhineLabRow_module_css_default.desc,
							children: t("rhine.desc")
						})]
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: RhineLabRow_module_css_default.seg,
					children: OPTIONS.map(({ value, labelKey }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: enabled === value ? `${RhineLabRow_module_css_default.segBtn} ${RhineLabRow_module_css_default.segOn}` : RhineLabRow_module_css_default.segBtn,
						"aria-pressed": enabled === value,
						onClick: () => {
							setEnabled(value);
						},
						children: t(labelKey)
					}, String(value)))
				})]
			});
		}
		//#endregion
		//#region \0dsh-css:D:\Desktop\dsh_Rhine_Lab_themo\.worktrees\rhine-lab-deep-reconstruction\src\client\RhineLabHud.module.css.mjs
		const css$1 = "._ptYEG_root{z-index:2147483003;pointer-events:none;color:#090b0d9e;letter-spacing:.14em;text-transform:uppercase;user-select:none;font-family:Cascadia Mono,SFMono-Regular,Consolas,monospace;font-size:9px;font-weight:700;line-height:1.2;display:none;position:fixed;inset:0}body[data-rhine-lab-theme] ._ptYEG_root{display:block}body[data-ds-dark-theme][data-rhine-lab-theme] ._ptYEG_root{color:#e7e6dfa8}._ptYEG_plate{background:linear-gradient(90deg,#f27a221f,#0000);border-top:1px solid;border-left:4px solid #f27a22;grid-template-columns:auto 1fr;gap:3px 9px;padding:7px 10px;animation:.42s cubic-bezier(.2,.9,.3,1) both _ptYEG_rhine-hud-validation;display:grid;position:absolute;top:14px;left:16px}._ptYEG_mark{color:#9d430a;border-right:1px solid #f27a22;grid-row:span 2;align-content:center;gap:2px;padding-right:8px;font-size:13px;display:grid}body[data-ds-dark-theme][data-rhine-lab-theme] ._ptYEG_mark{color:#ff8732}._ptYEG_mark i,._ptYEG_validation i{font-style:normal}._ptYEG_company{font-size:10px}._ptYEG_system{opacity:.72}._ptYEG_access{color:#14677c;opacity:.82;border-right:3px solid #2b9fbd;justify-items:end;gap:4px;padding-right:8px;animation:.42s cubic-bezier(.2,.9,.3,1) 60ms both _ptYEG_rhine-hud-validation;display:grid;position:absolute;bottom:16px;right:16px}body[data-ds-dark-theme][data-rhine-lab-theme] ._ptYEG_access{color:#5bc2d8}._ptYEG_edge{transform-origin:50%;opacity:.44;border-bottom:1px solid;padding-bottom:4px;position:absolute;top:50%;right:-72px;transform:rotate(90deg)}._ptYEG_validation{color:#f27a22;gap:4px;animation:.42s cubic-bezier(.2,.9,.3,1) .1s both _ptYEG_rhine-hud-validation;display:flex;position:absolute;top:16px;right:16px}body[data-ds-dark-theme][data-rhine-lab-theme] ._ptYEG_validation{color:#ff8732}._ptYEG_validation i{border:1px solid;width:5px;height:5px;display:block}._ptYEG_validation i:nth-child(2){background:currentColor}@keyframes _ptYEG_rhine-hud-validation{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}@media (width<=900px){._ptYEG_edge,._ptYEG_access{display:none}}@media (width<=640px){._ptYEG_plate{top:8px;left:8px}._ptYEG_system,._ptYEG_validation{display:none}}@media (prefers-reduced-motion:reduce){._ptYEG_plate,._ptYEG_access,._ptYEG_validation{animation:none}}";
		const tagId$1 = "dsh-theme-rhine-lab/RhineLabHud.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-theme-rhine-lab";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var RhineLabHud_module_css_default = {
			"access": "_ptYEG_access",
			"validation": "_ptYEG_validation",
			"company": "_ptYEG_company",
			"mark": "_ptYEG_mark",
			"system": "_ptYEG_system",
			"plate": "_ptYEG_plate",
			"root": "_ptYEG_root",
			"edge": "_ptYEG_edge",
			"rhine-hud-validation": "_ptYEG_rhine-hud-validation"
		};
		//#endregion
		//#region src/client/RhineLabHud.tsx
		function RhineLabHud() {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: RhineLabHud_module_css_default.root,
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: RhineLabHud_module_css_default.plate,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: RhineLabHud_module_css_default.mark,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { children: "+" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", { children: "−" })]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: RhineLabHud_module_css_default.company,
								children: "RHINE LAB LLC."
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: RhineLabHud_module_css_default.system,
								children: "SYNTHESIZE INFORMATION ANALYSIS OS"
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: RhineLabHud_module_css_default.access,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "ACCESS PERMISSION // AUTHORIZED" }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: "FILE NO. DSH–RL–001" })]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: RhineLabHud_module_css_default.edge,
						children: "COMPONENT CONTROL SECTION · INTERNAL DATABASE"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: RhineLabHud_module_css_default.validation,
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("i", {})
						]
					})
				]
			});
		}
		//#endregion
		//#region src/client/hud-registration.ts
		function registerRhineLabHud(slots) {
			return slots.inject("shell.overlay", () => slots.register({
				name: "shell.overlay",
				id: "rhine-lab-hud",
				order: -100
			}, RhineLabHud));
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Rhine Lab skin row slot store: a mirror of the durable skin preference. The
		* plugin's apply-world settings subscription and inject-time re-sync are the
		* only writers; the row component reads via props.useStore. No revision
		* counter: one subscription source feeds this store, so writes are already
		* ordered and idempotent.
		*/
		/**
		* Declares the Rhine Lab row state and write surface.
		* @returns the store handle.
		*/
		function createRhineLabRowStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({ enabled: false }),
				actions: { sync: (d, enabled) => {
					d.enabled = enabled;
				} }
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.rhine-lab` namespace dictionaries (the Rhine Lab skin row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"rhine.title": "莱茵生命界面",
			"rhine.desc": "明日方舟莱茵生命实验室风格皮肤",
			"rhine.on": "启用",
			"rhine.off": "停用"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"rhine.title": "Rhine Lab UI",
			"rhine.desc": "Arknights Rhine Lab skin",
			"rhine.on": "On",
			"rhine.off": "Off"
		};
		//#endregion
		//#region node_modules/.pnpm/@deepseek-ai+cosmokit@1.8.2/node_modules/@deepseek-ai/cosmokit/lib/index.js
		/** Return true when a value is `null` or `undefined`. */
		function isNullable(value) {
			return value === null || value === void 0;
		}
		/** Return true for non-array object values. */
		function isPlainObject(data) {
			return data && typeof data === "object" && !Array.isArray(data);
		}
		/** Filter object entries and return a new object. */
		function filterKeys(object, filter) {
			return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
		}
		/** Map object values while preserving the original key set. */
		function mapValues(object, transform) {
			return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
		}
		/** Pick selected keys from an object, optionally including `undefined` values. */
		function pick(source, keys, forced) {
			if (!keys) return { ...source };
			const result = {};
			for (const key of keys) if (forced || source[key] !== void 0) result[key] = source[key];
			return result;
		}
		/** Test values using `instanceof` with a `toStringTag` fallback. */
		function is(type, value) {
			if (arguments.length === 1) return (value) => is(type, value);
			return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
		}
		function isArrayBufferLike(value) {
			return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
		}
		function isArrayBufferSource(value) {
			return isArrayBufferLike(value) || ArrayBuffer.isView(value);
		}
		/** Binary source detection and base64/hex conversion helpers. */
		var Binary;
		(function(Binary) {
			Binary.is = isArrayBufferLike;
			Binary.isSource = isArrayBufferSource;
			function fromSource(source) {
				if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
				else return source;
			}
			Binary.fromSource = fromSource;
			function toBase64(source) {
				source = fromSource(source);
				if (typeof Buffer !== "undefined") return Buffer.from(source).toString("base64");
				let binary = "";
				const bytes = new Uint8Array(source);
				for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
				return btoa(binary);
			}
			Binary.toBase64 = toBase64;
			function fromBase64(source) {
				if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "base64"));
				return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
			}
			Binary.fromBase64 = fromBase64;
			function toHex(source) {
				source = fromSource(source);
				if (typeof Buffer !== "undefined") return Buffer.from(source).toString("hex");
				return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
			}
			Binary.toHex = toHex;
			function fromHex(source) {
				if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "hex"));
				const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
				const buffer = [];
				for (let i = 0; i < hex.length; i += 2) buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
				return Uint8Array.from(buffer).buffer;
			}
			Binary.fromHex = fromHex;
		})(Binary || (Binary = {}));
		Binary.fromBase64;
		Binary.toBase64;
		Binary.fromHex;
		Binary.toHex;
		/** Deep-clone common JavaScript values while preserving prototypes and cycles. */
		function clone(source, refs = /* @__PURE__ */ new Map()) {
			if (!source || typeof source !== "object") return source;
			if (is("Date", source)) return new Date(source.valueOf());
			if (is("RegExp", source)) return new RegExp(source.source, source.flags);
			if (isArrayBufferLike(source)) return source.slice(0);
			if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
			const cached = refs.get(source);
			if (cached) return cached;
			if (Array.isArray(source)) {
				const result = [];
				refs.set(source, result);
				source.forEach((value, index) => {
					result[index] = Reflect.apply(clone, null, [value, refs]);
				});
				return result;
			}
			const result = Object.create(Object.getPrototypeOf(source));
			refs.set(source, result);
			for (const key of Reflect.ownKeys(source)) {
				const descriptor = { ...Reflect.getOwnPropertyDescriptor(source, key) };
				if ("value" in descriptor) descriptor.value = Reflect.apply(clone, null, [descriptor.value, refs]);
				Reflect.defineProperty(result, key, descriptor);
			}
			return result;
		}
		/** Deeply compare arrays, dates, regexps, buffers, and plain object fields. */
		function deepEqual(a, b, strict) {
			if (a === b) return true;
			if (!strict && isNullable(a) && isNullable(b)) return true;
			if (typeof a !== typeof b) return false;
			if (typeof a !== "object") return false;
			if (!a || !b) return false;
			function check(test, then) {
				return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
			}
			return check(Array.isArray, (a, b) => a.length === b.length && a.every((item, index) => deepEqual(item, b[index]))) ?? check(is("Date"), (a, b) => a.valueOf() === b.valueOf()) ?? check(is("RegExp"), (a, b) => a.source === b.source && a.flags === b.flags) ?? check(isArrayBufferLike, (a, b) => {
				if (a.byteLength !== b.byteLength) return false;
				const viewA = new Uint8Array(a);
				const viewB = new Uint8Array(b);
				for (let i = 0; i < viewA.length; i++) if (viewA[i] !== viewB[i]) return false;
				return true;
			}) ?? Object.keys({
				...a,
				...b
			}).every((key) => deepEqual(a[key], b[key], strict));
		}
		/** Time constants plus parsing and formatting helpers. */
		var Time;
		(function(Time) {
			Time.millisecond = 1;
			Time.second = 1e3;
			Time.minute = Time.second * 60;
			Time.hour = Time.minute * 60;
			Time.day = Time.hour * 24;
			Time.week = Time.day * 7;
			let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
			function setTimezoneOffset(offset) {
				timezoneOffset = offset;
			}
			Time.setTimezoneOffset = setTimezoneOffset;
			function getTimezoneOffset() {
				return timezoneOffset;
			}
			Time.getTimezoneOffset = getTimezoneOffset;
			function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
				if (typeof date === "number") date = new Date(date);
				if (offset === void 0) offset = timezoneOffset;
				return Math.floor((date.valueOf() / Time.minute - offset) / 1440);
			}
			Time.getDateNumber = getDateNumber;
			function fromDateNumber(value, offset) {
				const date = new Date(value * Time.day);
				if (offset === void 0) offset = timezoneOffset;
				return new Date(+date + offset * Time.minute);
			}
			Time.fromDateNumber = fromDateNumber;
			const numeric = /\d+(?:\.\d+)?/.source;
			const timeRegExp = new RegExp(`^${[
				"w(?:eek(?:s)?)?",
				"d(?:ay(?:s)?)?",
				"h(?:our(?:s)?)?",
				"m(?:in(?:ute)?(?:s)?)?",
				"s(?:ec(?:ond)?(?:s)?)?"
			].map((unit) => `(${numeric}${unit})?`).join("")}$`);
			function parseTime(source) {
				const capture = timeRegExp.exec(source);
				if (!capture) return 0;
				return (parseFloat(capture[1]) * Time.week || 0) + (parseFloat(capture[2]) * Time.day || 0) + (parseFloat(capture[3]) * Time.hour || 0) + (parseFloat(capture[4]) * Time.minute || 0) + (parseFloat(capture[5]) * Time.second || 0);
			}
			Time.parseTime = parseTime;
			function parseDate(date) {
				const parsed = parseTime(date);
				if (parsed) date = Date.now() + parsed;
				else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
				else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
				return date ? new Date(date) : /* @__PURE__ */ new Date();
			}
			Time.parseDate = parseDate;
			function format(ms) {
				const abs = Math.abs(ms);
				if (abs >= Time.day - Time.hour / 2) return Math.round(ms / Time.day) + "d";
				else if (abs >= Time.hour - Time.minute / 2) return Math.round(ms / Time.hour) + "h";
				else if (abs >= Time.minute - Time.second / 2) return Math.round(ms / Time.minute) + "m";
				else if (abs >= Time.second) return Math.round(ms / Time.second) + "s";
				return ms + "ms";
			}
			Time.format = format;
			function toDigits(source, length = 2) {
				return source.toString().padStart(length, "0");
			}
			Time.toDigits = toDigits;
			function template(template, time = /* @__PURE__ */ new Date()) {
				return template.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
			}
			Time.template = template;
		})(Time || (Time = {}));
		//#endregion
		//#region node_modules/.pnpm/@deepseek-ai+schemastery@3.18.1/node_modules/@deepseek-ai/schemastery/lib/index.mjs
		const kSchema = Symbol.for("schemastery");
		const kValidationError = Symbol.for("ValidationError");
		globalThis.__schemastery_index__ ??= 0;
		globalThis.__schemastery_refs__ = void 0;
		var ValidationError = class extends TypeError {
			options;
			name = "ValidationError";
			constructor(message, options) {
				let prefix = "$";
				for (const segment of options.path || []) if (typeof segment === "string") prefix += "." + segment;
				else if (typeof segment === "number") prefix += "[" + segment + "]";
				else if (typeof segment === "symbol") prefix += `[Symbol(${segment.toString()})]`;
				if (prefix.startsWith(".")) prefix = prefix.slice(1);
				super((prefix === "$" ? "" : `${prefix} `) + message);
				this.options = options;
			}
			static is(error) {
				return !!error?.[kValidationError];
			}
		};
		Object.defineProperty(ValidationError.prototype, kValidationError, { value: true });
		const Schema = function(options) {
			const schema = function(data, options = {}) {
				return Schema.resolve(data, schema, options)[0];
			};
			if (options.refs) {
				const refs = mapValues(options.refs, (options) => new Schema(options));
				const getRef = (uid) => refs[uid];
				for (const key in refs) {
					const options = refs[key];
					options.sKey = getRef(options.sKey);
					options.inner = getRef(options.inner);
					options.list = options.list && options.list.map(getRef);
					options.dict = options.dict && mapValues(options.dict, getRef);
				}
				return refs[options.uid];
			}
			Object.assign(schema, options);
			if (typeof schema.callback === "string") try {
				schema.callback = new Function("return " + schema.callback)();
			} catch {}
			Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
			Object.setPrototypeOf(schema, Schema.prototype);
			schema.meta ||= {};
			schema.toString = schema.toString.bind(schema);
			return schema;
		};
		Schema.prototype = Object.create(Function.prototype);
		Schema.prototype[kSchema] = true;
		Object.defineProperty(Schema.prototype, "~standard", { get() {
			return {
				version: 1,
				vendor: "schemastery",
				validate: (value) => {
					try {
						return { value: Schema.resolve(value, this, {})[0] };
					} catch (error) {
						if (ValidationError.is(error)) return { issues: [{
							message: error.message,
							path: error.options.path
						}] };
						throw error;
					}
				}
			};
		} });
		Schema.ValidationError = ValidationError;
		Schema.prototype.toJSON = function toJSON() {
			if (globalThis.__schemastery_refs__) {
				globalThis.__schemastery_refs__[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
				return this.uid;
			}
			globalThis.__schemastery_refs__ = { [this.uid]: { ...this } };
			globalThis.__schemastery_refs__[this.uid] = JSON.parse(JSON.stringify({ ...this }));
			const result = {
				uid: this.uid,
				refs: globalThis.__schemastery_refs__
			};
			globalThis.__schemastery_refs__ = void 0;
			return result;
		};
		Schema.prototype.set = function set(key, value) {
			this.dict[key] = value;
			return this;
		};
		Schema.prototype.push = function push(value) {
			this.list.push(value);
			return this;
		};
		function mergeDesc(original, messages) {
			const result = typeof original === "string" ? { "": original } : { ...original };
			for (const locale in messages) {
				const value = messages[locale];
				if (value?.$description || value?.$desc) result[locale] = value.$description || value.$desc;
				else if (typeof value === "string") result[locale] = value;
			}
			return result;
		}
		function getInner(value) {
			return value?.$value ?? value?.$inner;
		}
		function extractKeys(data) {
			return filterKeys(data ?? {}, (key) => !key.startsWith("$"));
		}
		Schema.prototype.i18n = function i18n(messages) {
			const schema = Schema(this);
			const desc = mergeDesc(schema.meta.description, messages);
			if (Object.keys(desc).length) schema.meta.description = desc;
			if (schema.dict) schema.dict = mapValues(schema.dict, (inner, key) => {
				return inner.i18n(mapValues(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
			});
			if (schema.list) schema.list = schema.list.map((inner, index) => {
				return inner.i18n(mapValues(messages, (data = {}) => {
					if (Array.isArray(getInner(data))) return getInner(data)[index];
					if (Array.isArray(data)) return data[index];
					return extractKeys(data);
				}));
			});
			if (schema.inner) schema.inner = schema.inner.i18n(mapValues(messages, (data) => {
				if (getInner(data)) return getInner(data);
				return extractKeys(data);
			}));
			if (schema.sKey) schema.sKey = schema.sKey.i18n(mapValues(messages, (data) => data?.$key));
			return schema;
		};
		Schema.prototype.extra = function extra(key, value) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		};
		for (const key of [
			"required",
			"disabled",
			"collapse",
			"hidden",
			"loose"
		]) Object.assign(Schema.prototype, { [key](value = true) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		} });
		Schema.prototype.deprecated = function deprecated() {
			const schema = Schema(this);
			schema.meta.badges ||= [];
			schema.meta.badges.push({
				text: "deprecated",
				type: "danger"
			});
			return schema;
		};
		Schema.prototype.experimental = function experimental() {
			const schema = Schema(this);
			schema.meta.badges ||= [];
			schema.meta.badges.push({
				text: "experimental",
				type: "warning"
			});
			return schema;
		};
		Schema.prototype.pattern = function pattern(regexp) {
			const schema = Schema(this);
			const pattern = pick(regexp, ["source", "flags"]);
			schema.meta = {
				...schema.meta,
				pattern
			};
			return schema;
		};
		Schema.prototype.simplify = function simplify(value) {
			if (deepEqual(value, this.meta.default, this.type === "dict")) return null;
			if (isNullable(value)) return value;
			if (this.type === "object" || this.type === "dict") {
				const result = {};
				for (const key in value) {
					const item = (this.type === "object" ? this.dict[key] : this.inner)?.simplify(value[key]);
					if (this.type === "dict" || !isNullable(item)) result[key] = item;
				}
				if (deepEqual(result, this.meta.default, this.type === "dict")) return null;
				return result;
			} else if (this.type === "array" || this.type === "tuple") {
				const result = [];
				value.forEach((value, index) => {
					const schema = this.type === "array" ? this.inner : this.list[index];
					const item = schema ? schema.simplify(value) : value;
					result.push(item);
				});
				return result;
			} else if (this.type === "intersect") {
				const result = {};
				for (const item of this.list) Object.assign(result, item.simplify(value));
				return result;
			} else if (this.type === "union") for (const schema of this.list) try {
				Schema.resolve(value, schema, {});
				return schema.simplify(value);
			} catch {}
			return value;
		};
		Schema.prototype.toString = function toString(inline) {
			return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
		};
		Schema.prototype.role = function role(role, extra) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				role,
				extra
			};
			return schema;
		};
		for (const key of [
			"default",
			"link",
			"comment",
			"description",
			"max",
			"min",
			"step"
		]) Object.assign(Schema.prototype, { [key](value) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		} });
		const resolvers = {};
		Schema.extend = function extend(type, resolve) {
			resolvers[type] = resolve;
		};
		Schema.resolve = function resolve(data, schema, options = {}, strict = false) {
			if (!schema) return [data];
			if (options.ignore?.(data, schema)) return [data];
			if (isNullable(data) && schema.type !== "lazy") {
				if (schema.meta.required) throw new ValidationError(`missing required value`, options);
				let current = schema;
				let fallback = schema.meta.default;
				while (current?.type === "intersect" && isNullable(fallback)) {
					current = current.list[0];
					fallback = current?.meta.default;
				}
				if (isNullable(fallback)) return [data];
				data = clone(fallback);
			}
			const callback = resolvers[schema.type];
			if (!callback) throw new ValidationError(`unsupported type "${schema.type}"`, options);
			try {
				return callback(data, schema, options, strict);
			} catch (error) {
				if (!schema.meta.loose) throw error;
				return [schema.meta.default];
			}
		};
		Schema.from = function from(source) {
			if (isNullable(source)) return Schema.any();
			else if ([
				"string",
				"number",
				"boolean"
			].includes(typeof source)) return Schema.const(source).required();
			else if (source[kSchema]) return source;
			else if (typeof source === "function") switch (source) {
				case String: return Schema.string().required();
				case Number: return Schema.number().required();
				case Boolean: return Schema.boolean().required();
				case Function: return Schema.function().required();
				default: return Schema.is(source).required();
			}
			else throw new TypeError(`cannot infer schema from ${source}`);
		};
		Schema.lazy = function lazy(builder) {
			const toJSON = () => {
				if (!schema.inner[kSchema]) {
					schema.inner = schema.builder();
					schema.inner.meta = {
						...schema.meta,
						...schema.inner.meta
					};
				}
				return schema.inner.toJSON();
			};
			const schema = new Schema({
				type: "lazy",
				builder,
				inner: { toJSON }
			});
			return schema;
		};
		Schema.natural = function natural() {
			return Schema.number().step(1).min(0);
		};
		Schema.percent = function percent() {
			return Schema.number().step(.01).min(0).max(1).role("slider");
		};
		Schema.date = function date() {
			return Schema.union([Schema.is(Date), Schema.transform(Schema.string().role("datetime"), (value, options) => {
				const date = new Date(value);
				if (isNaN(+date)) throw new ValidationError(`invalid date "${value}"`, options);
				return date;
			}, true)]);
		};
		Schema.regExp = function regExp(flag = "") {
			return Schema.union([Schema.is(RegExp), Schema.transform(Schema.string().role("regexp", { flag }), (value, options) => {
				try {
					return new RegExp(value, flag);
				} catch (e) {
					throw new ValidationError(e.message, options);
				}
			}, true)]);
		};
		Schema.arrayBuffer = function arrayBuffer(encoding) {
			return Schema.union([
				Schema.is(ArrayBuffer),
				Schema.is(SharedArrayBuffer),
				Schema.transform(Schema.any(), (value, options) => {
					if (Binary.isSource(value)) return Binary.fromSource(value);
					throw new ValidationError(`expected ArrayBufferSource but got ${value}`, options);
				}, true),
				...encoding ? [Schema.transform(Schema.string(), (value, options) => {
					try {
						return encoding === "base64" ? Binary.fromBase64(value) : Binary.fromHex(value);
					} catch (e) {
						throw new ValidationError(e.message, options);
					}
				}, true)] : []
			]);
		};
		Schema.extend("lazy", (data, schema, options, strict) => {
			if (!schema.inner[kSchema]) {
				schema.inner = schema.builder();
				schema.inner.meta = {
					...schema.meta,
					...schema.inner.meta
				};
			}
			return Schema.resolve(data, schema.inner, options, strict);
		});
		Schema.extend("any", (data) => {
			return [data];
		});
		Schema.extend("never", (data, _, options) => {
			throw new ValidationError(`expected nullable but got ${data}`, options);
		});
		Schema.extend("const", (data, { value }, options) => {
			if (deepEqual(data, value)) return [value];
			throw new ValidationError(`expected ${value} but got ${data}`, options);
		});
		function checkWithinRange(data, meta, description, options, skipMin = false) {
			const { max = Infinity, min = -Infinity } = meta;
			if (data > max) throw new ValidationError(`expected ${description} <= ${max} but got ${data}`, options);
			if (data < min && !skipMin) throw new ValidationError(`expected ${description} >= ${min} but got ${data}`, options);
		}
		Schema.extend("string", (data, { meta }, options) => {
			if (typeof data !== "string") throw new ValidationError(`expected string but got ${data}`, options);
			if (meta.pattern) {
				const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
				if (!regexp.test(data)) throw new ValidationError(`expect string to match regexp ${regexp}`, options);
			}
			checkWithinRange(data.length, meta, "string length", options);
			return [data];
		});
		function decimalShift(data, digits) {
			const str = data.toString();
			if (str.includes("e")) return data * Math.pow(10, digits);
			const index = str.indexOf(".");
			if (index === -1) return data * Math.pow(10, digits);
			const frac = str.slice(index + 1);
			const integer = str.slice(0, index);
			if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
			return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
		}
		function isMultipleOf(data, min, step) {
			step = Math.abs(step);
			if (!/^\d+\.\d+$/.test(step.toString())) return (data - min) % step === 0;
			const index = step.toString().indexOf(".");
			const digits = step.toString().slice(index + 1).length;
			return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
		}
		Schema.extend("number", (data, { meta }, options) => {
			if (typeof data !== "number") throw new ValidationError(`expected number but got ${data}`, options);
			checkWithinRange(data, meta, "number", options);
			const { step } = meta;
			if (step && !isMultipleOf(data, meta.min ?? 0, step)) throw new ValidationError(`expected number multiple of ${step} but got ${data}`, options);
			return [data];
		});
		Schema.extend("boolean", (data, _, options) => {
			if (typeof data === "boolean") return [data];
			throw new ValidationError(`expected boolean but got ${data}`, options);
		});
		Schema.extend("bitset", (data, { bits, meta }, options) => {
			let value = 0, keys = [];
			if (typeof data === "number") {
				value = data;
				for (const key in bits) if (data & bits[key]) keys.push(key);
			} else if (Array.isArray(data)) {
				keys = data;
				for (const key of keys) {
					if (typeof key !== "string") throw new ValidationError(`expected string but got ${key}`, options);
					if (key in bits) value |= bits[key];
				}
			} else throw new ValidationError(`expected number or array but got ${data}`, options);
			if (value === meta.default) return [value];
			return [value, keys];
		});
		Schema.extend("function", (data, _, options) => {
			if (typeof data === "function") return [data];
			throw new ValidationError(`expected function but got ${data}`, options);
		});
		Schema.extend("is", (data, { constructor }, options) => {
			if (typeof constructor === "function") {
				if (data instanceof constructor) return [data];
				throw new ValidationError(`expected ${constructor.name} but got ${data}`, options);
			} else {
				if (isNullable(data)) throw new ValidationError(`expected ${constructor} but got ${data}`, options);
				let prototype = Object.getPrototypeOf(data);
				while (prototype) {
					if (prototype.constructor?.name === constructor) return [data];
					prototype = Object.getPrototypeOf(prototype);
				}
				throw new ValidationError(`expected ${constructor} but got ${data}`, options);
			}
		});
		function property(data, key, schema, options) {
			try {
				const [value, adapted] = Schema.resolve(data[key], schema, {
					...options,
					path: [...options.path || [], key]
				});
				if (adapted !== void 0) data[key] = adapted;
				return value;
			} catch (e) {
				if (!options?.autofix) throw e;
				delete data[key];
				return schema.meta.default;
			}
		}
		Schema.extend("array", (data, { inner, meta }, options) => {
			if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
			checkWithinRange(data.length, meta, "array length", options, !isNullable(inner.meta.default));
			return [data.map((_, index) => property(data, index, inner, options))];
		});
		Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
			if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
			const result = {};
			for (const key in data) {
				let rKey;
				try {
					rKey = Schema.resolve(key, sKey, options)[0];
				} catch (error) {
					if (strict) continue;
					throw error;
				}
				result[rKey] = property(data, key, inner, options);
				data[rKey] = data[key];
				if (key !== rKey) delete data[key];
			}
			return [result];
		});
		Schema.extend("tuple", (data, { list }, options, strict) => {
			if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
			const result = list.map((inner, index) => property(data, index, inner, options));
			if (strict) return [result];
			result.push(...data.slice(list.length));
			return [result];
		});
		function merge(result, data) {
			for (const key in data) {
				if (key in result) continue;
				result[key] = data[key];
			}
		}
		Schema.extend("object", (data, { dict }, options, strict) => {
			if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
			const result = {};
			for (const key in dict) {
				const value = property(data, key, dict[key], options);
				if (!isNullable(value) || key in data) result[key] = value;
			}
			if (!strict) merge(result, data);
			return [result];
		});
		Schema.extend("union", (data, { list, toString }, options, strict) => {
			const messages = [];
			for (const inner of list) try {
				return Schema.resolve(data, inner, options, strict);
			} catch (error) {
				messages.push(error);
			}
			throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
		});
		Schema.extend("intersect", (data, { list, toString }, options, strict) => {
			if (!list.length) return [data];
			let result;
			for (const inner of list) {
				const value = Schema.resolve(data, inner, options, true)[0];
				if (isNullable(value)) continue;
				if (isNullable(result)) result = value;
				else if (typeof result !== typeof value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
				else if (typeof value === "object") merge(result ??= {}, value);
				else if (result !== value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
			}
			if (!strict && isPlainObject(data)) merge(result, data);
			return [result];
		});
		Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
			const [result, adapted = data] = Schema.resolve(data, inner, options, true);
			if (preserve) return [callback(result)];
			else return [callback(result), callback(adapted)];
		});
		const formatters = {};
		function defineMethod(name, keys, format) {
			formatters[name] = format;
			Object.assign(Schema, { [name](...args) {
				const schema = new Schema({ type: name });
				keys.forEach((key, index) => {
					switch (key) {
						case "sKey":
							schema.sKey = args[index] ?? Schema.string();
							break;
						case "inner":
							schema.inner = Schema.from(args[index]);
							break;
						case "list":
							schema.list = args[index].map(Schema.from);
							break;
						case "dict":
							schema.dict = mapValues(args[index], Schema.from);
							break;
						case "bits":
							schema.bits = {};
							for (const key in args[index]) {
								if (typeof args[index][key] !== "number") continue;
								schema.bits[key] = args[index][key];
							}
							break;
						case "callback": {
							const callback = schema.callback = args[index];
							callback["toJSON"] ||= () => callback.toString();
							break;
						}
						case "constructor": {
							const constructor = schema.constructor = args[index];
							if (typeof constructor === "function") constructor["toJSON"] ||= () => constructor["name"];
							break;
						}
						default: schema[key] = args[index];
					}
				});
				if (name === "object" || name === "dict") schema.meta.default = {};
				else if (name === "array" || name === "tuple") schema.meta.default = [];
				else if (name === "bitset") schema.meta.default = 0;
				return schema;
			} });
		}
		defineMethod("is", ["constructor"], ({ constructor }) => {
			if (typeof constructor === "function") return constructor.name;
			else return constructor;
		});
		defineMethod("any", [], () => "any");
		defineMethod("never", [], () => "never");
		defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
		defineMethod("string", [], () => "string");
		defineMethod("number", [], () => "number");
		defineMethod("boolean", [], () => "boolean");
		defineMethod("bitset", ["bits"], () => "bitset");
		defineMethod("function", [], () => "function");
		defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
		defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
		defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
		defineMethod("object", ["dict"], ({ dict }) => {
			if (Object.keys(dict).length === 0) return "{}";
			return `{ ${Object.entries(dict).map(([key, inner]) => {
				return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
			}).join(", ")} }`;
		});
		defineMethod("union", ["list"], ({ list }, inline) => {
			const result = list.map(({ toString: format }) => format()).join(" | ");
			return inline ? `(${result})` : result;
		});
		defineMethod("intersect", ["list"], ({ list }) => {
			return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
		});
		defineMethod("transform", [
			"inner",
			"callback",
			"preserve"
		], ({ inner }, isInner) => inner.toString(isInner));
		//#endregion
		//#region src/theme-settings.ts
		/** Rhine Lab skin preference stored in the Host user-settings document. */
		/** Settings namespace owned by the Rhine Lab skin plugin. */
		const RHINE_SETTINGS_NAMESPACE = "ui-theme-rhine-lab";
		/** Field carrying whether the Rhine Lab skin is applied. */
		const RHINE_ENABLED_FIELD = "enabled";
		Schema.object({ [RHINE_ENABLED_FIELD]: Schema.boolean().default(true) });
		//#endregion
		//#region src/client/theme-projector.ts
		const SKIN_ATTRIBUTE = "data-rhine-lab-theme";
		function createThemeProjector(installTokens, doc) {
			let retractTokens;
			const setEnabled = (enabled) => {
				if (enabled) {
					retractTokens ??= installTokens();
					doc.documentElement.setAttribute(SKIN_ATTRIBUTE, "");
					doc.body.setAttribute(SKIN_ATTRIBUTE, "");
					return;
				}
				retractTokens?.();
				retractTokens = void 0;
				doc.documentElement.removeAttribute(SKIN_ATTRIBUTE);
				doc.body.removeAttribute(SKIN_ATTRIBUTE);
			};
			return {
				setEnabled,
				dispose: () => {
					setEnabled(false);
				}
			};
		}
		//#endregion
		//#region src/client/palette.ts
		const PAPER = "rgb(231, 229, 223)";
		const NIGHT = "rgb(17, 21, 25)";
		const INK = "rgb(9, 11, 13)";
		const OFF_WHITE = "rgb(231, 230, 223)";
		const RESEARCH_ORANGE = "rgb(242, 122, 34)";
		const RESEARCH_ORANGE_DARK = "rgb(255, 135, 50)";
		const DATA_CYAN = "rgb(43, 159, 189)";
		const DATA_CYAN_DARK = "rgb(91, 194, 216)";
		const SECURITY_RED = "rgb(190, 54, 48)";
		const SECURITY_RED_DARK = "rgb(244, 100, 88)";
		/** The complete Rhine Lab alias-token override layer. */
		const RHINE_TOKENS = {
			"--dsw-alias-bg-base": {
				light: PAPER,
				dark: NIGHT
			},
			"--dsw-alias-bg-layer-1": {
				light: "rgb(242, 240, 234)",
				dark: "rgb(24, 29, 34)"
			},
			"--dsw-alias-bg-layer-2": {
				light: "rgb(220, 218, 211)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-bg-layer-3": {
				light: "rgb(207, 204, 196)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-bg-mask-1": {
				light: "rgba(9, 11, 13, 0.24)",
				dark: "rgba(0, 0, 0, 0.5)"
			},
			"--dsw-alias-bg-mask-2": {
				light: "rgba(9, 11, 13, 0.12)",
				dark: "rgba(0, 0, 0, 0.2)"
			},
			"--dsw-alias-bg-mask-3": {
				light: "rgba(9, 11, 13, 0.48)",
				dark: "rgba(0, 0, 0, 0.48)"
			},
			"--dsw-alias-bg-mask-photo": {
				light: "rgba(9, 11, 13, 0.88)",
				dark: "rgba(0, 0, 0, 0.88)"
			},
			"--dsw-alias-bg-mask-drop": {
				light: "rgba(231, 229, 223, 0.72)",
				dark: "rgba(24, 29, 34, 0.72)"
			},
			"--dsw-alias-bg-module-platform": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-bg-multi-select": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-bg-overlay": {
				light: "rgb(247, 245, 238)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-bg-skeleton": {
				light: "rgba(9, 11, 13, 0.08)",
				dark: "rgba(166, 181, 188, 0.1)"
			},
			"--dsw-alias-border-inverted2": {
				light: "rgba(0, 0, 0, 0)",
				dark: "rgba(166, 181, 188, 0.08)"
			},
			"--dsw-alias-border-inverted": {
				light: "rgba(0, 0, 0, 0)",
				dark: "rgba(166, 181, 188, 0.06)"
			},
			"--dsw-alias-border-l1": {
				light: "rgba(9, 11, 13, 0.1)",
				dark: "rgba(166, 181, 188, 0.08)"
			},
			"--dsw-alias-border-l2-darkmode-thin": {
				light: "rgba(9, 11, 13, 0.16)",
				dark: "rgba(166, 181, 188, 0.1)"
			},
			"--dsw-alias-border-l2": {
				light: "rgba(9, 11, 13, 0.18)",
				dark: "rgba(166, 181, 188, 0.16)"
			},
			"--dsw-alias-border-l3": {
				light: "rgba(9, 11, 13, 0.26)",
				dark: "rgba(166, 181, 188, 0.24)"
			},
			"--dsw-alias-border-l4": {
				light: "rgba(9, 11, 13, 0.38)",
				dark: "rgba(166, 181, 188, 0.34)"
			},
			"--dsw-alias-brand-primary-invert": {
				light: INK,
				dark: OFF_WHITE
			},
			"--dsw-alias-brand-primary-new-colorprimary-new-color": {
				light: RESEARCH_ORANGE,
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-brand-primary": {
				light: RESEARCH_ORANGE,
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-brand-text": {
				light: "rgb(157, 67, 10)",
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-button-contrast-fill": {
				light: INK,
				dark: OFF_WHITE
			},
			"--dsw-alias-button-elevated-fill": {
				light: "rgb(247, 245, 238)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-button-floating-fill": {
				light: "rgb(247, 245, 238)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-button-floating-hover": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-button-ghost-active-border": {
				light: "rgba(9, 11, 13, 0.48)",
				dark: "rgba(231, 230, 223, 0.44)"
			},
			"--dsw-alias-button-ghost-active-fill": {
				light: "rgb(220, 218, 211)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-button-ghost-active-hover": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(48, 55, 60)"
			},
			"--dsw-alias-button-info-fill": {
				light: DATA_CYAN,
				dark: DATA_CYAN_DARK
			},
			"--dsw-alias-button-info-hover": {
				light: "rgb(32, 134, 162)",
				dark: "rgb(112, 207, 226)"
			},
			"--dsw-alias-button-primary-dimmed": {
				light: "rgb(227, 194, 168)",
				dark: "rgb(92, 61, 42)"
			},
			"--dsw-alias-button-primary-fill": {
				light: RESEARCH_ORANGE,
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-button-primary-hover": {
				light: "rgb(207, 91, 18)",
				dark: "rgb(255, 158, 91)"
			},
			"--dsw-alias-button-tool-bar-fill-invisible": {
				light: "rgba(9, 11, 13, 0.36)",
				dark: "rgba(17, 21, 25, 0.55)"
			},
			"--dsw-alias-button-tool-bar-fill": {
				light: "rgba(9, 11, 13, 0.5)",
				dark: "rgba(17, 21, 25, 0.65)"
			},
			"--dsw-alias-button-tool-bar-hover": {
				light: "rgba(9, 11, 13, 0.62)",
				dark: "rgba(17, 21, 25, 0.75)"
			},
			"--dsw-alias-interactive-bg-active": {
				light: "rgba(242, 122, 34, 0.16)",
				dark: "rgba(255, 135, 50, 0.18)"
			},
			"--dsw-alias-interactive-bg-hover-accent": {
				light: "rgba(242, 122, 34, 0.2)",
				dark: "rgba(255, 135, 50, 0.26)"
			},
			"--dsw-alias-interactive-bg-hover-danger": {
				light: "rgba(190, 54, 48, 0.08)",
				dark: "rgba(244, 100, 88, 0.16)"
			},
			"--dsw-alias-interactive-bg-hover-solid": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-interactive-bg-hover": {
				light: "rgba(9, 11, 13, 0.07)",
				dark: "rgba(231, 230, 223, 0.09)"
			},
			"--dsw-alias-label-caption": {
				light: "rgb(112, 109, 102)",
				dark: "rgb(135, 146, 151)"
			},
			"--dsw-alias-label-dimmed": {
				light: "rgb(184, 181, 173)",
				dark: "rgb(76, 86, 91)"
			},
			"--dsw-alias-label-primary-bluish": {
				light: "rgb(20, 54, 62)",
				dark: OFF_WHITE
			},
			"--dsw-alias-label-primary-dimmed": {
				light: "rgb(55, 57, 57)",
				dark: "rgb(199, 201, 196)"
			},
			"--dsw-alias-label-primary-foreground": {
				light: OFF_WHITE,
				dark: NIGHT
			},
			"--dsw-alias-label-primary-inverted": {
				light: OFF_WHITE,
				dark: NIGHT
			},
			"--dsw-alias-label-primary": {
				light: INK,
				dark: OFF_WHITE
			},
			"--dsw-alias-label-secondary": {
				light: "rgb(69, 69, 66)",
				dark: "rgb(181, 185, 181)"
			},
			"--dsw-alias-label-tertiary": {
				light: "rgb(105, 103, 97)",
				dark: "rgb(145, 153, 154)"
			},
			"--dsw-alias-markdown-citation": {
				light: "rgb(220, 218, 211)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-markdown-code-block-banner": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-markdown-code-block": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(13, 17, 20)"
			},
			"--dsw-alias-markdown-code-segment-selected": {
				light: "rgb(247, 245, 238)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-markdown-code-segment-unselected": {
				light: "rgb(226, 224, 217)",
				dark: "rgb(13, 17, 20)"
			},
			"--dsw-alias-markdown-inline-code": {
				light: "rgb(218, 215, 207)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-markdown-placeholder": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-markdown-tag": {
				light: "rgb(226, 224, 217)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-alias-scrollbar-bg-l1": {
				light: "rgb(190, 187, 178)",
				dark: "rgb(48, 55, 60)"
			},
			"--dsw-alias-scrollbar-bg-l2": {
				light: "rgb(190, 187, 178)",
				dark: "rgb(48, 55, 60)"
			},
			"--dsw-alias-scrollbar-hover-l1": {
				light: "rgb(158, 155, 147)",
				dark: "rgb(66, 75, 80)"
			},
			"--dsw-alias-scrollbar-hover-l2": {
				light: "rgb(158, 155, 147)",
				dark: "rgb(66, 75, 80)"
			},
			"--dsw-alias-feedback-positive": {
				light: DATA_CYAN,
				dark: DATA_CYAN_DARK
			},
			"--dsw-alias-state-business-primary": {
				light: RESEARCH_ORANGE,
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-state-business-tertiary": {
				light: "rgb(242, 219, 200)",
				dark: "rgb(66, 43, 29)"
			},
			"--dsw-alias-state-error-primary": {
				light: SECURITY_RED,
				dark: SECURITY_RED_DARK
			},
			"--dsw-alias-state-error-secondary": {
				light: SECURITY_RED,
				dark: SECURITY_RED_DARK
			},
			"--dsw-alias-state-success-primary": {
				light: DATA_CYAN,
				dark: DATA_CYAN_DARK
			},
			"--dsw-alias-state-success-secondary": {
				light: "rgb(58, 174, 202)",
				dark: "rgb(112, 207, 226)"
			},
			"--dsw-alias-state-success-tertiary": {
				light: "rgb(205, 231, 234)",
				dark: "rgb(20, 54, 61)"
			},
			"--dsw-alias-state-warn-label": {
				light: "rgb(157, 67, 10)",
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-state-warn-primary": {
				light: RESEARCH_ORANGE,
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-alias-state-warn-secondary": {
				light: "rgb(224, 104, 28)",
				dark: "rgb(255, 158, 91)"
			},
			"--dsw-alias-state-warn-tertiary": {
				light: "rgb(244, 224, 207)",
				dark: "rgb(66, 43, 29)"
			},
			"--dsw-alias-toast-bg": {
				light: INK,
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-alias-tooltip-bg": {
				light: INK,
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-specific-bubble-highlight": {
				light: "rgb(238, 207, 182)",
				dark: "rgb(74, 48, 31)"
			},
			"--dsw-specific-bubble": {
				light: "rgb(237, 226, 214)",
				dark: "rgb(44, 35, 29)"
			},
			"--dsw-specific-input-major": {
				light: "rgb(247, 245, 238)",
				dark: "rgb(31, 37, 42)"
			},
			"--dsw-specific-login-input": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(13, 17, 20)"
			},
			"--dsw-specific-menu": {
				light: "rgb(247, 245, 238)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-specific-selector": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(40, 47, 52)"
			},
			"--dsw-specific-sidebar-fill": {
				light: "rgb(216, 213, 205)",
				dark: "rgb(14, 18, 21)"
			},
			"--dsw-specific-sidebar-nav-item-active-accent": {
				light: RESEARCH_ORANGE,
				dark: RESEARCH_ORANGE_DARK
			},
			"--dsw-specific-sidebar-nav-item-active": {
				light: "rgb(232, 207, 187)",
				dark: "rgb(67, 44, 30)"
			},
			"--dsw-specific-sidebar-nav-item-hover": {
				light: "rgb(225, 222, 214)",
				dark: "rgb(24, 29, 34)"
			},
			"--dsw-specific-tip": {
				light: "rgb(237, 235, 228)",
				dark: "rgb(40, 47, 52)"
			},
			"--ds-ease-in-out": {
				light: "cubic-bezier(0.2, 0.9, 0.3, 1)",
				dark: "cubic-bezier(0.2, 0.9, 0.3, 1)"
			},
			"--ds-transition-duration": {
				light: "0.18s",
				dark: "0.18s"
			},
			"--ds-transition-duration-fast": {
				light: "0.09s",
				dark: "0.09s"
			},
			"--ds-transition-duration-slow": {
				light: "0.26s",
				dark: "0.26s"
			},
			"--dsw-font-family": {
				light: "'Bahnschrift', 'DIN Alternate', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif",
				dark: "'Bahnschrift', 'DIN Alternate', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif"
			}
		};
		//#endregion
		//#region \0dsh-css:D:\Desktop\dsh_Rhine_Lab_themo\.worktrees\rhine-lab-deep-reconstruction\src\client\rhine.module.css.mjs
		const css = "body[data-rhine-lab-theme]{background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:Bahnschrift,Arial Narrow,Noto Sans SC,sans-serif}body[data-rhine-lab-theme] ::selection{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 36%, transparent);color:var(--dsw-alias-label-primary)}body[data-rhine-lab-theme] :focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}body[data-rhine-lab-theme] :has(>[data-shell-overlay]){isolation:isolate;background-color:var(--dsw-alias-bg-base);background-image:linear-gradient(var(--dsw-alias-border-l1) 1px, transparent 1px), linear-gradient(90deg, var(--dsw-alias-border-l1) 1px, transparent 1px);background-size:24px 24px;border:0;border-radius:0;grid-template-columns:minmax(56px,238px) minmax(0,1fr) minmax(220px,320px);min-height:100dvh;display:grid;position:relative}body[data-rhine-lab-theme] :has(>[data-shell-overlay]):before{content:\"RL / ARCHIVE 00-17 · AUTHORIZED RESEARCH TERMINAL\";z-index:2;color:var(--dsw-alias-label-tertiary);letter-spacing:.14em;pointer-events:none;font-family:Cascadia Mono,Consolas,monospace;font-size:9px;position:absolute;inset-block-start:8px;inset-inline-end:14px}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:first-child:not([data-shell-overlay]){border-inline-end:1px solid var(--dsw-alias-label-primary);background:color-mix(in srgb, var(--dsw-specific-sidebar-fill) 94%, transparent);text-transform:uppercase;letter-spacing:.055em;border-radius:0;position:relative}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:first-child:not([data-shell-overlay]):before{content:\"DEPARTMENT INDEX\";border-block-end:1px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-tertiary);letter-spacing:.16em;padding:11px 14px;font:600 9px/1.2 Cascadia Mono,Consolas,monospace;display:block}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:first-child:not([data-shell-overlay]) [aria-current=page],body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:first-child:not([data-shell-overlay]) [data-active=true]{box-shadow:inset 4px 0 0 var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary);border-radius:0}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:nth-child(2):not([data-shell-overlay]){border-inline-end:1px solid var(--dsw-alias-border-l3);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 92%, transparent);min-width:0}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:nth-child(3):not([data-shell-overlay]){border-inline-start:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);border-radius:0;min-width:0}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:nth-child(3):not([data-shell-overlay]):before{content:\"SPECIMEN / EXECUTION RECORD\";border-block-end:1px solid var(--dsw-alias-label-primary);color:var(--dsw-alias-label-secondary);letter-spacing:.13em;padding:12px 14px;font:600 9px/1.2 Cascadia Mono,Consolas,monospace;display:block}body[data-rhine-lab-theme] [data-phase]{border-block-end:1px solid var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border-radius:0;min-height:58px;padding-block:18px 10px;padding-inline:26px;position:relative}body[data-rhine-lab-theme] [data-phase]:before{content:\"RL / CASE FILE\";color:var(--dsw-alias-brand-text);letter-spacing:.17em;font:700 8px/1 Cascadia Mono,Consolas,monospace;position:absolute;inset-block-start:6px;inset-inline-start:26px}body[data-rhine-lab-theme] [data-phase]:after{content:attr(data-phase);color:var(--dsw-alias-label-tertiary);letter-spacing:.12em;font:600 8px/1 Cascadia Mono,Consolas,monospace;position:absolute;inset-block-start:6px;inset-inline-end:26px}body[data-rhine-lab-theme] [data-conversation-scroll]{background:color-mix(in srgb, var(--dsw-alias-bg-base) 96%, transparent);border-radius:0}body[data-rhine-lab-theme] [data-chat-flow]{counter-reset:rhine-record;border-radius:0;padding-block:18px 32px;padding-inline:clamp(18px,3vw,42px);position:relative}body[data-rhine-lab-theme] [data-chat-flow]:before{content:\"\";border-inline-start:1px solid var(--dsw-alias-border-l3);pointer-events:none;position:absolute;inset-block:18px 32px;inset-inline-start:clamp(32px,3vw + 14px,56px)}body[data-rhine-lab-theme] [data-chat-flow-kind]{counter-increment:rhine-record;border:0;border-block-end:1px solid var(--dsw-alias-border-l2);background:color-mix(in srgb, var(--dsw-alias-bg-layer-1) 36%, transparent);border-radius:0;margin:0;padding:22px 24px 22px 48px;position:relative}body[data-rhine-lab-theme] [data-chat-flow-kind]:before{content:counter(rhine-record, decimal-leading-zero);color:var(--dsw-alias-label-tertiary);letter-spacing:.08em;font:700 9px/1 Cascadia Mono,Consolas,monospace;position:absolute;inset-block-start:22px;inset-inline-start:8px}body[data-rhine-lab-theme] [data-chat-flow-kind*=user i]{border-inline-start:3px solid var(--dsw-alias-brand-primary)}body[data-rhine-lab-theme] [data-chat-flow-kind*=assistant i]{border-inline-start:3px solid var(--dsw-alias-label-primary)}body[data-rhine-lab-theme] [data-chat-flow-kind*=tool i],body[data-rhine-lab-theme] [data-chat-flow-kind*=reason i]{border-inline-start:3px solid var(--dsw-alias-feedback-positive)}body[data-rhine-lab-theme] [data-variant][data-state]{color:#e7e6df;background:#111519;border:1px solid #49545a;border-radius:0;position:relative;box-shadow:inset 3px 0 #49545a}body[data-rhine-lab-theme] [data-variant][data-state]:before{content:attr(data-variant) \" / \" attr(data-state);color:#a6b5bc;letter-spacing:.13em;text-transform:uppercase;border-block-end:1px solid #49545a;padding:7px 10px;font:700 8px/1.2 Cascadia Mono,Consolas,monospace;display:block}body[data-rhine-lab-theme] [data-variant][data-state=running]{border-color:var(--dsw-alias-feedback-positive);box-shadow:inset 3px 0 0 var(--dsw-alias-feedback-positive)}body[data-rhine-lab-theme] [data-variant][data-state=running]:after{content:\"LIVE\";border:1px solid var(--dsw-alias-feedback-positive);color:var(--dsw-alias-feedback-positive);letter-spacing:.12em;padding:2px 5px;font:700 8px/1 Cascadia Mono,Consolas,monospace;animation:1.6s steps(2,end) infinite PHXa5a_rhine-data-seal;position:absolute;inset-block-start:6px;inset-inline-end:9px}body[data-rhine-lab-theme] [data-variant][data-state=error],body[data-rhine-lab-theme] [data-variant][data-state=failed]{border-color:var(--dsw-alias-state-error-primary);box-shadow:inset 4px 0 0 var(--dsw-alias-state-error-primary)}body[data-rhine-lab-theme] [data-composer-card]{border:1px solid var(--dsw-alias-label-primary);background:var(--dsw-specific-input-major);box-shadow:5px 5px 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 32%, transparent);border-radius:2px;margin-block:14px 18px;position:relative}body[data-rhine-lab-theme] [data-composer-card]:before{content:\"CMD.DECK / SERIAL RL-017\";border-block-end:1px solid var(--dsw-alias-border-l3);color:var(--dsw-alias-label-tertiary);letter-spacing:.14em;padding:6px 10px;font:700 8px/1.2 Cascadia Mono,Consolas,monospace;display:block}body[data-rhine-lab-theme] [data-input-scroll]{background:0 0;border-radius:0;min-height:42px;padding-block:10px;padding-inline:12px}body[data-rhine-lab-theme] [data-composer-card] button[type=submit],body[data-rhine-lab-theme] [data-composer-card] button[aria-label*=send i]{border:1px solid var(--dsw-alias-label-primary);background:var(--dsw-alias-brand-primary);color:#090b0d;box-shadow:2px 2px 0 var(--dsw-alias-label-primary);border-radius:0}body[data-rhine-lab-theme] [data-queue-dock]{border:1px solid var(--dsw-alias-border-l4);border-inline-start:4px solid var(--dsw-alias-feedback-positive);background:var(--dsw-alias-bg-layer-1);border-radius:0;margin-block:10px}body[data-rhine-lab-theme] [data-queue-dock]:before{content:\"EXECUTION QUEUE\";border-block-end:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);letter-spacing:.13em;padding:6px 10px;font:700 8px/1.2 Cascadia Mono,Consolas,monospace;display:block}body[data-rhine-lab-theme] [data-approval-key]{border:1px solid var(--dsw-alias-border-l4);border-inline-start:4px solid var(--dsw-alias-brand-primary);background:color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, var(--dsw-alias-bg-layer-1));border-radius:0;margin-block:8px;padding:12px 14px;display:block}body[data-rhine-lab-theme] [data-approval-key]:before{content:\"AUTHORIZATION \" attr(data-approval-key);color:var(--dsw-alias-brand-text);letter-spacing:.13em;margin-block-end:6px;font:700 8px/1.2 Cascadia Mono,Consolas,monospace;display:block}body[data-ds-dark-theme][data-rhine-lab-theme] [data-composer-card]{box-shadow:5px 5px 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 44%, transparent)}body[data-ds-dark-theme][data-rhine-lab-theme] [data-phase],body[data-ds-dark-theme][data-rhine-lab-theme] [data-queue-dock]{background:var(--dsw-alias-bg-layer-1)}@keyframes PHXa5a_rhine-data-seal{0%,48%{opacity:1}49%,to{opacity:.55}}@media (width<=900px){body[data-rhine-lab-theme] :has(>[data-shell-overlay]){grid-template-columns:minmax(48px,208px) minmax(0,1fr)}body[data-rhine-lab-theme] :has(>[data-shell-overlay]):before{content:none}body[data-rhine-lab-theme] :has(>[data-shell-overlay])>:nth-child(3):not([data-shell-overlay]){display:none}body[data-rhine-lab-theme] [data-phase]:after{content:none}}@media (width<=640px){body[data-rhine-lab-theme] [data-phase]{min-height:46px;padding-block:15px 8px;padding-inline:14px}body[data-rhine-lab-theme] [data-phase]:before{inset-inline-start:14px}body[data-rhine-lab-theme] [data-chat-flow]{padding-block:10px 22px;padding-inline:10px}body[data-rhine-lab-theme] [data-chat-flow]:before{inset-block:10px 22px;inset-inline-start:27px}body[data-rhine-lab-theme] [data-chat-flow-kind]{padding:16px 10px 16px 38px}body[data-rhine-lab-theme] [data-chat-flow-kind]:before{inset-block-start:17px;inset-inline-start:5px}body[data-rhine-lab-theme] [data-composer-card]{margin-inline:8px}}@media (prefers-reduced-motion:reduce){body[data-rhine-lab-theme] [data-variant][data-state=running]:after{animation:none!important}body[data-rhine-lab-theme] [data-composer-card],body[data-rhine-lab-theme] [data-chat-flow-kind],body[data-rhine-lab-theme] [data-queue-dock],body[data-rhine-lab-theme] [data-approval-key]{transition:none!important}}";
		const tagId = "dsh-theme-rhine-lab/rhine.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-theme-rhine-lab";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region src/client/index.ts
		/** Namespace owning this feature's settings-row copy. */
		const SETTINGS_NS = "settings.rhine-lab";
		/** Override-layer identity under ctx.theme.overrideTokens. */
		const OVERRIDE_SOURCE = "dsh-theme-rhine-lab";
		/** Required services: the theme override layer, the durable preference scope, and the settings-row seats. */
		const inject = [
			"theme",
			"settingsScope",
			"slots",
			"locale"
		];
		/**
		* Client plugin body: keep the durable on/off preference, project it onto
		* the theme service (token layer) and the document (skin attribute), and
		* register the feature-owned skin row into the General settings section.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => registerRhineLabHud(ctx.slots), "rhine-lab: shell HUD");
			const host = ctx.settingsScope.bind({ namespace: RHINE_SETTINGS_NAMESPACE });
			const projection = createThemeProjector(() => ctx.theme.overrideTokens(OVERRIDE_SOURCE, RHINE_TOKENS), document);
			const store = createRhineLabRowStore();
			let bound;
			const syncRow = (enabled) => {
				bound?.sync(enabled);
			};
			const readEnabled = () => host.getSnapshot().value?.enabled ?? true;
			ctx.effect(() => {
				const read = () => {
					const next = readEnabled();
					projection.setEnabled(next);
					syncRow(next);
				};
				const off = host.subscribe(read);
				read();
				return () => {
					off();
					projection.dispose();
				};
			}, "rhine-lab: settings adoption + skin projection");
			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "rhine-lab: settings row dictionaries");
			const injected = (actions) => {
				bound = actions;
				syncRow(readEnabled());
				return { setEnabled: (next) => {
					host.set(RHINE_ENABLED_FIELD, next);
					projection.setEnabled(next);
					syncRow(next);
				} };
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "rhine-lab",
				order: 20,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, RhineLabRow));
		}
		//#endregion
		exports.OVERRIDE_SOURCE = OVERRIDE_SOURCE;
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.SKIN_ATTRIBUTE = SKIN_ATTRIBUTE;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map