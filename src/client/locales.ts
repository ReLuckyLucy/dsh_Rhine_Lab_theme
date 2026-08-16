/** `settings.rhine-lab` namespace dictionaries (the Rhine Lab skin row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'rhine.title': '莱茵生命深度界面',
  'rhine.desc': '将 Harness 重组为莱茵生命内部研究终端',
  'rhine.on': '授权',
  'rhine.off': '停用',
} satisfies Record<string, string>

/** The settings.rhine-lab namespace key union. */
export type RhineKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'rhine.title': 'Rhine Lab Reconstruction',
  'rhine.desc': 'Recompose Harness as a Rhine Lab internal research terminal',
  'rhine.on': 'Authorize',
  'rhine.off': 'Disable',
} satisfies Record<RhineKey, string>
