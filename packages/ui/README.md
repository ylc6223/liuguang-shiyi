This package is intended to host shared UI components based on shadcn/ui and Radix UI.

Usage (online environment required to pull templates):

1) Initialize shadcn in this package

   pnpm --filter @packages/ui run shadcn:init

2) Add all components (batch)

   pnpm --filter @packages/ui run shadcn:add-all

3) Consume in apps

   - Ensure apps depend on "@packages/ui": "workspace:*"
   - Import shared CSS tokens in app globals:
     @import "@packages/ui/styles.css";
   - Import components from the package:
     import { Button } from "@packages/ui";

Notes
- Tailwind v4 preset is shared from @packages/tailwind-config.
- The component list in tools/shadcn-add-all.cjs can be adjusted.
- In restricted networks, the above commands will not run; the repository is pre-wired so you can run them later when network is available.
