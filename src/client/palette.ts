/**
 * Rhine Lab token override layer. One { light, dark } pair per alias token;
 * the theme service folds the pair matching the active color scheme into the
 * base palette, so the existing Appearance row (light/dark/system) keeps
 * selecting the overall mood while this layer supplies the Rhine Lab palette.
 *
 * Design reference: Arknights' Rhine Lab (莱茵生命) as an archive terminal:
 * warm paper and dense ink in light mode, charcoal records in dark mode,
 * research orange for primary actions, cyan for live data, and security red
 * for failed or unsafe states.
 */

import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

const PAPER = 'rgb(231, 229, 223)'
const NIGHT = 'rgb(17, 21, 25)'
const INK = 'rgb(9, 11, 13)'
const OFF_WHITE = 'rgb(231, 230, 223)'
const RESEARCH_ORANGE = 'rgb(242, 122, 34)'
const RESEARCH_ORANGE_DARK = 'rgb(255, 135, 50)'
const DATA_CYAN = 'rgb(43, 159, 189)'
const DATA_CYAN_DARK = 'rgb(91, 194, 216)'
const SECURITY_RED = 'rgb(190, 54, 48)'
const SECURITY_RED_DARK = 'rgb(244, 100, 88)'

/** The complete Rhine Lab alias-token override layer. */
export const RHINE_TOKENS: ThemeTokenOverrides = {
  // ── surfaces ────────────────────────────────────────────────────────────
  '--dsw-alias-bg-base': { light: PAPER, dark: NIGHT },
  '--dsw-alias-bg-layer-1': { light: 'rgb(242, 240, 234)', dark: 'rgb(24, 29, 34)' },
  '--dsw-alias-bg-layer-2': { light: 'rgb(220, 218, 211)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-bg-layer-3': { light: 'rgb(207, 204, 196)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-bg-mask-1': { light: 'rgba(9, 11, 13, 0.24)', dark: 'rgba(0, 0, 0, 0.5)' },
  '--dsw-alias-bg-mask-2': { light: 'rgba(9, 11, 13, 0.12)', dark: 'rgba(0, 0, 0, 0.2)' },
  '--dsw-alias-bg-mask-3': { light: 'rgba(9, 11, 13, 0.48)', dark: 'rgba(0, 0, 0, 0.48)' },
  '--dsw-alias-bg-mask-photo': { light: 'rgba(9, 11, 13, 0.88)', dark: 'rgba(0, 0, 0, 0.88)' },
  '--dsw-alias-bg-mask-drop': { light: 'rgba(231, 229, 223, 0.72)', dark: 'rgba(24, 29, 34, 0.72)' },
  '--dsw-alias-bg-module-platform': { light: 'rgb(237, 235, 228)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-bg-multi-select': { light: 'rgb(237, 235, 228)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-bg-overlay': { light: 'rgb(247, 245, 238)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-bg-skeleton': { light: 'rgba(9, 11, 13, 0.08)', dark: 'rgba(166, 181, 188, 0.1)' },

  // ── borders ─────────────────────────────────────────────────────────────
  '--dsw-alias-border-inverted2': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(166, 181, 188, 0.08)' },
  '--dsw-alias-border-inverted': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(166, 181, 188, 0.06)' },
  '--dsw-alias-border-l1': { light: 'rgba(9, 11, 13, 0.1)', dark: 'rgba(166, 181, 188, 0.08)' },
  '--dsw-alias-border-l2-darkmode-thin': { light: 'rgba(9, 11, 13, 0.16)', dark: 'rgba(166, 181, 188, 0.1)' },
  '--dsw-alias-border-l2': { light: 'rgba(9, 11, 13, 0.18)', dark: 'rgba(166, 181, 188, 0.16)' },
  '--dsw-alias-border-l3': { light: 'rgba(9, 11, 13, 0.26)', dark: 'rgba(166, 181, 188, 0.24)' },
  '--dsw-alias-border-l4': { light: 'rgba(9, 11, 13, 0.38)', dark: 'rgba(166, 181, 188, 0.34)' },

  // ── brand and buttons ───────────────────────────────────────────────────
  '--dsw-alias-brand-primary-invert': { light: INK, dark: OFF_WHITE },
  '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: RESEARCH_ORANGE, dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-brand-primary': { light: RESEARCH_ORANGE, dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-brand-text': { light: 'rgb(157, 67, 10)', dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-button-contrast-fill': { light: INK, dark: OFF_WHITE },
  '--dsw-alias-button-elevated-fill': { light: 'rgb(247, 245, 238)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-button-floating-fill': { light: 'rgb(247, 245, 238)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-button-floating-hover': { light: 'rgb(237, 235, 228)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-button-ghost-active-border': { light: 'rgba(9, 11, 13, 0.48)', dark: 'rgba(231, 230, 223, 0.44)' },
  '--dsw-alias-button-ghost-active-fill': { light: 'rgb(220, 218, 211)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-button-ghost-active-hover': { light: 'rgb(237, 235, 228)', dark: 'rgb(48, 55, 60)' },
  '--dsw-alias-button-info-fill': { light: DATA_CYAN, dark: DATA_CYAN_DARK },
  '--dsw-alias-button-info-hover': { light: 'rgb(32, 134, 162)', dark: 'rgb(112, 207, 226)' },
  '--dsw-alias-button-primary-dimmed': { light: 'rgb(227, 194, 168)', dark: 'rgb(92, 61, 42)' },
  '--dsw-alias-button-primary-fill': { light: RESEARCH_ORANGE, dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-button-primary-hover': { light: 'rgb(207, 91, 18)', dark: 'rgb(255, 158, 91)' },
  '--dsw-alias-button-tool-bar-fill-invisible': { light: 'rgba(9, 11, 13, 0.36)', dark: 'rgba(17, 21, 25, 0.55)' },
  '--dsw-alias-button-tool-bar-fill': { light: 'rgba(9, 11, 13, 0.5)', dark: 'rgba(17, 21, 25, 0.65)' },
  '--dsw-alias-button-tool-bar-hover': { light: 'rgba(9, 11, 13, 0.62)', dark: 'rgba(17, 21, 25, 0.75)' },

  // ── interactive states ──────────────────────────────────────────────────
  '--dsw-alias-interactive-bg-active': { light: 'rgba(242, 122, 34, 0.16)', dark: 'rgba(255, 135, 50, 0.18)' },
  '--dsw-alias-interactive-bg-hover-accent': { light: 'rgba(242, 122, 34, 0.2)', dark: 'rgba(255, 135, 50, 0.26)' },
  '--dsw-alias-interactive-bg-hover-danger': { light: 'rgba(190, 54, 48, 0.08)', dark: 'rgba(244, 100, 88, 0.16)' },
  '--dsw-alias-interactive-bg-hover-solid': { light: 'rgb(237, 235, 228)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-interactive-bg-hover': { light: 'rgba(9, 11, 13, 0.07)', dark: 'rgba(231, 230, 223, 0.09)' },

  // ── labels ──────────────────────────────────────────────────────────────
  '--dsw-alias-label-caption': { light: 'rgb(112, 109, 102)', dark: 'rgb(135, 146, 151)' },
  '--dsw-alias-label-dimmed': { light: 'rgb(184, 181, 173)', dark: 'rgb(76, 86, 91)' },
  '--dsw-alias-label-primary-bluish': { light: 'rgb(20, 54, 62)', dark: OFF_WHITE },
  '--dsw-alias-label-primary-dimmed': { light: 'rgb(55, 57, 57)', dark: 'rgb(199, 201, 196)' },
  '--dsw-alias-label-primary-foreground': { light: OFF_WHITE, dark: NIGHT },
  '--dsw-alias-label-primary-inverted': { light: OFF_WHITE, dark: NIGHT },
  '--dsw-alias-label-primary': { light: INK, dark: OFF_WHITE },
  '--dsw-alias-label-secondary': { light: 'rgb(69, 69, 66)', dark: 'rgb(181, 185, 181)' },
  '--dsw-alias-label-tertiary': { light: 'rgb(105, 103, 97)', dark: 'rgb(145, 153, 154)' },

  // ── markdown surfaces ───────────────────────────────────────────────────
  '--dsw-alias-markdown-citation': { light: 'rgb(220, 218, 211)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-markdown-code-block-banner': { light: 'rgb(237, 235, 228)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-markdown-code-block': { light: 'rgb(237, 235, 228)', dark: 'rgb(13, 17, 20)' },
  '--dsw-alias-markdown-code-segment-selected': { light: 'rgb(247, 245, 238)', dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-markdown-code-segment-unselected': { light: 'rgb(226, 224, 217)', dark: 'rgb(13, 17, 20)' },
  '--dsw-alias-markdown-inline-code': { light: 'rgb(218, 215, 207)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-markdown-placeholder': { light: 'rgb(237, 235, 228)', dark: 'rgb(31, 37, 42)' },
  '--dsw-alias-markdown-tag': { light: 'rgb(226, 224, 217)', dark: 'rgb(31, 37, 42)' },

  // ── scrollbars ──────────────────────────────────────────────────────────
  '--dsw-alias-scrollbar-bg-l1': { light: 'rgb(190, 187, 178)', dark: 'rgb(48, 55, 60)' },
  '--dsw-alias-scrollbar-bg-l2': { light: 'rgb(190, 187, 178)', dark: 'rgb(48, 55, 60)' },
  '--dsw-alias-scrollbar-hover-l1': { light: 'rgb(158, 155, 147)', dark: 'rgb(66, 75, 80)' },
  '--dsw-alias-scrollbar-hover-l2': { light: 'rgb(158, 155, 147)', dark: 'rgb(66, 75, 80)' },

  // ── state colors: research / data / security ────────────────────────────
  '--dsw-alias-feedback-positive': { light: DATA_CYAN, dark: DATA_CYAN_DARK },
  '--dsw-alias-state-business-primary': { light: RESEARCH_ORANGE, dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-state-business-tertiary': { light: 'rgb(242, 219, 200)', dark: 'rgb(66, 43, 29)' },
  '--dsw-alias-state-error-primary': { light: SECURITY_RED, dark: SECURITY_RED_DARK },
  '--dsw-alias-state-error-secondary': { light: SECURITY_RED, dark: SECURITY_RED_DARK },
  '--dsw-alias-state-success-primary': { light: DATA_CYAN, dark: DATA_CYAN_DARK },
  '--dsw-alias-state-success-secondary': { light: 'rgb(58, 174, 202)', dark: 'rgb(112, 207, 226)' },
  '--dsw-alias-state-success-tertiary': { light: 'rgb(205, 231, 234)', dark: 'rgb(20, 54, 61)' },
  '--dsw-alias-state-warn-label': { light: 'rgb(157, 67, 10)', dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-state-warn-primary': { light: RESEARCH_ORANGE, dark: RESEARCH_ORANGE_DARK },
  '--dsw-alias-state-warn-secondary': { light: 'rgb(224, 104, 28)', dark: 'rgb(255, 158, 91)' },
  '--dsw-alias-state-warn-tertiary': { light: 'rgb(244, 224, 207)', dark: 'rgb(66, 43, 29)' },

  // ── popups ──────────────────────────────────────────────────────────────
  '--dsw-alias-toast-bg': { light: INK, dark: 'rgb(40, 47, 52)' },
  '--dsw-alias-tooltip-bg': { light: INK, dark: 'rgb(40, 47, 52)' },

  // ── product-specific fills ──────────────────────────────────────────────
  '--dsw-specific-bubble-highlight': { light: 'rgb(238, 207, 182)', dark: 'rgb(74, 48, 31)' },
  '--dsw-specific-bubble': { light: 'rgb(237, 226, 214)', dark: 'rgb(44, 35, 29)' },
  '--dsw-specific-input-major': { light: 'rgb(247, 245, 238)', dark: 'rgb(31, 37, 42)' },
  '--dsw-specific-login-input': { light: 'rgb(237, 235, 228)', dark: 'rgb(13, 17, 20)' },
  '--dsw-specific-menu': { light: 'rgb(247, 245, 238)', dark: 'rgb(40, 47, 52)' },
  '--dsw-specific-selector': { light: 'rgb(237, 235, 228)', dark: 'rgb(40, 47, 52)' },
  '--dsw-specific-sidebar-fill': { light: 'rgb(216, 213, 205)', dark: 'rgb(14, 18, 21)' },
  '--dsw-specific-sidebar-nav-item-active-accent': { light: RESEARCH_ORANGE, dark: RESEARCH_ORANGE_DARK },
  '--dsw-specific-sidebar-nav-item-active': { light: 'rgb(232, 207, 187)', dark: 'rgb(67, 44, 30)' },
  '--dsw-specific-sidebar-nav-item-hover': { light: 'rgb(225, 222, 214)', dark: 'rgb(24, 29, 34)' },
  '--dsw-specific-tip': { light: 'rgb(237, 235, 228)', dark: 'rgb(40, 47, 52)' },

  // ── motion: snappier lab-readout decel than the stock curve ─────────────
  '--ds-ease-in-out': {
    light: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
    dark: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
  },
  '--ds-transition-duration': { light: '0.18s', dark: '0.18s' },
  '--ds-transition-duration-fast': { light: '0.09s', dark: '0.09s' },
  '--ds-transition-duration-slow': { light: '0.26s', dark: '0.26s' },

  // ── typography: DIN-style technical face ahead of the system stack ──────
  '--dsw-font-family': {
    light: "'Bahnschrift', 'DIN Alternate', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif",
    dark: "'Bahnschrift', 'DIN Alternate', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif",
  },
}
