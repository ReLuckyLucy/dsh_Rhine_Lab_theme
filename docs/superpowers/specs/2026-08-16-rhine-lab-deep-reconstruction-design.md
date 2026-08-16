# Rhine Lab Deep Reconstruction Design

**Status:** Approved on 2026-08-16
**Target:** `dsh-theme-rhine-lab` on DeepSeek Harness `0.1.0-rc.5`
**Reference material:** `D:\Desktop\Rhine_Lab-main`, Rhine Lab public lore, and the Rhine Lab: Access database presentation

## Context

The current plugin is a reversible DeepSeek Harness theme bundle. It persists one `ui-theme-rhine-lab.enabled` setting, overrides Harness alias tokens, and arms a global decoration sheet through `data-rhine-lab-theme`. Its existing cyan palette, hex lattice, vignette, and continuous scan animation read as a generic science-fiction skin rather than Rhine Lab.

The approved redesign is a deep visual reconstruction that remains an independently installable theme bundle. It must not modify `D:\Desktop\deepseek-harness`, replace Harness business behavior, or depend on generated CSS Module class names. It may restructure the visible geometry with scoped CSS and add non-interactive brand/status surfaces through official Harness slots.

## Research Summary

The local `Rhine_Lab-main` reference emphasizes warm laboratory white, near-black industrial labels, research orange, bold condensed headings, serial numbers, departmental diagrams, document cards, terminal text, line-drawing animation, and restrained cyan status accents. Its visual identity comes from information architecture and institutional labeling, not a blue holographic overlay.

Public reference material supports the same direction. Rhine Lab: Access presents the organization as an internal database with access authorization, file selection, confidentiality labels, and department records. Publicly documented staff identification colors assign orange to researchers, teal to medical staff, red to security, and white to civilian staff. The theme therefore uses orange as its primary interactive identity and reserves cyan or teal for live data and successful execution.

References:

- https://arknights.wiki.gg/wiki/Rhine_Lab
- https://arknights.wiki.gg/wiki/Rhine_Lab%3A_Access
- https://www.youtube.com/watch?v=5amkbsiqbSw

## Goals

- Make the active Harness interface immediately recognizable as a restrained Rhine Lab internal research terminal.
- Recompose the visible sidebar, conversation, message, tool, composer, and details-panel geometry without changing their business behavior.
- Support light, dark, and system appearance modes with one shared visual language.
- Keep the theme independently installable and fully reversible through the existing General-settings row.
- Use official Harness slots and stable `data-*` or accessibility attributes instead of hashed component classes.
- Degrade safely when a future Harness version changes a deep selector.
- Preserve keyboard focus, reduced-motion behavior, readable long-form output, terminal column fidelity, and narrow-screen usability.

## Non-Goals

- Replacing the `sidebar`, `conversation`, `conversation.session`, or composer business components.
- Modifying the DeepSeek Harness source checkout.
- Copying the reference site's long preload sequence, page content, character imagery, audio, or large raster assets.
- Rebranding DeepSeek Harness itself; Rhine Lab branding is a restrained interface skin and not a replacement product identity.
- Supporting Harness versions beyond `0.1.0-rc.5` without best-effort visual degradation.

## Visual System

### Palette

Light mode resembles a headquarters archive: warm laboratory paper, near-black type and rule lines, cool gray secondary surfaces, research orange for interaction, and cyan for live data. Dark mode resembles a night operations database: ink-black surfaces, off-white text, muted steel borders, the same research orange interaction color, and a brighter cyan status signal.

| Role | Light mode | Dark mode |
| --- | --- | --- |
| Base | warm gray-white | ink black |
| Layer 1 | laboratory paper | charcoal panel |
| Primary text | near black | off white |
| Secondary text | graphite gray | steel gray |
| Primary action | research orange | bright research orange |
| Running/success | restrained cyan | luminous cyan |
| Warning | amber | amber |
| Error | security red | security red |

The implementation will map these roles through the existing `--dsw-alias-*` token override layer. Literal colors are limited to the theme owner sheets and the theme-owned HUD component.

### Typography

Condensed technical headings use Bahnschrift or Arial Narrow when available. Body copy remains system sans-serif for Chinese readability. File numbers, timestamps, permissions, and state labels use Consolas or the existing monospace stack. Uppercase English labels use increased letter spacing; Chinese prose does not.

### Graphic Language

- The Rhine Lab infinity-style mark and `RHINE LAB LLC.` appear only in the top-left lab plate, the settings row, and a reduced status seal.
- File numbers, access levels, department abbreviations, timestamps, and status labels create the institutional identity.
- Thin rules, asymmetric orange bars, clipped corners, grid ticks, and measured offsets replace rounded floating cards.
- Hexagons remain only as small state indicators. The full-screen hex lattice is removed.
- Cyan glows are limited to active data points and never wash over the page.

## Layout Reconstruction

The existing three-column Harness frame remains functionally intact but is visually reframed as:

1. **Department index:** the left sidebar reads as a control-section archive. Workspace and session controls keep their existing behavior. Expanded and collapsed states remain owned by Harness.
2. **Research log:** the center conversation becomes a numbered record stream with a file header, access metadata, and flatter message geometry.
3. **Tool record:** the right details panel becomes a specimen or execution record. Harness still controls whether it is open and what tool data it displays.

The main conversation header gains file-number and confidentiality treatment without replacing its title, tabs, lineage, or actions. User messages, assistant responses, reasoning rows, commands, tool calls, and turn tails receive distinct record treatments based on existing `data-chat-flow-kind`, `data-variant`, `data-state`, and related attributes.

