## Why

This change introduces end-to-end (E2E) testing for the Event Registration page (`/event/new`) to ensure that users can successfully register events and receive proper validation feedback when submitting invalid form data.

## What Changes

- Set up Cypress configuration for the `frontend-e2e` project.
- Create a new Cypress E2E test file `frontend-e2e/src/e2e/event-registration.cy.ts`.
- Implement E2E test scenarios for successful event registration and validation error checking.

## Capabilities

### New Capabilities
- `event-registration`: E2E test coverage for event registration page including successful form submission and validation error assertions.

### Modified Capabilities

## Impact

- Adds Cypress config to `frontend-e2e`.
- Adds Cypress tests to `frontend-e2e/src/e2e/event-registration.cy.ts`.
