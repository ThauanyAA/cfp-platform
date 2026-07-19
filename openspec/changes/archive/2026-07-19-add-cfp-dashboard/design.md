## Context

The Call for Papers (CFP) submission application currently has a submission form `CfpFormComponent` and a NestJS API `CfpController` with `Post` and `Get` endpoints already defined. However, there is no UI page/dashboard to browse the submitted talks, nor is there a navigation link to navigate between the form and the dashboard.

## Goals / Non-Goals

**Goals:**
- Implement a `CfpDashboardComponent` standalone component at the route path `'dashboard'`.
- Retrieve submitted talks from `GET /api/cfp` via `CfpService`.
- Replicate the visual layout style, colors, dark mode look, fonts, and responsiveness from `CfpFormComponent` for consistency.
- Implement state management using Angular Signals.
- Add navigation buttons on the form and dashboard.
- Create unit tests for NestJS and Angular dashboard logic.

**Non-Goals:**
- Implementing database persistence (the in-memory service is sufficient).
- Implementing authentication or authorization for organizers.
- Adding pagination or advanced sorting/filtering (basic list representation is sufficient).

## Decisions

### D1: Frontend State Management with Signals
- **Choice**: Use Angular Writable Signal `submissions = signal<SpeakerDTO[]>([])`.
- **Rationale**: Keeps local state synchronous, easy to render dynamically in the template, and aligns with the existing architecture.

### D2: Navigation Implementation
- **Choice**: Add a navigation bar or header button at the top/bottom of `CfpFormComponent` and `CfpDashboardComponent`.
- **Rationale**: Simple navigation without adding a complex layout container structure. Reuses the form's CTA button styling.

### D3: Visual Cohesion and Styling
- **Choice**: Replicate glassmorphism cards and tables using CSS variables. We will copy over the design tokens and theme styles from `cfp-form.component.css` or ensure `styles.css` is updated with global colors if applicable.
- **Rationale**: Keeps the visual look identical to the premium styling established in the original form.

## Risks / Trade-offs

- **[Risk] Visual Style Drift** -> *Mitigation*: Directly match layout width (`max-width: 600px` or `800px`), CSS gradients, card container styling, and fonts.
- **[Risk] In-memory reset** -> *Mitigation*: Form submissions are lost when NestJS restarts. Since persistence is a non-goal, we accept this.
