
---
name: create-test
description: Create or update tests in the Augur project, run them, and commit successful changes.
---

# Create Test

## Instructions

1. Read AGENTS.md.
2. Inspect package.json and the existing tests folder.
3. Identify the current testing framework.
4. Inspect the component or function requested by the user.
5. Create or update an appropriate test file.
6. Test normal behaviour, edge cases and failures.
7. Follow existing test naming conventions.
8. Run the relevant tests.
9. Fix failures caused by your changes.
10. Run lint and typecheck where available.

## Git Instructions

- Check git status before starting.
- Do not modify or stage unrelated changes.
- Commit only the files changed by this task.
- Use the exact commit message: Test
- Do not push to remote.
- If tests fail or validation cannot run, do not commit.
- Report the reason.

## Final Response

Provide:
- Files created or modified
- Tests added
- Test execution results
- Git commit hash
