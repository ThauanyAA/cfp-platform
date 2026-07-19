## MODIFIED Requirements

### Requirement: Frontend Form and State Management
The Angular frontend SHALL implement a standalone CFP submission form using Angular Signals for state management and form validation. The submission button SHALL be disabled as long as the form state is invalid. The form SHALL also include a navigation button/link to access the submissions dashboard.

#### Scenario: Initial state check
- **WHEN** the user navigates to the CFP submission page
- **THEN** the form Signal state represents an empty and invalid form, the submit button is disabled, and a navigation button to the dashboard is visible

#### Scenario: Valid input enables submit button
- **WHEN** the user enters a valid name, valid email, and non-empty talk title
- **THEN** the form Signal state updates to valid and the submit button is enabled

#### Scenario: Navigation to dashboard
- **WHEN** the user clicks the navigation button/link on the CFP form
- **THEN** the router navigates the user to the `/dashboard` route
