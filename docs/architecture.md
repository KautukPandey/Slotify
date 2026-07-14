# Architecture - Slotify

## Context Providers
- **AuthContext.jsx** (`src/context/AuthContext.jsx`): Manages authentication state (`user`, `isAuthenticated`, `loading`). Restores session on load via `/api/auth/getMe` and handles login, logout, and token lifecycle in localStorage.

## Frontend Folder Structure (High-level)
- `src/components/`: Reusable layouts, routers, and generic UI components.
- `src/context/`: React context hooks.
- `src/pages/`: Marketplace and Dashboard pages.
- `src/services/`: Central API client layer (Axios and module endpoints).
- `src/utils/`: Standard helper mechanisms.

## Authentication Flow
1. User logs in/registers -> server returns signed JWT token.
2. Token is saved in `localStorage` by `AuthContext`.
3. An Axios interceptor injects the JWT token into the Bearer header of every API call.
4. Routing guards (`ProtectedRoute.jsx`, `PublicRoute.jsx`, `ProviderProfileRoute.jsx`) dictate layout visibility and access checks.

## Booking Flow
1. **Customer** browses a Provider and selects a Service inside `ProviderDetails.jsx`.
2. Pages redirect customer to `AvailableSlots.jsx` for that service.
3. Customer clicks a time slot, which triggers a popover confirmation modal.
4. API calls are sent via `bookingService.js` to create the booking.
5. Backend verifies validation criteria (slot availability, dates in future) and locks the slot.

## Provider Flow
1. Provider registers and completes onboarding in `CreateProviderProfile.jsx`.
2. Provider gains access to provider routes, creating services in `CreateService.jsx` and slots in `CreateSlot.jsx`.
3. Provider dashboard monitors bookings and marks sessions as completed or cancelled.
