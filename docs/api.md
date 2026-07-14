# API Documentation - Slotify

All outbound React client requests are routed through `services/api.js` which points to `http://localhost:8000/api` (configurable via `VITE_API_URL` environment variable).

## Authentication

All endpoints under `/api/auth` manage authentication states and sessions.

### Register User
* **Endpoint**: `POST /api/auth/register`
* **Body**:
```json
{
  "name": "John Doe",
  "email": "customer@example.com",
  "password": "securepassword",
  "city": "San Francisco",
  "role": "customer"
}
```
* **Response**: `201 Created` with signed token:
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "_id": "603f9a...",
    "name": "John Doe",
    "email": "customer@example.com",
    "role": "customer",
    "city": "San Francisco"
  }
}
```

### Login User
* **Endpoint**: `POST /api/auth/login`
* **Body**:
```json
{
  "email": "customer@example.com",
  "password": "securepassword"
}
```
* **Response**: `200 OK` with session JWT token.

### Get Current User Profile
* **Endpoint**: `GET /api/auth/getMe`
* **Headers**: `Authorization: Bearer <token>`
* **Response**: `200 OK` JSON representing current user.

---

## Service Providers

### Browse Providers
* **Endpoint**: `GET /api/providers`
* **Query Params**: `?city=San+Francisco` or `?search=Design`
* **Response**: List of provider entries.

### View Provider Details
* **Endpoint**: `GET /api/providers/:id`
* **Response**: Details of the provider, their offered services, and lists of reviews.

---

## Services & Slots

### Book a Slot
* **Endpoint**: `POST /api/bookings`
* **Body**:
```json
{
  "provider": "provider_id",
  "service": "service_id",
  "slot": "slot_id",
  "note": "Optional client note"
}
```
* **Response**: `201 Created` booking object.
