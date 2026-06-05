import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Providers from "./pages/Providers";
import ProviderDetails from "./pages/ProviderDetails";
import AvailableSlots from "./pages/AvailableSlots";
import MyBookings from "./pages/MyBookings";

// Provider Pages
import ProviderDashboard from "./pages/ProviderDashboard";
import MyServices from "./pages/MyServices";
import CreateService from "./pages/CreateService";
import MySlots from "./pages/MySlots";
import CreateSlot from "./pages/CreateSlot";
import ProviderBookings from "./pages/ProviderBookings";
import CreateProviderProfile from "./pages/CreateProviderProfile";

// Provider Route Guard
import ProviderProfileRoute from "./components/ProviderProfileRoute";

// Marketing & Helper Pages
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Public Auth Routes - guarded against logged-in users */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes - guarded against unauthenticated users */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Customer Specific Protected Routes */}
          <Route
            path="/providers"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Providers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/providers/:id"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ProviderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/:serviceId/slots"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <AvailableSlots />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Provider Specific Profile Creation Route */}
          <Route
            path="/provider/create-profile"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <CreateProviderProfile />
              </ProtectedRoute>
            }
          />

          {/* Provider Specific Protected Routes (Profile Required) */}
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderProfileRoute>
                  <ProviderDashboard />
                </ProviderProfileRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/services"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderProfileRoute>
                  <MyServices />
                </ProviderProfileRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/services/create"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderProfileRoute>
                  <CreateService />
                </ProviderProfileRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/slots"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderProfileRoute>
                  <MySlots />
                </ProviderProfileRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/slots/create"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderProfileRoute>
                  <CreateSlot />
                </ProviderProfileRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/bookings"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderProfileRoute>
                  <ProviderBookings />
                </ProviderProfileRoute>
              </ProtectedRoute>
            }
          />

          {/* Unmatched Routes fall back to 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
