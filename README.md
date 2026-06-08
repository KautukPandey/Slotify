# Slotify

> A full-stack appointment booking platform that connects customers with service providers through a simple scheduling workflow.

🔗 **[Live Demo](https://your-slotify-url.onrender.com)** &nbsp;|&nbsp; 📄 **[Architecture & Design Decisions](./ARCHITECTURE.md)**

---

## What It Does

Customers discover providers, browse services, view available slots, and manage bookings. Providers create business profiles, offer services, publish availability, and track appointments — all through role-specific dashboards.

---

## Features

**Customer**
- Browse providers and explore services
- View available appointment slots
- Book appointments and manage bookings
- Cancel bookings

**Provider**
- Create and manage a business profile
- Create services and publish appointment slots
- View incoming bookings
- Mark bookings as completed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, Context API, Tailwind CSS, Vite |
| Backend | Node.js, Express.js, REST APIs |
| Auth | JWT, Role-Based Access Control |
| Database | MongoDB, Mongoose |
| HTTP Client | Axios with Interceptors |

---

## Architecture

```
React Frontend
      │
Axios Service Layer  ← Auth token auto-injected via interceptors
      │
Express Routes
      │
Controllers + Middleware  ← JWT verify + role checks
      │
MongoDB (Mongoose Models)
```

→ Full architecture breakdown, database design, and engineering decisions in [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Project Structure

```
Slotify/
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/        ← Auth state via Context API
│       ├── pages/
│       ├── services/       ← Axios service layer
│       └── App.jsx
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middlewares/        ← protect, providerProtect
    ├── db/
    └── server.js
```

---

## API Endpoints

```
POST  /api/auth/register
POST  /api/auth/login
GET   /api/auth/getMe

POST  /api/providers
GET   /api/providers
GET   /api/providers/:id

POST  /api/services
GET   /api/providers/:providerId/services

POST  /api/slots
GET   /api/slots

POST  /api/bookings
GET   /api/bookings/me
GET   /api/bookings/provider
PATCH /api/bookings/cancel
PATCH /api/bookings/complete
```

---

## Future Improvements

- Online payments integration
- Email and SMS notifications
- Appointment reminders
- Ratings and reviews
- Admin dashboard

---

## Author

**Kautuk Pandey** — Full-Stack Developer (MERN Stack)