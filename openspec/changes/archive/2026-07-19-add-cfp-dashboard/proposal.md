## Why

Organizers need a user-friendly and visually cohesive interface to view all submitted Call for Papers (CFP) proposals in one place to evaluate submissions.

## What Changes

- **Backend (NestJS)**: Ensure the `GET /api/cfp` endpoint returns all submitted proposals correctly.
- **Frontend (Angular)**:
  - Create a new standalone component `CfpDashboardComponent` to show submissions in a responsive table or cards, maintaining the existing design theme and tokens.
  - Extend `CfpService` with a `getCfps()` method to fetch submissions via `HttpClient`.
  - Use Angular Signals (`WritableSignal<SpeakerDTO[]>`) in the dashboard to store and manage the list of proposals.
  - Setup routing in `app.routes.ts` mapping path `'dashboard'` to the new component.
  - Add navigation buttons to allow switching between the CFP form and the dashboard, styled consistently.
- **Testing**: Add Jest unit tests for the backend endpoint and frontend dashboard state and view rendering.

## Capabilities

### New Capabilities
- `cfp-dashboard`: Listing and displaying all submitted CFP talk proposals.

### Modified Capabilities
- `cfp-submission`: Add navigation capability to access the dashboard.

## Impact

- `CfpService` will be updated with a new query method.
- `app.routes.ts` will declare a new route.
- A new standalone component and its stylesheet will be introduced.
