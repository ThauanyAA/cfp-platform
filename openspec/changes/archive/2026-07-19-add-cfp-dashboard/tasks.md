## 1. Backend Verification

- [x] 1.1 Verify GET /api/cfp endpoint in CfpController and CfpService is fully integrated and functional.

## 2. Service Extension

- [x] 2.1 Add getCfps() method in CfpService to perform GET /api/cfp, returning Observable<SpeakerDTO[]>.

## 3. CfpDashboardComponent Implementation

- [x] 3.1 Generate CfpDashboardComponent structure (TypeScript, HTML, CSS, Spec).
- [x] 3.2 Implement logic in cfp-dashboard.component.ts to fetch talks using CfpService and store in a WritableSignal<SpeakerDTO[]>.
- [x] 3.3 Implement template in cfp-dashboard.component.html with semantic HTML (table or list of cards) and appropriate WAI-ARIA roles.
- [x] 3.4 Replicate original CfpFormComponent styles, colors, and layout in cfp-dashboard.component.css.

## 4. Routing and Navigation Linkage

- [x] 4.1 Update app.routes.ts to define route path 'dashboard' referencing CfpDashboardComponent.
- [x] 4.2 Add a styled navigation link/button in CfpFormComponent template and style it.
- [x] 4.3 Add a styled back-navigation link/button in CfpDashboardComponent template.

## 5. Testing and Validation

- [x] 5.1 Implement unit tests in cfp-dashboard.component.spec.ts to verify Signal initialization and rendering.
- [x] 5.2 Execute all monorepo test targets (`api`, `frontend`, `shared-types`) and verify success.
