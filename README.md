# dsh-theme-rhine-lab

English | [中文](README.zh.md)

> An [Arknights](https://www.arknights.global/) **Rhine Lab (莱茵生命)** skin for the **DeepSeek Harness (dsh) Web GUI** — cold laboratory whites, cyan-blue structural accents, ink-navy labels, a holographic hex lattice, and slow lab-scanner sweeps.

*（screenshots: drop `screenshots/light.png` and `screenshots/dark.png` here after taking them from your running instance）*

The skin restyles the whole Web GUI through dsh's own theme token system. It does not replace any feature and stays fully reversible: a **“莱茵生命界面 / Rhine Lab UI”** row in **Settings → General** toggles it live, and the existing Light / Dark / System appearance choices keep working underneath.

## What it looks like

- **Palette** — near-white surfaces with an ice-blue cast, cyan-blue accents (`rgb(23, 121, 164)` light / `rgb(74, 190, 232)` dark), ink-navy text, hairline borders, cold teal/amber status colors.
- **Texture and motion** — a faint hexagon lattice with scanlines over the UI, an 11-second lab-scanner sweep, an edge vignette, a one-shot boot sweep when the skin arms, cyan selection/focus chrome, and a snappier motion curve. Everything is `pointer-events: none`, GPU-friendly, and respects `prefers-reduced-motion`.
- **Typography** — a DIN-style technical face (`Bahnschrift` and friends) ahead of the system stack where available.

## Requirements

- A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) install running the **web surface** (`dsh --profile web`). Tested against the `0.1.0-rc.5` source checkout; the npm-published `0.0.1-rc.1` line is supported on a best-effort basis.
- Nothing else: the skin needs no API keys and no browser extensions.

## Install

The plugin is a dsh **bundle** (an npm package carrying a `cordis.patch.yml` layer). `dsh plugin` manages bundles per profile — install it into the `web` profile:

```sh
dsh plugin --profile web add dsh-theme-rhine-lab          # from npm (after it is published)
dsh plugin --profile web add github:YOU/dsh-theme-rhine-lab   # straight from GitHub
dsh plugin --profile web add ./dsh-theme-rhine-lab-0.1.0.tgz  # from a packed tarball
dsh plugin --profile web add ./dsh-theme-rhine-lab            # from a local checkout (dev)
```

Then restart `dsh web` (plugin *sets* are read at startup; plugin *content* hot-reloads) and refresh the page.

### Git installs need a build permission

Git installs pull source code, so pnpm runs this package's `prepare` script (a self-contained `tsdown` build) after checkout. pnpm ≥ 10 refuses that until you allow it: the first `add` fails and dsh prints the fix — copy the exact key it prints into the profile's `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  dsh-theme-rhine-lab: true
```

then re-run `add`. This permission means **this package's code runs on your machine at install time** — allow it only if you trust the source, and prefer pinning a commit: `dsh plugin --profile web add github:YOU/dsh-theme-rhine-lab#<sha>`.

To skip the permission entirely, install from npm or from a tarball instead (both ship the prebuilt `lib/` — this repo commits its build output).

## Usage

- The skin is **on by default** (`ui-theme-rhine-lab.enabled`). Toggle it any time in **Settings → General → 莱茵生命界面 / Rhine Lab UI**; the choice persists across restarts.
- **Light / Dark / System** in the Appearance row still chooses the base palette; the skin layers its own light and dark variants over it.
- To make it default-off for your deployment, change `DEFAULT_ENABLED` in [`src/theme-settings.ts`](src/theme-settings.ts) and rebuild, or pre-seed the settings document.

## How it works (the short version)

A dsh plugin is just configuration plus code. This bundle contributes:

1. **A layer** — [`cordis.patch.yml`](cordis.patch.yml) inserts one row, `dsh-theme-rhine-lab`, into the composition. The row is dual-face (`dsh.client`): the server loads its node half, the browser loads its client half.
2. **The node half** — [`src/index.ts`](src/index.ts) registers the `ui-theme-rhine-lab` settings namespace so the on/off switch survives restarts.
3. **The browser half** — [`src/client/index.ts`](src/client/index.ts):
   - calls `ctx.theme.overrideTokens()` with the full Rhine Lab palette ([`src/client/palette.ts`](src/client/palette.ts)) — every color the GUI draws comes from these tokens, so the whole interface restyles at once;
   - pins `data-rhine-lab-theme` on `<html>`/`<body>`, arming the decoration sheet ([`src/client/rhine.module.css`](src/client/rhine.module.css)): hex lattice, scanlines, sweeps, vignette, selection/focus chrome;
   - registers the settings row ([`src/client/RhineLabRow.tsx`](src/client/RhineLabRow.tsx)) into Settings → General.

## Development

```sh
pnpm install
pnpm build        # emits lib/index.js + lib/client.js (also runs as `prepare`)
```

- `lib/` is committed so npm/tarball installs work with zero build steps.
- Recolor by editing the `{ light, dark }` pairs in [`src/client/palette.ts`](src/client/palette.ts); retune the decorations and keyframes in [`src/client/rhine.module.css`](src/client/rhine.module.css).
- Type feedback for the `@deepseek-ai/dsh-client-*` imports comes from a harness source checkout (those packages are external at build time; the build itself needs no checkout).

## Publishing to GitHub

1. Create the repository, push this directory as the root.
2. In the repository settings, add the topic **`dsh-plugin`** so community catalogs (e.g. the [Oh-My-DSH](https://github.com/like-study1/Oh-My-DSH) aggregator) pick it up.
3. Optionally `pnpm publish` to npm; `dsh plugin --profile web add dsh-theme-rhine-lab` then works without git.

## Known limitations

- The skin layers over the built-in palettes instead of adding a separately selectable theme id, so the Appearance row keeps owning light/dark/system.
- Decorations are CSS-only and never reshape component geometry; markdown code blocks keep the stock syntax-highlighting theme.
- The in-tree skin row shipped by source checkouts of the harness (`ui-theme-rhine-lab`) is auto-disabled by this bundle's patch, so installing both never registers the settings namespace twice.

## License

[MIT](LICENSE). The plugin is a fan-made skin; Arknights and Rhine Lab belong to Hypergryph / Yostar.
