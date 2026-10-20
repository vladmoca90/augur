
---
name: create-test
description: Create or update tests for the D3.js Next.js project, validate the changes, and commit successful work with the message Test.
---

# Create Test Skill

## Purpose

Create meaningful automated tests for this Next.js,
React, TypeScript and D3.js project.

Use this skill when asked to:
- Create a test file
- Add tests for a component
- Improve existing tests
- Increase test coverage
- Test D3.js visualisations
- Test utility functions

## 1. Understand the Project

Before making changes:

1. Read AGENTS.md.
2. Inspect package.json.
3. Inspect the app directory.
4. Check existing test files and conventions.
5. Identify the current testing framework.
6. Check git status.
7. Read the implementation being tested.

Follow existing project conventions.

Do not assume a testing framework is installed.

## 2. Identify the Testing Framework

Use the existing framework whenever possible.

If no framework exists:

- Recommend Vitest for unit and component tests.
- Recommend React Testing Library for React components.
- Recommend jest-dom for DOM assertions.
- Recommend jsdom when DOM simulation is required.

Only install missing dependencies if necessary.

Avoid changing existing dependencies unnecessarily.

## 3. Create or Update Tests

For each requested component or function:

1. Identify its expected behaviour.
2. Inspect props, state and dependencies.
3. Identify edge cases and failure scenarios.
4. Create an appropriately named test file.
5. Follow existing testing conventions.
6. Prefer behaviour-driven assertions.

Suggested test naming:

- ComponentName.test.tsx
- utilityName.test.ts
- chartName.test.tsx

Place tests alongside source files or in an
existing test directory according to project conventions.

## 4. React Component Testing

Where applicable, test:

- Successful rendering
- Correct props handling
- User interactions
- Conditional rendering
- Loading states
- Empty states
- Error handling
- Accessibility
- State updates

Prefer accessible queries such as
getByRole and getByLabelText.

Avoid testing implementation details.

## 5. D3.js Testing

When testing D3 visualisations:

1. Verify SVG elements are rendered.
2. Check expected scales and domains.
3. Verify data binding and element counts.
4. Test behaviour with empty datasets.
5. Test invalid or missing data.
6. Test user interactions where implemented.
7. Verify updates when data changes.
8. Test accessible labels where applicable.

Avoid fragile tests dependent on exact pixel
coordinates unless those values are essential.

Mock browser APIs when required.

## 6. Run Validation

After implementing tests:

1. Run the relevant tests.
2. Fix failures introduced by your changes.
3. Run the configured lint command.
4. Run TypeScript validation.
5. Review the final diff.

Use npm scripts from package.json.

Do not claim tests passed unless executed.

If validation cannot run, explain why.

## 7. Git Workflow

Before committing:

1. Run git status.
2. Review the changed files.
3. Ensure unrelated changes are untouched.
4. Stage only files created or modified
   for the requested task.
5. Ensure tests pass.
6. Create one Git commit.

Use this exact commit message:

Test

Never:
- Push automatically
- Use git add .
- Commit unrelated changes
- Force push
- Reset unrelated user changes
- Create a commit if relevant tests fail

If validation fails, leave changes uncommitted
and report the blocker.

## 8. Final Response

After completing the task, report:

### Files Changed
List newly created and modified files.

### Tests Created
Explain the test cases added.

### Validation
Report:
- Test results
- Lint results
- TypeScript results

### Git
Report:
- Commit message
- Commit hash
- Whether the commit succeeded

Do not claim a commit succeeded without
confirming it from Git.
