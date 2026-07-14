# Reusable Components - Slotify

## Component Checklist
- `Layout.jsx`
- `Navbar.jsx`
- `Footer.jsx` (New component extracted from Landing page footer)
- `Button.jsx` (Custom UI button: Primary, Secondary, Danger, Ghost)
- `Card.jsx` (Custom UI card with hover states)
- `Badge.jsx` (Custom status badge metrics wrapper)
- `Input.jsx` (Custom UI input fields with error bounds & icon integrations)
- `Modal.jsx` (Custom UI modal overlays with animation overlays)
- `PageHeader.jsx`
- `LoadingSpinner.jsx` (includes skeletons)
- `ProtectedRoute.jsx`
- `PublicRoute.jsx`
- `ProviderProfileRoute.jsx`

---

### Button
**Purpose**: Reusable visual button supporting multiple actions, outlines, disabled inputs and pending statuses.
- **Props**:
  - `children` (React Node)
  - `variant` (String): 'primary' | 'secondary' | 'danger' | 'ghost'
  - `isLoading` (Boolean): Renders spin loading animations.
  - `disabled` (Boolean)

### Card
**Purpose**: Container class to establish visual surfaces (pricing blocks, review tables, provider summaries).
- **Props**:
  - `hover` (Boolean): Adds soft translate lift on hover.

### Badge
**Purpose**: Displays status metrics (pending -> Blue/Amber, completed -> Emerald/Green, cancelled -> Red).

### Input
**Purpose**: Direct text inputs with label positioning and custom error bounds.
- **Props**:
  - `label`, `error`, `icon`, `suffix`.

### Modal
**Purpose**: Standard overlay dialogue box with scale animation and overlay handlers.
