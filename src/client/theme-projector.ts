export const SKIN_ATTRIBUTE = 'data-rhine-lab-theme'

export interface ThemeProjection {
  setEnabled: (enabled: boolean) => void
  dispose: () => void
}

export function createThemeProjector(
  installTokens: () => () => void,
  doc: Pick<Document, 'documentElement' | 'body'>,
): ThemeProjection {
  let retractTokens: (() => void) | undefined

  const setEnabled = (enabled: boolean): void => {
    if (enabled) {
      retractTokens ??= installTokens()
      doc.documentElement.setAttribute(SKIN_ATTRIBUTE, '')
      doc.body.setAttribute(SKIN_ATTRIBUTE, '')
      return
    }
    retractTokens?.()
    retractTokens = undefined
    doc.documentElement.removeAttribute(SKIN_ATTRIBUTE)
    doc.body.removeAttribute(SKIN_ATTRIBUTE)
  }

  return { setEnabled, dispose: () => { setEnabled(false) } }
}
