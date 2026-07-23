## ADDED Requirements

### Requirement: E2E Verification of Successful Event Registration
The system SHALL support E2E validation of the event registration form, verifying that entering valid data in the Nome, Endereço, Capacidade, and Data fields and submitting successfully creates the event.

#### Scenario: Successful event registration E2E test
- **WHEN** the E2E test navigates to /event/new, fills in Nome, Endereço, Capacidade, and Data, and submits the form
- **THEN** the system registers the event and shows a success message

### Requirement: E2E Verification of Empty Form Validation
The system SHALL support E2E validation of form validation errors, verifying that submitting an empty form triggers validation error messages on all required fields.

#### Scenario: Empty form validation error display E2E test
- **WHEN** the E2E test navigates to /event/new, submits the empty form
- **THEN** validation error messages for required fields are displayed on the screen
