## Context

The repository has an existing `frontend` Angular project with an `/event/new` route displaying an Event Registration form. However, there are currently no Cypress E2E tests configured or written for this form. E2E tests are required to ensure both successful form submission and empty form validation behavior.

## Goals / Non-Goals

**Goals:**
- Set up and configure Cypress E2E testing for the `frontend-e2e` project.
- Create Traditional Cypress tests for the `/event/new` Event Registration form.
- Implement a success scenario: navigate, fill input fields, submit, and verify success alert.
- Implement an error scenario: navigate, submit empty form (either via form submit or programmatic triggering), and verify that native/custom error messages are displayed.

**Non-Goals:**
- Integrating AI-driven Cypress testing libraries.
- Rewriting or modifying the event-form component template or styles.
- Creating API unit tests or other end-to-end flows unrelated to `/event/new`.

## Decisions

### Decision 1: Setup Cypress inside the `frontend-e2e` project
- **Option A**: Use Playwright (existing setup). Playwright is currently set up, but the task explicitly requests E2E tests using Cypress.
- **Option B**: Run `@nx/cypress:configuration` for `frontend-e2e` to add Cypress alongside or in place of Playwright.
- **Rationale**: We will run `@nx/cypress:configuration` with target project `frontend-e2e`, specifying `--directory=src` so files are generated in `frontend-e2e/src/e2e/`.

### Decision 2: Target form submission in error scenarios
- **Option A**: Click each input, blur, and verify errors.
- **Option B**: Trigger `submit` on the form directly (e.g. `cy.get('form').submit()`) to mark all controls as touched and display error messages.
- **Rationale**: Submitting the form directly is more comprehensive as it triggers the component's `onSubmit` logic which runs `markAllAsTouched()`, matching exactly the user's intent to submit and see error messages.

## Risks / Trade-offs

- **[Risk]** Cypress dependencies or configs might conflict with Playwright.
  - *Mitigation*: We will specify `--directory=src` and keep Playwright configurations untouched, or allow Cypress to configure targets under `frontend-e2e` project as structured by Nx.