The composer becomes a command-input deck. The existing textarea, attachment controls, permission selector, plan selector, model selector, stop button, and submit behavior remain unchanged. `data-composer-card`, `data-input-scroll`, `data-input-backdrop`, and `data-phase` provide the styling anchors.

## Technical Architecture

### Existing Theme Controller

`src/client/index.ts` remains the owner of the persisted setting and theme projection. Enabling the theme:

1. installs the Rhine Lab token override;
2. adds `data-rhine-lab-theme` to `html` and `body`;
3. exposes the active state to the existing settings-row store;
4. allows the theme-owned overlay registration to render.

Disabling the theme retracts the token override, both DOM attributes, the HUD visibility, and every scoped reconstruction rule. HMR disposal follows the same path.

### Theme-Owned HUD

A pure presentation component, `RhineLabHud`, registers into the official `shell.overlay` list slot. It renders the restrained top lab plate, access state, file serial, edge inscription, and boot-validation lines. The HUD is `aria-hidden`, `pointer-events: none`, and contains no business data or controls.

The registration waits for the slot through `ctx.slots.inject('shell.overlay', ...)`, so load order does not matter and disposal is owned by the plugin fiber. It does not append unmanaged nodes directly to `document.body`.

### Scoped Reconstruction Sheet

All deep rules start under `body[data-rhine-lab-theme]`. The root frame is found through the stable direct child `[data-shell-overlay]`; conversation and input surfaces use Harness-owned attributes including:

- `data-phase`
- `data-conversation-scroll`
- `data-chat-flow`
- `data-chat-anchor-key`
- `data-chat-flow-kind`
- `data-composer-seat`
- `data-composer-card`
- `data-input-scroll`
- `data-queue-dock`
- `data-approval-key`
- `data-state`, `data-variant`, and `data-error`

Semantic elements and accessibility roles may supplement these anchors where they are already part of the Harness contract. Generated CSS Module class names are never referenced. Structural selectors are kept in one reconstruction sheet so the compatibility surface is easy to audit.

Harness dark mode remains authoritative through `body[data-ds-dark-theme]`; the plugin does not create or persist another light/dark state.

## Motion

Enabling the theme plays a non-blocking permission-validation sequence lasting about 900 milliseconds: the lab plate resolves, guide lines draw, and the access state settles. The page remains usable throughout.

Persistent motion is limited to running responses, active tools, and small state seals. Navigation and buttons use 140–180 millisecond line or inverse-fill transitions. The current continuous page-wide scanner, boot wash, and full-screen animated lattice are removed.

Under `prefers-reduced-motion: reduce`, the validation sequence, state pulse, line drawing, and nonessential transitions are disabled.

## Responsive Behavior

- Wide screens keep the three-part archive/log/details organization.
- Harness remains the sole owner of sidebar and details-panel open state and resize gestures.
- Narrow screens retain Harness sidebar auto-collapse. The lab plate shortens, edge inscriptions disappear, and metadata compresses before content width is reduced.
- The conversation remains the priority surface. Decorative rails cannot create horizontal scrolling.
- Terminal, diff, and preformatted output keep their existing overflow behavior.

## Failure and Compatibility Behavior

The supported baseline is DeepSeek Harness `0.1.0-rc.5`. Missing optional selectors must produce a partial visual result, never a functional failure. If a future Harness version changes a message or layout attribute, that region falls back to the token palette while the settings row, theme toggle, HUD, and unaffected regions continue working.

The plugin must not use a `MutationObserver`, runtime DOM rewrites, cloned business components, or imports from Harness internal source paths. This keeps incompatibility in CSS rather than execution behavior.

## Testing and Verification

### Automated

- Add a jsdom unit test for enable, disable, repeated projection, and fiber disposal.
- Verify the token override is installed once and fully retracted.
- Verify both document attributes are added and removed.
- Verify the `shell.overlay` contribution registers and disposes through the slot lifecycle.
- Render the HUD component and assert it is decorative, pointer-neutral, and contains the approved restrained branding.
- Assert the reconstruction stylesheet contains the required theme scope, stable Harness anchors, dark-mode branch, and reduced-motion branch; reject generated class-name dependencies.
- Run `pnpm build` and `pnpm pack --dry-run` or the repository-equivalent package inspection.

### Live Harness

Install the local bundle into the `web` profile of `D:\Desktop\deepseek-harness` without editing that checkout. Verify on `0.1.0-rc.5`:

1. startup with the theme enabled by default;
2. settings-row enable and disable without reload;
3. light, dark, and system appearance changes;
4. blank-session hero and an active conversation;
5. user, assistant, reasoning, command, tool, running, success, and error states available in the fixture or replay surface;
6. composer typing, attachment, selectors, send, stop, and focus behavior;
7. sidebar collapse, details-panel open/close, and narrow viewport behavior;
8. reduced-motion mode;
9. full visual restoration after the theme is disabled.

Screenshots of the verified light and dark states will replace the README placeholders.

## Documentation and Packaging

The English and Chinese READMEs will describe the deep reconstruction, the `0.1.0-rc.5` compatibility target, the safe-degradation behavior, and the absence of copied reference-site media. The package remains a normal dsh bundle with prebuilt `lib/` output and the existing reversible General-settings switch.

## Acceptance Criteria

- The enabled interface matches the approved archive-terminal layout in both light and dark modes.
- Research orange, black/white industrial typography, file metadata, and departmental framing carry the identity; cyan is secondary.
- Core Harness interactions behave identically before and after the redesign.
- No generated Harness CSS class appears in theme source.
- Disabling or disposing the theme restores the original visual state without reload.
- Reduced-motion and narrow-screen checks pass.
- The package builds, its published file list is correct, and the live `0.1.0-rc.5` walkthrough succeeds.
