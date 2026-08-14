/** `settings.rhine-lab` namespace dictionaries (the Rhine Lab skin row's copy). */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'rhine.title': '莱茵生命界面',
  'rhine.desc': '明日方舟莱茵生命实验室风格皮肤',
  'rhine.on': '启用',
  'rhine.off': '停用',
} satisfies Record<string, string>

/** The settings.rhine-lab namespace key union. */
export type RhineKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'rhine.title': 'Rhine Lab UI',
  'rhine.desc': 'Arknights Rhine Lab skin',
  'rhine.on': 'On',
  'rhine.off': 'Off',
} satisfies Record<RhineKey, string>
