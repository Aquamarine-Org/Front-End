/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";
import { useCallback } from "react";
import {
  apiPost,
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from "../lib/api.js";

const AuthContext = createContext(null);

function normalizeSession(response) {
  return {
    token: response.token || response.Token || "",
    expiration: response.expiration || response.Expiration || null,
    name: response.name || response.Name || "",
    email: response.email || response.Email || "",
    tipoUsuario: response.tipoUsuario || response.TipoUsuario || "",
    emailVerificado:
      response.emailVerificado ?? response.EmailVerificado ?? false,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadAuthSession());

  const persistSession = useCallback((response) => {
    const normalizedSession = normalizeSession(response);
    setSession(normalizedSession);
    saveAuthSession(normalizedSession);
    return normalizedSession;
  }, []);

  const updateSession = useCallback((patch) => {
    setSession((currentSession) => {
      const nextSession = {
        ...(currentSession || {}),
        ...patch,
      };

      saveAuthSession(nextSession);
      return nextSession;
    });
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const response = await apiPost("/auth/login", { email, password });
    return persistSession(response);
  }, [persistSession]);

  const register = useCallback(async (payload) => {
    const response = await apiPost("/auth/register", payload);
    return persistSession(response);
  }, [persistSession]);

  const logout = useCallback(() => {
    clearAuthSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.token),
      login,
      register,
      updateSession,
      logout,
    }),
    [session, login, register, updateSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
