## 1. Setup Cypress in frontend-e2e

- [ ] 1.1 Run `@nx/cypress:configuration` for `frontend-e2e` with `--directory=src` to create the configuration files
- [ ] 1.2 Verify Cypress configuration file `frontend-e2e/cypress.config.ts` exists

## 2. Implement E2E Tests for Event Registration

- [ ] 2.1 Create the Cypress spec file at `frontend-e2e/src/e2e/event-registration.cy.ts`
- [ ] 2.2 Implement the E2E Success Scenario: navigate to `/event/new`, fill in Nome, Endereço, Capacidade, Data, click submit, and verify success message
- [ ] 2.3 Implement the E2E Error Scenario: navigate to `/event/new`, submit the empty form, and verify native/custom validation error messages are visible

## 3. Verification

- [ ] 3.1 Run the E2E tests using `npx nx e2e frontend-e2e` (or configured Cypress run command) and verify they pass
