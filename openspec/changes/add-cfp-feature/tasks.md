## 1. Backend NestJS API Setup and Validation

- [ ] 1.1 Create the backend DTO class `CreateSpeakerDto` implementing `SpeakerDTO` with `class-validator` decorators.
- [ ] 1.2 Implement NestJS Controller and Service for CFP endpoint at POST `/api/cfp`.
- [ ] 1.3 Ensure the `ValidationPipe` is active globally in backend `main.ts` to filter incoming payloads automatically.
- [ ] 1.4 Write Jest tests verifying that invalid payloads (e.g. invalid email format, empty name) are rejected with a `400 Bad Request` response.

## 2. Frontend Angular Component and Signal State

- [ ] 2.1 Create the Standalone Component `CfpFormComponent` in the frontend application.
- [ ] 2.2 Implement form controls using Angular Signals for state management and validation.
- [ ] 2.3 Apply WAI-ARIA accessibility markers (`aria-required`, `aria-invalid`, `aria-describedby`, etc.) to the HTML template.
- [ ] 2.4 Create a frontend service to handle POST submission to `/api/cfp` using Angular `HttpClient`.
- [ ] 2.5 Configure router to map `/cfp` path to the new standalone `CfpFormComponent` in `app.routes.ts`.
- [ ] 2.6 Write Jest tests to validate component initial state and button disabled/enabled behavior based on the Signals validation state.
