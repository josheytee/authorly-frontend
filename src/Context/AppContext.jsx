import { createContext, useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setTokenState] = useState(getCookie("token")); // Read token from cookie initially
  const [user, setUser] = useState(null);

  // Helper function to set cookie with expiration
  function setCookie(name, value, minutes) {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000); // Set expiration to 60 minutes
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  // Helper function to get cookie by name
  function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let cookie of cookieArr) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return value;
      }
    }
    return null;
  }

  // Helper function to delete cookie
  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Custom setter for token that updates the cookie
  function setToken(newToken) {
    setTokenState(newToken);
    if (newToken) {
      setCookie("token", newToken, 60); // Set cookie for 60 minutes
    } else {
      deleteCookie("token"); // Clear cookie on logout
    }
  }

  // Fetch user data if the token exists
  async function getUser() {
    const data = await apiFetch("/api/user", "GET", token);
    if (data) {
      setUser(data);
    }
  }

  // Effect to load user info on token change
  useEffect(() => {
    if (token) {
      getUser();

      // Refresh token expiry on activity
      const refreshTokenTimeout = setInterval(() => {
        setCookie("token", token, 60); // Reset expiry to 60 minutes
      }, 60 * 1000); // Every 1 minute, refresh the token expiry time

      return () => clearInterval(refreshTokenTimeout); // Cleanup on component unmount
    }
  }, [token]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
