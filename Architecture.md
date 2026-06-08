# Slotify — Architecture & Engineering Decisions

A technical deep-dive into how Slotify is built, why certain decisions were made, and what tradeoffs were considered.

→ Back to [README](./README.md)

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Authentication Flow](#authentication-flow)
3. [Role-Based Access Control](#role-based-access-control)
4. [Database Design](#database-design)
5. [Booking Workflow](#booking-workflow)
6. [Engineering Decisions](#engineering-decisions)
7. [Challenges Solved](#challenges-solved)

---

## System Architecture

Slotify follows a layered architecture where each layer has a single responsibility.

```
Customer / Provider
        │
        ▼
  React Frontend
        │
        ▼
  Axios Service Layer
  (token auto-injected via interceptors)
        │
        ▼
  Express Routes
        │
        ▼
  Controllers
        │
        ▼
  Middleware
  (JWT verification + role checks)
        │
        ▼
  MongoDB Models
        │
        ▼
  MongoDB Database
```

**Why this structure?**

- Frontend components stay focused on UI — no business logic leaks in
- Controllers own all business logic — not routes, not models
- Auth logic is centralized in middleware — applied consistently across all protected routes
- The separation makes individual layers easy to test, debug, and extend

---

## Authentication Flow

### Registration

```
Register Form
     │
     ▼
POST /api/auth/register
     │
     ▼
Hash password (bcrypt)
     │
     ▼
Create User in MongoDB
     │
     ▼
Return JWT
```

### Login

```
Login Form
     │
     ▼
POST /api/auth/login
     │
     ▼
Validate credentials
     │
     ▼
Generate JWT (contains userId + role)
     │
     ▼
Return token to client
```

### Session Persistence

```
JWT stored in localStorage
          │
          ▼
Axios request interceptor
          │
          ▼
Authorization: Bearer <token> header added automatically
          │
          ▼
Backend middleware verifies token on every protected request
```

**Why JWT?**

- Stateless — no server-side session storage needed
- Token carries role information, enabling RBAC without extra DB queries
- Scales naturally — any server instance can verify the token
- Industry standard with broad library support

---

## Role-Based Access Control

Slotify has two roles: **customer** and **provider**.

### What each role can do

| Action | Customer | Provider |
|---|---|---|
| Browse providers | ✅ | ✅ |
| Book appointments | ✅ | ❌ |
| Cancel own bookings | ✅ | ❌ |
| Create provider profile | ❌ | ✅ |
| Create services | ❌ | ✅ |
| Create slots | ❌ | ✅ |
| Mark bookings complete | ❌ | ✅ |

### Authorization is enforced at two layers

**Frontend**
```jsx
<ProtectedRoute allowedRoles={["provider"]}>
  <ProviderDashboard />
</ProtectedRoute>
```
Hides inaccessible pages from the UI — improves UX.

**Backend**
```js
router.post("/slots", protect, providerProtect, createSlot);
```
`protect` — verifies JWT is valid and attaches user to request  
`providerProtect` — confirms the authenticated user has the provider role

Backend enforcement is the actual security layer. Even direct Postman requests to the API are blocked if the token doesn't carry the right role.

---

## Database Design

### Models

**User**
```js
{
  name: String,
  email: String,       // unique
  password: String,    // bcrypt hashed
  city: String,
  role: String         // "customer" | "provider"
}
```

**Provider**
```js
{
  user: ObjectId,       // ref: User
  businessName: String,
  description: String,
  city: String
}
```

**Service**
```js
{
  provider: ObjectId,   // ref: Provider
  name: String,
  description: String,
  price: Number,
  duration: Number
}
```

**Slot**
```js
{
  service: ObjectId,    // ref: Service
  createdBy: ObjectId,  // ref: Provider
  date: Date,
  time: String
}
```

**Booking**
```js
{
  customer: ObjectId,   // ref: User
  provider: ObjectId,   // ref: Provider
  service: ObjectId,    // ref: Service
  slot: ObjectId,       // ref: Slot
  status: String,       // "pending" | "completed" | "cancelled"
  note: String
}
```

### Entity Relationship Diagram

```
USER ──────────────── PROVIDER
 │   (one user          │
 │    owns one          │ offers
 │    provider)         ▼
 │               SERVICE ──────── SLOT
 │                  │                │
 │ creates          │ booked_as      │ reserved_for
 ▼                  ▼                ▼
BOOKING ◄───────────────────────────┘
 ▲
 │ receives
PROVIDER
```

---

## Booking Workflow

```
Provider Creates Profile
         │
         ▼
Provider Creates Service
         │
         ▼
Provider Creates Slot
         │
         ▼
Customer Views Available Slots
         │
         ▼
Customer Books a Slot
         │
         ▼
Booking Record Created
         │
         ▼
Provider Views Booking in Dashboard
         │
         ▼
Provider Marks Booking as Completed
```

### Booking validation logic

Before any booking is created, the backend checks:

1. Does the slot exist?
2. Is the slot already booked?
3. Is the slot date in the future?
4. Does the customer already have a booking for this slot?

Only after all checks pass does the booking get written to the database. This prevents duplicate bookings and invalid reservations.

---

## Engineering Decisions

### 1. Context API for Auth State

**Problem:** Auth state (user object, token) is needed across many components — Navbar, protected routes, dashboards, booking pages.

**Without Context API:** State gets prop-drilled through the component tree.
```
App → Dashboard → Navbar → UserAvatar   (prop drilling)
```

**With Context API:**
```js
const { user } = useContext(AuthContext);  // available anywhere
```

Any component can read auth state directly without intermediary props.

---

### 2. Axios Interceptors

**Problem:** Every protected API call requires an `Authorization: Bearer <token>` header. Writing this on every request is repetitive and error-prone.

**Solution:** A single Axios interceptor injects the token automatically.

```js
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

All API calls go through this instance — token is never forgotten.

---

### 3. Service Layer Architecture

**Problem:** Mixing API call logic inside UI components couples them tightly and makes reuse difficult.

**Without service layer:**
```jsx
// Inside Login.jsx
const res = await axios.post("/api/auth/login", { email, password });
```

**With service layer:**
```jsx
// Login.jsx
const res = await authService.login({ email, password });

// authService.js
const login = (data) => axiosInstance.post("/api/auth/login", data);
```

Benefits: API logic is centralized and reusable. Components only care about UI and state.

---

### 4. Booking Stores Full References

**Decision:** The Booking model stores references to customer, provider, service, and slot — not just the slot.

**Why not just store the slot?**

```
Booking → Slot → Service → Provider   (multiple joins needed per query)
```

Storing all references directly:
```
Booking → customer ✅
Booking → provider ✅
Booking → service  ✅
Booking → slot     ✅
```

Queries like "get all bookings for this provider" resolve in a single lookup instead of traversing the entire relationship chain. Faster reads at the cost of minor write redundancy — the right tradeoff for a read-heavy booking system.

---

### 5. Double Authorization (Frontend + Backend)

**Frontend check:** Hides inaccessible routes from the UI, improves user experience.

**Backend check:** Enforces actual security. If someone calls the API directly (via Postman, curl, or a modified frontend), the backend still rejects unauthorized requests.

The frontend check is a UX optimization. The backend check is the security guarantee.

---

## Challenges Solved

### Duplicate Booking Prevention

Only one booking can exist per slot. The booking creation logic checks for an existing booking on the slot before writing, and a unique constraint ensures database-level enforcement even under concurrent requests.

### Authentication Persistence Across Page Refreshes

JWT is stored in localStorage. On app load, the AuthContext reads the token, validates it with `GET /api/auth/getMe`, and restores the user session — so users stay logged in across refreshes without re-entering credentials.

### Provider Onboarding Gate

A user with the provider role must explicitly create a Provider profile before accessing provider tools. This is enforced both in the frontend (redirect to onboarding if no profile found) and backend (provider profile lookup required before slot/service creation).

### Relationship Integrity Across Five Models

Maintaining clean references across User → Provider → Service → Slot → Booking required careful model design. ObjectId references with Mongoose populate keep data normalized while still allowing efficient querying when needed.