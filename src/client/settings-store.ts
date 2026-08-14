/**
 * Rhine Lab skin row slot store: a mirror of the durable skin preference. The
 * plugin's apply-world settings subscription and inject-time re-sync are the
 * only writers; the row component reads via props.useStore. No revision
 * counter: one subscription source feeds this store, so writes are already
 * ordered and idempotent.
 */
import { defineStore, type EngineStoreHandle } from '@deepseek-ai/dsh-client-runtime/client'

/** Store state mirrored from the durable skin preference. */
export interface RhineLabRowState {
  /** Whether the Rhine Lab skin is applied. */
  enabled: boolean
}

/** Declared action shape giving the exported factory a stable return type. */
type RhineLabRowActions = {
  sync: (d: RhineLabRowState, enabled: boolean) => void
}

/**
 * Declares the Rhine Lab row state and write surface.
 * @returns the store handle.
 */
export function createRhineLabRowStore(): EngineStoreHandle<RhineLabRowState, RhineLabRowActions> {
  return defineStore({
    init: (): RhineLabRowState => ({ enabled: false }),
    actions: {
      sync: (d, enabled) => { d.enabled = enabled },
    },
  })
}
