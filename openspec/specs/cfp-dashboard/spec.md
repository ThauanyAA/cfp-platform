# cfp-dashboard Specification

## Purpose
Organizers need a user-friendly and visually cohesive interface to view all submitted Call for Papers (CFP) proposals in one place to evaluate submissions.

## Requirements

### Requirement: CFP submissions query
The NestJS API backend SHALL expose a `GET /api/cfp` endpoint that retrieves all submitted CFP entries as an array of `SpeakerDTO` JSON objects.

#### Scenario: Retrieve all submissions successfully
- **WHEN** client sends a GET request to `/api/cfp`
- **THEN** system returns status code `200 OK` and a list of all CFP submissions.

### Requirement: Frontend CFP Dashboard Component and state management
The Angular frontend SHALL implement a standalone `CfpDashboardComponent` that fetches submitted talks from the backend using the `CfpService` and manages the retrieved list using an Angular Writable Signal (`WritableSignal<SpeakerDTO[]>`).

#### Scenario: Dashboard initializes and lists submissions
- **WHEN** the dashboard component initializes
- **THEN** it triggers a GET request to `/api/cfp`, populates the Signal state, and renders the submissions in a semantic table or cards.

### Requirement: Consistent visual layout and styling
The frontend dashboard SHALL apply semantically correct HTML structure (such as a table or cards) and visually match the established design theme, colors, and layout patterns from `CfpFormComponent` (including container dimensions, border styles, text sizes, and font-families).

#### Scenario: Dashboard visual consistency check
- **WHEN** the dashboard component is rendered
- **THEN** its UI elements use styling tokens matching the form (e.g., backgrounds, spacing, borders, buttons).
