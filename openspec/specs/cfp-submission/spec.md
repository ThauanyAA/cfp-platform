# cfp-submission Specification

## Purpose
TBD - created by archiving change add-cfp-feature. Update Purpose after archive.
## Requirements
### Requirement: Backend validation and submission
The NestJS API backend SHALL validate incoming talk submissions using a class-validator DTO mapping to the shared `SpeakerDTO` contract. The system SHALL reject any invalid payload with a `400 Bad Request` status code.

#### Scenario: Successful CFP submission
- **WHEN** client sends a valid `SpeakerDTO` payload to POST `/api/cfp`
- **THEN** system processes the submission and returns a `201 Created` status code

#### Scenario: Invalid email submission
- **WHEN** client sends a `SpeakerDTO` payload with an invalid email format (e.g. `invalid-email`) to POST `/api/cfp`
- **THEN** system rejects it and returns a `400 Bad Request` status code

#### Scenario: Missing required fields
- **WHEN** client sends a `SpeakerDTO` payload with missing `name` or `talkTitle` to POST `/api/cfp`
- **THEN** system rejects it and returns a `400 Bad Request` status code

### Requirement: Frontend Form and State Management
The Angular frontend SHALL implement a standalone CFP submission form using Angular Signals for state management and form validation. The submission button SHALL be disabled as long as the form state is invalid.

#### Scenario: Initial state check
- **WHEN** the user navigates to the CFP submission page
- **THEN** the form Signal state represents an empty and invalid form, and the submit button is disabled

#### Scenario: Valid input enables submit button
- **WHEN** the user enters a valid name, valid email, and non-empty talk title
- **THEN** the form Signal state updates to valid and the submit button is enabled

### Requirement: WAI-ARIA Accessibility compliance
The frontend form controls SHALL include accessibility metadata in accordance with WAI-ARIA standards. This includes `aria-required`, `aria-invalid`, `aria-describedby` for validation errors, and proper semantic labelling.

#### Scenario: Form elements accessible tags check
- **WHEN** the CFP form is rendered
- **THEN** all input elements have associated label elements or `aria-label`, correct input types, and dynamic `aria-invalid` values reflecting validation state

