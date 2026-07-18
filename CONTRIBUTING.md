# Contributing

Thanks for helping improve PlainUtils.

## Quality checklist

- Use the shared registry and components; do not create another tool list.
- Provide associated labels, keyboard operation, visible focus states, and live error feedback.
- Process inputs locally unless the tool fundamentally requires a network request.
- Disclose any third-party endpoint in the tool registry and privacy page.
- Handle empty, invalid, Unicode, and unusually large input safely.
- Add focused tests for parsing and conversion behavior.
- Run `npm test` and `npm run build` before submitting a pull request.

Keep pull requests focused and explain the user-facing outcome.
