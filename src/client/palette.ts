/**
 * Rhine Lab token override layer. One { light, dark } pair per alias token;
 * the theme service folds the pair matching the active color scheme into the
 * base palette, so the existing Appearance row (light/dark/system) keeps
 * selecting the overall mood while this layer supplies the Rhine Lab palette.
 *
 * Design reference: Arknights' Rhine Lab (莱茵生命) — a Columbian scientific
 * institute whose visual language is a cold, clinical lab aesthetic: near-
 * white surfaces with an ice-blue cast, cyan-blue structural accents, deep
 * ink-navy labels, thin low-contrast hairlines, and teal/amber state colors.
 */

import type { ThemeTokenOverrides } from '@deepseek-ai/dsh-client-ui-theme/client'

/** Ice-cyan brand hue: light surfaces use the deep ink of the lab print. */
const LAB_INK = 'rgb(13, 42, 58)'
/** Primary cyan-blue: buttons, focus rings, active nav accents. */
const LAB_PRIMARY = 'rgb(23, 121, 164)'
/** Brighter cyan for hover and glow accents. */
const LAB_GLOW = 'rgb(74, 190, 232)'

/** The complete Rhine Lab alias-token override layer. */
export const RHINE_TOKENS: ThemeTokenOverrides = {
  // ── surfaces ────────────────────────────────────────────────────────────
  '--dsw-alias-bg-base': { light: 'rgb(233, 241, 246)', dark: 'rgb(8, 22, 30)' },
  '--dsw-alias-bg-layer-1': { light: 'rgb(244, 249, 252)', dark: 'rgb(13, 31, 41)' },
  '--dsw-alias-bg-layer-2': { light: 'rgb(228, 238, 244)', dark: 'rgb(17, 38, 50)' },
  '--dsw-alias-bg-layer-3': { light: 'rgb(219, 232, 240)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-bg-mask-1': { light: 'rgba(8, 30, 42, 0.24)', dark: 'rgba(0, 0, 0, 0.5)' },
  '--dsw-alias-bg-mask-2': { light: 'rgba(8, 30, 42, 0.12)', dark: 'rgba(0, 0, 0, 0.2)' },
  '--dsw-alias-bg-mask-3': { light: 'rgba(8, 30, 42, 0.48)', dark: 'rgba(0, 0, 0, 0.48)' },
  '--dsw-alias-bg-mask-photo': { light: 'rgba(8, 26, 36, 0.88)', dark: 'rgba(0, 0, 0, 0.88)' },
  '--dsw-alias-bg-mask-drop': { light: 'rgba(233, 241, 246, 0.72)', dark: 'rgba(13, 31, 41, 0.72)' },
  '--dsw-alias-bg-module-platform': { light: 'rgb(240, 246, 250)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-bg-multi-select': { light: 'rgb(240, 246, 250)', dark: 'rgb(17, 38, 50)' },
  '--dsw-alias-bg-overlay': { light: 'rgb(250, 253, 254)', dark: 'rgb(28, 56, 72)' },
  '--dsw-alias-bg-skeleton': { light: 'rgba(20, 80, 108, 0.08)', dark: 'rgba(150, 210, 238, 0.1)' },

  // ── borders ─────────────────────────────────────────────────────────────
  '--dsw-alias-border-inverted2': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(150, 210, 238, 0.08)' },
  '--dsw-alias-border-inverted': { light: 'rgba(0, 0, 0, 0)', dark: 'rgba(150, 210, 238, 0.06)' },
  '--dsw-alias-border-l1': { light: 'rgba(9, 58, 82, 0.1)', dark: 'rgba(150, 210, 238, 0.08)' },
  '--dsw-alias-border-l2-darkmode-thin': { light: 'rgba(9, 58, 82, 0.16)', dark: 'rgba(150, 210, 238, 0.1)' },
  '--dsw-alias-border-l2': { light: 'rgba(9, 58, 82, 0.16)', dark: 'rgba(150, 210, 238, 0.14)' },
  '--dsw-alias-border-l3': { light: 'rgba(9, 58, 82, 0.22)', dark: 'rgba(150, 210, 238, 0.2)' },
  '--dsw-alias-border-l4': { light: 'rgba(9, 58, 82, 0.3)', dark: 'rgba(150, 210, 238, 0.28)' },

  // ── brand and buttons ───────────────────────────────────────────────────
  '--dsw-alias-brand-primary-invert': { light: LAB_INK, dark: 'rgb(226, 242, 249)' },
  '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: LAB_PRIMARY, dark: LAB_GLOW },
  '--dsw-alias-brand-primary': { light: LAB_PRIMARY, dark: LAB_GLOW },
  '--dsw-alias-brand-text': { light: LAB_PRIMARY, dark: 'rgb(150, 213, 238)' },
  '--dsw-alias-button-contrast-fill': { light: 'rgb(9, 32, 44)', dark: 'rgb(226, 242, 249)' },
  '--dsw-alias-button-elevated-fill': { light: 'rgb(255, 255, 255)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-button-floating-fill': { light: 'rgb(255, 255, 255)', dark: 'rgb(17, 38, 50)' },
  '--dsw-alias-button-floating-hover': { light: 'rgb(240, 246, 250)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-button-ghost-active-border': { light: 'rgb(96, 148, 170)', dark: 'rgb(110, 158, 180)' },
  '--dsw-alias-button-ghost-active-fill': { light: 'rgb(220, 236, 244)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-button-ghost-active-hover': { light: 'rgb(233, 243, 249)', dark: 'rgb(28, 56, 72)' },
  '--dsw-alias-button-info-fill': { light: LAB_PRIMARY, dark: LAB_GLOW },
  '--dsw-alias-button-info-hover': { light: 'rgb(36, 148, 196)', dark: 'rgb(110, 208, 244)' },
  '--dsw-alias-button-primary-dimmed': { light: 'rgb(220, 236, 244)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-button-primary-fill': { light: LAB_PRIMARY, dark: LAB_GLOW },
  '--dsw-alias-button-primary-hover': { light: 'rgb(18, 102, 141)', dark: 'rgb(110, 208, 244)' },
  '--dsw-alias-button-tool-bar-fill-invisible': { light: 'rgba(9, 32, 44, 0.36)', dark: 'rgba(8, 22, 30, 0.55)' },
  '--dsw-alias-button-tool-bar-fill': { light: 'rgba(9, 32, 44, 0.5)', dark: 'rgba(8, 22, 30, 0.65)' },
  '--dsw-alias-button-tool-bar-hover': { light: 'rgba(9, 32, 44, 0.62)', dark: 'rgba(8, 22, 30, 0.75)' },

  // ── interactive states ──────────────────────────────────────────────────
  '--dsw-alias-interactive-bg-active': { light: 'rgba(23, 121, 164, 0.14)', dark: 'rgba(150, 210, 238, 0.16)' },
  '--dsw-alias-interactive-bg-hover-accent': { light: 'rgba(23, 121, 164, 0.18)', dark: 'rgba(150, 210, 238, 0.26)' },
  '--dsw-alias-interactive-bg-hover-danger': { light: 'rgba(198, 64, 56, 0.06)', dark: 'rgba(226, 96, 88, 0.16)' },
  '--dsw-alias-interactive-bg-hover-solid': { light: 'rgb(240, 246, 250)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-interactive-bg-hover': { light: 'rgba(23, 121, 164, 0.08)', dark: 'rgba(150, 210, 238, 0.1)' },

  // ── labels ──────────────────────────────────────────────────────────────
  '--dsw-alias-label-caption': { light: 'rgb(126, 158, 174)', dark: 'rgb(100, 138, 158)' },
  '--dsw-alias-label-dimmed': { light: 'rgb(213, 226, 233)', dark: 'rgb(58, 86, 102)' },
  '--dsw-alias-label-primary-bluish': { light: 'rgb(13, 74, 98)', dark: 'rgb(226, 242, 249)' },
  '--dsw-alias-label-primary-dimmed': { light: 'rgb(41, 71, 86)', dark: 'rgb(190, 216, 228)' },
  '--dsw-alias-label-primary-foreground': { light: 'rgb(255, 255, 255)', dark: 'rgb(8, 22, 30)' },
  '--dsw-alias-label-primary-inverted': { light: 'rgb(255, 255, 255)', dark: 'rgb(8, 22, 30)' },
  '--dsw-alias-label-primary': { light: LAB_INK, dark: 'rgb(226, 242, 249)' },
  '--dsw-alias-label-secondary': { light: 'rgb(64, 96, 116)', dark: 'rgb(165, 198, 214)' },
  '--dsw-alias-label-tertiary': { light: 'rgb(103, 133, 150)', dark: 'rgb(133, 168, 186)' },

  // ── markdown surfaces ───────────────────────────────────────────────────
  '--dsw-alias-markdown-citation': { light: 'rgb(220, 236, 244)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-markdown-code-block-banner': { light: 'rgb(244, 249, 252)', dark: 'rgb(17, 38, 50)' },
  '--dsw-alias-markdown-code-block': { light: 'rgb(244, 249, 252)', dark: 'rgb(11, 27, 36)' },
  '--dsw-alias-markdown-code-segment-selected': { light: 'rgb(255, 255, 255)', dark: 'rgb(22, 47, 61)' },
  '--dsw-alias-markdown-code-segment-unselected': { light: 'rgb(233, 243, 249)', dark: 'rgb(11, 27, 36)' },
  '--dsw-alias-markdown-inline-code': { light: 'rgb(222, 237, 245)', dark: 'rgb(17, 38, 50)' },
  '--dsw-alias-markdown-placeholder': { light: 'rgb(240, 246, 250)', dark: 'rgb(17, 38, 50)' },
  '--dsw-alias-markdown-tag': { light: 'rgb(233, 243, 249)', dark: 'rgb(17, 38, 50)' },

  // ── scrollbars ──────────────────────────────────────────────────────────
  '--dsw-alias-scrollbar-bg-l1': { light: 'rgb(203, 220, 229)', dark: 'rgb(28, 56, 72)' },
  '--dsw-alias-scrollbar-bg-l2': { light: 'rgb(203, 220, 229)', dark: 'rgb(28, 56, 72)' },
  '--dsw-alias-scrollbar-hover-l1': { light: 'rgb(176, 202, 216)', dark: 'rgb(38, 74, 94)' },
  '--dsw-alias-scrollbar-hover-l2': { light: 'rgb(176, 202, 216)', dark: 'rgb(38, 74, 94)' },

  // ── state colors (cold lab teal/amber/red) ──────────────────────────────
  '--dsw-alias-state-business-primary': { light: LAB_PRIMARY, dark: LAB_GLOW },
  '--dsw-alias-state-business-tertiary': { light: 'rgb(214, 236, 246)', dark: 'rgb(16, 44, 58)' },
  '--dsw-alias-state-error-primary': { light: 'rgb(198, 64, 56)', dark: 'rgb(226, 96, 88)' },
  '--dsw-alias-state-error-secondary': { light: 'rgb(198, 64, 56)', dark: 'rgb(226, 96, 88)' },
  '--dsw-alias-state-success-primary': { light: 'rgb(42, 156, 133)', dark: 'rgb(58, 190, 160)' },
  '--dsw-alias-state-success-secondary': { light: 'rgb(58, 178, 152)', dark: 'rgb(74, 208, 176)' },
  '--dsw-alias-state-success-tertiary': { light: 'rgb(220, 242, 235)', dark: 'rgb(14, 44, 38)' },
  '--dsw-alias-state-warn-label': { light: 'rgb(176, 116, 28)', dark: 'rgb(232, 168, 74)' },
  '--dsw-alias-state-warn-primary': { light: 'rgb(214, 142, 35)', dark: 'rgb(232, 168, 74)' },
  '--dsw-alias-state-warn-secondary': { light: 'rgb(230, 164, 62)', dark: 'rgb(240, 186, 104)' },
  '--dsw-alias-state-warn-tertiary': { light: 'rgb(248, 236, 214)', dark: 'rgb(52, 40, 18)' },

  // ── popups ──────────────────────────────────────────────────────────────
  '--dsw-alias-toast-bg': { light: 'rgb(13, 45, 62)', dark: 'rgb(28, 56, 72)' },
  '--dsw-alias-tooltip-bg': { light: 'rgb(13, 45, 62)', dark: 'rgb(28, 56, 72)' },

  // ── product-specific fills ──────────────────────────────────────────────
  '--dsw-specific-bubble-highlight': { light: 'rgb(196, 228, 242)', dark: 'rgb(20, 54, 70)' },
  '--dsw-specific-bubble': { light: 'rgb(222, 239, 248)', dark: 'rgb(15, 39, 51)' },
  '--dsw-specific-input-major': { light: 'rgb(255, 255, 255)', dark: 'rgb(17, 38, 50)' },
  '--dsw-specific-login-input': { light: 'rgb(244, 249, 252)', dark: 'rgb(11, 27, 36)' },
  '--dsw-specific-menu': { light: 'rgb(250, 253, 254)', dark: 'rgb(22, 47, 61)' },
  '--dsw-specific-selector': { light: 'rgb(240, 246, 250)', dark: 'rgb(22, 47, 61)' },
  '--dsw-specific-sidebar-fill': { light: 'rgb(225, 238, 245)', dark: 'rgb(10, 26, 35)' },
  '--dsw-specific-sidebar-nav-item-active-accent': { light: 'rgb(168, 216, 236)', dark: 'rgb(44, 120, 152)' },
  '--dsw-specific-sidebar-nav-item-active': { light: 'rgb(212, 233, 242)', dark: 'rgb(16, 40, 52)' },
  '--dsw-specific-sidebar-nav-item-hover': { light: 'rgb(233, 243, 249)', dark: 'rgb(13, 31, 41)' },
  '--dsw-specific-tip': { light: 'rgb(240, 246, 250)', dark: 'rgb(22, 47, 61)' },

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
