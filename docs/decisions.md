# Architectural Decisions - Slotify

## Decision: Setup Project Knowledge Base under `/docs`
* **Reason**: Centralizes project state, components schemas, API configurations, and folder structure. Assures documentation is never outdated.
* **Alternatives Considered**: Keeping architecture in generic MD files. Rejected due to need for granular documentation files.

## Decision: Unified Custom Theme Class System in `index.css`
* **Reason**: Centralizes Royal Blue (`#2563EB`) as primary, background as `#F8FAFC`, cards as white with standard borders, allowing simple drop-in classes like `btn-primary` and `card`.
* **Alternatives Considered**: Configuring inline Tailwind color classes. Rejected because custom theme variables in css are simpler to manage consistently.
