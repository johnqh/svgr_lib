# @sudobility/svgr_lib

Shared business logic for SVGR web and React Native apps -- hooks, constants, i18n, and validation utilities.

## Installation

```bash
bun add @sudobility/svgr_lib
```

## Usage

```typescript
import { useImageConverter, APP_NAME, APP_DOMAIN, isValidImageType } from "@sudobility/svgr_lib";

// React hook for conversion workflow
const { quality, transparentBg, svgResult, error } = useImageConverter();

// Validate input
const valid = isValidImageType("image/png"); // true
```

## API

### Hooks

- `useImageConverter` -- Main conversion workflow hook (quality, transparentBg, svgResult, error state)

### Constants

- `APP_NAME` ("SVGR"), `APP_DOMAIN` ("svgr.app")
- Quality range: 1-10, default 5
- `SUPPORTED_IMAGE_TYPES` -- PNG, JPEG, WebP, BMP, GIF

### Utils

- `isValidImageType(type)` -- Validate file type against supported types
- `getSvgDimensions(svg)` -- Parse SVG string for width/height
- `getSvgFileSize(svg)` -- Get SVG string byte size

### i18n

16 supported languages with namespace-based translation structure.

## Development

```bash
bun run build        # Build ESM
bun test             # Run tests
bun run typecheck    # TypeScript check
```

## Related Packages

- `svgr_types` -- Shared type definitions
- `svgr_client` -- API client SDK
- `svgr_api` -- Backend API server
- `svgr_app` -- Web app consumer
- `svgr_app_rn` -- React Native app consumer

## License

BUSL-1.1
