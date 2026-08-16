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
