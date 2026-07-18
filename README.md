# PlainUtils

PlainUtils is a fast, free, privacy-conscious collection of browser utilities. Most tools process data entirely on the user’s device; the DNS and IP tools clearly disclose their external requests.

## Development

```bash
npm install
npm run dev
```

Before opening a pull request:

```bash
npm test
npm run build
npm run test:e2e
```

## Architecture

- `lib/tools.js` is the canonical catalog for tool metadata and navigation.
- `pages/tools/` contains each statically generated utility.
- `components/Layout.js` owns shared metadata, navigation, privacy notices, and page structure.
- `components/ToolActions.js` supplies consistent clipboard, download, and clear actions.
- `pages/workspace.js` chains reusable local transformations into saved pipelines.
- `tests/e2e/` covers critical browser workflows and automated accessibility checks.
- `tests/` covers the conversion algorithms most susceptible to edge cases.

## Adding a tool

1. Add its metadata and icon to `lib/tools.js`.
2. Add the page under `pages/tools/` using `Layout` and accessible form labels.
3. Keep processing local where possible. If an external request is necessary, add an `external` disclosure to the registry and document it on the privacy page.
4. Add tests for non-trivial parsing or conversion logic.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the quality checklist.
