# SVGR Lib

Shared business logic for SVGR web and React Native apps.

**npm**: `@sudobility/svgr_lib` (restricted, BUSL-1.1)

## Tech Stack

- **Language**: TypeScript (strict mode, JSX)
- **Runtime**: Bun
- **Package Manager**: Bun (do not use npm/yarn/pnpm for installing dependencies)
- **Build**: TypeScript compiler (ESM, `tsconfig.build.json`)
- **Test**: Vitest

## Project Structure

```
src/
├── index.ts                    # Main exports
├── config/
│   ├── index.ts                # Config exports
│   ├── constants.ts            # App constants (name, domain, quality, image types)
│   ├── constants.test.ts       # Constants tests
│   └── types.ts                # Config type definitions
├── hooks/
│   ├── index.ts                # Hook exports
│   └── useImageConverter.ts    # Main converter hook
├── i18n/
│   ├── index.ts                # i18n exports
│   ├── config.ts               # i18n configuration (16 languages, namespaces)
│   └── config.test.ts          # i18n config tests
└── utils/
    ├── index.ts                # Util exports
    ├── validation.ts           # Input validation helpers
    ├── validation.test.ts      # Validation tests
    ├── svg.ts                  # SVG dimension parsing utilities
    └── svg.test.ts             # SVG util tests
```

## Commands

```bash
bun run build        # Build to dist/ (tsconfig.build.json)
bun run clean        # Remove dist/
bun run build:watch  # Watch mode
bun test             # Run tests
bun run lint         # Run ESLint
bun run typecheck    # TypeScript check
```

## Key Constants

- `APP_NAME`: `'SVGR'`
- `APP_DOMAIN`: `'svgr.app'`
- Quality range: 1-10, default 5
- 5 supported image types (PNG, JPG, etc.)

## Key Concepts

### useImageConverter

Main React hook managing the conversion workflow:
- State: `quality`, `transparentBg`, `svgResult`, `error`
- Delegates actual API calls to `@sudobility/svgr_client`'s `useConvert` hook
- Consumed by both web (`svgr_app`) and native (`svgr_app_rn`) apps

### i18n

- 16 supported languages: en, zh, zh-hant, ja, ko, es, fr, de, it, pt, ru, ar, sv, th, uk, vi
- Namespace-based translation structure
- Configuration shared between web and RN apps

### Utils

- `validation.ts` -- input file validation
- `svg.ts` -- SVG dimension parsing from SVG strings

## Peer Dependencies

- `@sudobility/svgr_client` ^1.0.9
- `@sudobility/svgr_types` ^1.0.4
- `@sudobility/types` ^1.9.51
- `@tanstack/react-query` >=5
- `react` >=18

## Architecture

```
svgr_types + svgr_client
        ^
        |
    svgr_lib (this package)
        ^
        |
  svgr_app + svgr_app_rn
```

## Related Projects

- **svgr_types** (`/Users/johnhuang/projects/svgr_types`) -- Shared type definitions; peer dependency
- **svgr_client** (`/Users/johnhuang/projects/svgr_client`) -- API client SDK; peer dependency used by `useImageConverter` for API calls
- **svgr_api** (`/Users/johnhuang/projects/svgr_api`) -- Backend server (indirect dependency via svgr_client)
- **svgr_app** (`/Users/johnhuang/projects/svgr_app`) -- Web app; primary consumer of this package
- **svgr_app_rn** (`/Users/johnhuang/projects/svgr_app_rn`) -- React Native app; primary consumer of this package

## Coding Patterns

- **`useImageConverter` hook** is the central abstraction -- manages `quality`, `transparentBg`, `svgResult`, and `error` state. Delegates API calls to svgr_client's `useConvert` hook.
- **Validation utils** (`isValidImageType`) check file types against the `SUPPORTED_IMAGE_TYPES` constant
- **SVG utils** (`getSvgDimensions`, `getSvgFileSize`) parse SVG strings to extract metadata
- **i18n config** defines 16 supported languages with namespace-based translation structure. `LANGUAGE_HREFLANG_MAP` maps internal language codes to hreflang attribute values.
- **`SUPPORTED_IMAGE_TYPES`** constant defines the 5 accepted image formats
- ESM-only build output using `tsconfig.build.json`

## Gotchas

- **Quality range**: `QUALITY_MIN=1`, `QUALITY_MAX=10`, `QUALITY_DEFAULT=5`. Do not use 0-100 or 0-1 scales. These constants are the source of truth for the entire SVGR ecosystem.
- **Only 5 image types supported**: PNG, JPEG, WebP, BMP, GIF. Adding a new type requires updating `SUPPORTED_IMAGE_TYPES` and the validation logic.
- **`LANGUAGE_HREFLANG_MAP`** maps internal language codes (e.g., `zh-hant`) to standard hreflang values (e.g., `zh-Hant`). This mapping is critical for SEO in the web app.
- **Shared between web and React Native** -- do not import browser-specific or Node-specific APIs. Keep all code platform-agnostic.
- Peer dependencies include `@sudobility/svgr_client`, `@sudobility/svgr_types`, `@sudobility/types`, `@tanstack/react-query`, and `react` -- consumers must provide all of these.

## Testing

- **Command**: `bun test` (runs Vitest)
- Tests are in `src/config/constants.test.ts`, `src/i18n/config.test.ts`, `src/utils/validation.test.ts`, and `src/utils/svg.test.ts`
- Test constants for correct values (quality range, supported types, app name)
- Test validation functions with valid and invalid file types
- Test SVG parsing utilities with various SVG string formats
- Test i18n configuration for correct language codes and namespace setup
