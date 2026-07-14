# Routes - Slotify

All routes registered in the application, including privacy protections and user roles requirements:

| Route Path | Type | Role | Purpose |
|---|---|---|---|
| `/` | Public | Any | Home service discovery page |
| `/login` | Public (Unauthenticated only) | Any | User credential entry |
| `/register` | Public (Unauthenticated only) | Any | Provider/Customer subscription signup |
| `/dashboard` | Protected | Any | Navigates user to role-specific dashboard |
| `/providers` | Protected | Customer | Searches & lists active providers |
| `/providers/:id` | Protected | Customer | Provider details page with calendar booking triggers |
| `/services/:serviceId/slots` | Protected | Customer | Dynamic time slot selection interface |
| `/bookings` | Protected | Customer | Lists owned booked slots (pending/completed/cancelled) |
| `/provider/create-profile` | Protected | Provider | Profile creation gate (business details) |
| `/provider/dashboard` | Protected & Profile Guard | Provider | Metric cards & booking summaries |
| `/provider/services` | Protected & Profile Guard | Provider | Lists services offered by the provider |
| `/provider/services/create` | Protected & Profile Guard | Provider | Form to publish a new service |
| `/provider/slots` | Protected & Profile Guard | Provider | Lists all created booking dates & hours |
| `/provider/slots/create` | Protected & Profile Guard | Provider | Form to publish available slot times |
| `/provider/bookings` | Protected & Profile Guard | Provider | Lists client bookings with status actions |
| `*` | Helper | Any | Renders 404 NotFound page |
