/**
 * Rhine Lab skin row registered into the General section item slot: a title
 * with a description line and a Harness-style authorization pill.
 * Selection reads the store mirror; the face write flips the durable
 * preference and the live skin together.
 */
import type { PropsLocale, PropsRuntime, PropsStore } from '@deepseek-ai/dsh-client-ui-slots'
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import type { RhineKey } from './locales.ts'
import type { createRhineLabRowStore } from './settings-store.ts'
import css from './RhineLabRow.module.css'

/** Injected business face: the durable skin preference write. */
export interface RhineLabRowInjected {
  /** Switch the Rhine Lab skin on or off. */
  setEnabled: (enabled: boolean) => void
}

/** Full component props: runtime share + store share + locale seat + injected face. */
export type RhineLabRowComponentProps =
  PropsRuntime<'settings.general.item'> & PropsStore<ReturnType<typeof createRhineLabRowStore>>
  & PropsLocale<'settings.rhine-lab'> & RhineLabRowInjected

/** Toggle pair order (enabled first). */
const OPTIONS: readonly { value: boolean; labelKey: RhineKey }[] = [
  { value: true, labelKey: 'rhine.on' },
  { value: false, labelKey: 'rhine.off' },
]

/**
 * Render the Rhine Lab skin row.
 * @param props - composed slot props.
 * @returns the row element tree.
 */
export function RhineLabRow({ t, setEnabled, useStore }: RhineLabRowComponentProps) {
  const enabled = useStore(s => s.enabled)
  return (
    <div className={css.group}>
      <div className={css.head}>
        <div className={css.copy}>
          <div className={css.title}>{t('rhine.title')}</div>
          <div className={css.desc}>{t('rhine.desc')}</div>
        </div>
      </div>
      <div className={css.seg}>
        {OPTIONS.map(({ value, labelKey }) => (
          <button
            key={String(value)}
            type="button"
            className={enabled === value ? `${css.segBtn} ${css.segOn}` : css.segBtn}
            aria-pressed={enabled === value}
            onClick={() => { setEnabled(value) }}
          >
            {t(labelKey)}
          </button>
        ))}
      </div>
    </div>
  )
}
