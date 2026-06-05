import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";
import { extractErrorMessage } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Fetch current user profile details using the stored token
   */
  const loadUser = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data = await authService.getMe();
      setUser(data.user);
    } catch (err) {
      console.error("Failed to load user profile on boot:", err);
      // Clear expired or invalid credentials
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // On initial app mount, check if token exists and fetch user profile
  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, [token, loadUser]);

  /**
   * Handles user login flow
   * @param {string} email 
   * @param {string} password 
   */
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data = await authService.login(email, password);
      // 1. Persist token
      localStorage.setItem("token", data.token);
      setToken(data.token);
      
      // 2. Fetch full user details (since login endpoint only returns token)
      const userData = await authService.getMe();
      setUser(userData.user);
      return userData.user;
    } catch (err) {
      const errMsg = extractErrorMessage(err);
      setAuthError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user registration flow
   * @param {object} userData - { name, email, password, city, role }
   */
  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const data = await authService.register(userData);
      return data;
    } catch (err) {
      const errMsg = extractErrorMessage(err);
      setAuthError(errMsg);
      throw new Error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles user logout flow
   */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        authError,
        login,
        register,
        logout,
        loadUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to consume AuthContext cleanly
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
