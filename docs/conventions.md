# Coding Conventions - Slotify

## Component & File Naming
- **React Components**: PascalCase (e.g. `Layout.jsx`, `PageHeader.jsx`).
- **Services & Utils**: camelCase (e.g. `authService.js`, `api.js`).
- **HTML/CSS Pages**: PascalCase for route components (e.g. `ProviderDashboard.jsx`).

## Component Layout Structure
- Imports (ordered: libraries, React context, hooks/routes, components, services, CSS).
- Component definition.
- Props validation (if applicable).
- Export default statement.

## Tailwind CSS Usage Rules
- Avoid duplicating long Tailwind style lists in repeated elements. Move recurring stylings (Buttons, Inputs, Cards, Badges) into `index.css` as semantic classes (e.g., `.btn-primary`, `.card`, `.input`).
- Maintain visual harmony with the established colors of the design system. Do not introduce arbitrary color variables or inline gradients that clash with the system.

## State Management Guidelines
- Keep state local to pages or components whenever possible.
- Use `AuthContext` only for session state, login token cache, and current user profile details.
- Inject headers automatically through the central axiosInstance (`api.js`) request interceptor, not in single page controllers.
