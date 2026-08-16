<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/67ea3a25-fb3c-419b-9039-2b4eaccee045

## Run Locally

**Prerequisites:** Node.js 24.x LTS (see [Toolchain](#toolchain) below)

1. Install dependencies:
   `npm ci`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Use `npm ci` for a reproducible install from `package-lock.json`. Use `npm install` only when you intend to add or update dependencies.

## Toolchain

| Tool | Version |
| --- | --- |
| Node.js | 24.19.0 ("Krypton" LTS) |
| npm | 12.x |

### Node.js 24 LTS migration

The project previously ran on Node.js 25.x, an odd-numbered release line that never becomes LTS. It now targets the **Node.js 24 LTS** line.

The trigger was npm 12, which declares `"node": "^22.22.2 || ^24.15.0 || >=26.0.0"` and therefore refuses to install on Node 25 with an `EBADENGINE` error. Moving to 24.19.0 is numerically a downgrade but a move onto a supported, security-maintained line, and it satisfies npm 12's engine constraint.

Notes for anyone reproducing this environment:

- **Windows (winget):** LTS ships as a separate package from the Current channel. Because both install to the same location, switch with `winget uninstall OpenJS.NodeJS` followed by `winget install OpenJS.NodeJS.LTS`. A version manager such as [fnm](https://github.com/Schniz/fnm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) avoids the uninstall/reinstall cycle.
- **Native dependencies:** `@rollup/rollup-*`, `@tailwindcss/oxide-*`, and `lightningcss-*` ship as prebuilt, ABI-stable N-API binaries selected per platform. They do not need recompiling across Node versions, but `node_modules` must be reinstalled if you change CPU architecture.
- **npm 12 blocks install scripts by default.** `npm ci` reports skipped scripts for `esbuild`, `protobufjs`, and `@google/genai`. This is expected and the build works without them, since esbuild's binary comes from its optional platform package rather than its postinstall. If a package genuinely needs its script, review with `npm install-scripts ls` and allow it via `npm install-scripts approve <pkg>`.

### Verifying the toolchain

This project has no automated test suite. The available checks are:

- `npm run lint` — TypeScript typecheck (`tsc --noEmit`)
- `npm run build` — production Vite build

Both pass on Node 24.19.0 / npm 12.0.2.
