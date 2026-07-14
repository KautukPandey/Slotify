# Folder Structure - Slotify Frontend

```
Frontend/
├── public/                 # Static assets (favicons, svgs, etc.)
├── src/                    # Primary source code
│   ├── components/         # Global reusable components & routers
│   │   ├── Layout.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── PageHeader.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ProviderProfileRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── context/            # React Auth Context state providers
│   │   └── AuthContext.jsx
│   ├── pages/              # User Flow Pages (Customer & Provider)
│   │   ├── AvailableSlots.jsx
│   │   ├── CreateProviderProfile.jsx
│   │   ├── CreateService.jsx
│   │   ├── CreateSlot.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── MyBookings.jsx
│   │   ├── MyServices.jsx
│   │   ├── MySlots.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProviderBookings.jsx
│   │   ├── ProviderDashboard.jsx
│   │   ├── ProviderDetails.jsx
│   │   ├── Providers.jsx
│   │   └── Register.jsx
│   ├── services/           # Axios central base & API endpoints service layer
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── bookingService.js
│   │   ├── providerBookingService.js
│   │   ├── providerDashboardService.js
│   │   ├── providerProfileService.js
│   │   ├── providerService.js
│   │   ├── reviewService.js
│   │   └── slotService.js
│   ├── utils/              # Helper utilities
│   ├── App.jsx             # React Router structure route definitions
│   ├── index.css           # Global CSS variables & UI typography theme classes
│   └── main.jsx            # Entry point configuration
├── eslint.config.js        # Lint configuration
├── index.html
├── package.json
└── vite.config.js          # Vite config
```
