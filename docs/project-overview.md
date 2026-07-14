# Project Overview - Slotify

## Project Purpose
Slotify is a premium service marketplace designed to connect service providers (contractors, trainers, consultants, designers, etc.) with customers looking to schedule, book, and manage services in their city or remotely.

## Key Features
- **Provider Discovery**: Grid lists, filterable by categories or search keywords (e.g. Design, Consulting).
- **Service Listings & Description**: Individual services offered by a provider, showing price, duration, and specifications.
- **Dynamic Slot Scheduling**: Real-time slot display, preventing concurrent bookings, with instant verification confirmation.
- **Provider Profiles & Ratings**: Reputability ratings based on verified customer feedback.
- **Dashboards**: Dedicated dashboards for customers (bookings, search history, spend metric stats) and providers (availability creation, service management, client metrics).

## User Roles
1. **Customer**: Searches for, books, and cancels appointment slots. Provides reviews.
2. **Provider**: Manages services, creates time slots, manages onboarding profiles, and marks bookings as completed or cancelled.

## Technology Stack
- **Frontend**: React + Vite + Tailwind CSS v4 + React Router v7
- **Backend**: Node.js + Express
- **Database**: MongoDB (via Mongoose)
- **APIs**: RESTful with JWT auth headers, integrated in the frontend via Axios Interceptors and service-layer classes.

## Current Implementation Status
- Basic functioning backend controllers, database schemas, and routes.
- React frontend components and contexts are fully functional but currently lack visual polish, responsiveness, and consistent design aesthetics.

## Future Goals
- Implement elegant visual interfaces, smooth micro-animations, premium marketplace discovery dashboards, dark mode toggles, and solid responsive views.
