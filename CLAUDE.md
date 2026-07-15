# landing-page-frontend

Landing page for Red Hat Hybrid Cloud Console — the root `/` dashboard with a widget-based layout. Exposes ~12 federated widget modules consumed by the Chrome dashboard system.

## Commands

```bash
npm run start    # Dev server (fec dev, proxied to stage)
npm run build    # Production build (fec build)
npm run lint     # ESLint (src/ and cypress/)
npm test         # Jest unit tests (--passWithNoTests)
npm run test:ct  # Cypress component tests
npm run test:e2e         # E2E via custom script
npm run test:playwright  # Playwright E2E
npm run verify   # Full check: build + lint + test + test:ct
npm run analyze  # Webpack bundle analyzer
```

## Tech Stack

- React 18, TypeScript (strict), react-router-dom v6
- PatternFly 6 (react-core, react-table, react-icons)
- react-intl for internationalization
- Unleash feature flags
- `@scalprum/core` for micro-frontend runtime
- Webpack via `fec` (frontend-components-config)
- Module Federation — app name `landing`, exposes `RootApp`, `PdfEntry`, and ~12 widget modules
- No Redux — state via Chrome services context

## Architecture

```
src/
  components/
    widgets/              # ~15 widget components (RHEL, OpenShift, Ansible, ACS, Quay, Edge, etc.)
    recently-visited/     # Recently visited section
    useCurrentUser.ts     # Current user hook
    useLoaded.ts          # Loading state hook
  routes/
    Landing.tsx           # Main dashboard route
    404.tsx               # Not found
    Logout.tsx            # Logout page
    Maintenance.tsx       # Maintenance page
  moduleEntries/
    AppEntry.tsx          # Module Federation RootApp entry
    PdfEntry.tsx          # PDF export entry
  utils/
    axiosInstance.ts      # Axios HTTP client
    consts.tsx            # Constants
    getEnv.ts             # Environment detection
    sanitize-href.ts      # URL sanitization
```

Entry points: `entry.ts` (prod), `entry-dev.ts` (dev).

Widget layout is configured in `frontend.yml` via `widgetRegistry` and `baseWidgetLayouts` with responsive grid positions.

## Testing

- Jest 30 + Testing Library for unit tests (SWC transform)
- Cypress component tests in `cypress/component/`
- Cypress E2E in `cypress/e2e/`
- Playwright E2E in `playwright/e2e/` with page objects in `playwright/pages/`
- See `E2E_TEST_COVERAGE.md` for test coverage mapping

## Conventions

- ESLint 9 (flat config) with `@redhat-cloud-services/eslint-config-redhat-cloud-services`
- TypeScript ESLint: `no-explicit-any` warn, `no-unused-vars` error
- Sort imports enforced (ignoreDeclarationSort)
- Widgets are self-contained components exposed via Module Federation
- FEO deployment via `frontend.yml` (`feoConfigEnabled: true`)
