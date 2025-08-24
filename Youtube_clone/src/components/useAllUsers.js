import { useState, useEffect } from "react";

// Global cache variables outside the hook
let cachedUsers = null;
let cachedError = null;
let cachedLoading = null;
let isFetching = false;
let listeners = new Set();

export default function useAllUsers() {
  const [state, setState] = useState({
    users: cachedUsers || [],
    loading: cachedLoading !== null ? cachedLoading : true,
    error: cachedError,
  });

  useEffect(() => {
    // If we already have cached data, use it immediately
    if (cachedUsers !== null) {
      setState({
        users: cachedUsers,
        loading: false,
        error: cachedError,
      });
      return;
    }

    // If another component is already fetching, just listen for the result
    if (isFetching) {
      listeners.add(setState);
      return () => listeners.delete(setState);
    }

    // Start fetching
    isFetching = true;
    cachedLoading = true;

    const token = localStorage.getItem("token");

    async function fetchUsers() {
      if (!token) {
        const errorMsg = "Please log in to see videos.";

        // Update cache
        cachedUsers = [];
        cachedError = errorMsg;
        cachedLoading = false;

        // Update all components
        const newState = { users: [], loading: false, error: errorMsg };
        setState(newState);
        listeners.forEach((listener) => listener(newState));
        listeners.clear();

        isFetching = false;
        return;
      }

      try {
        const response = await fetch(
          "https://youtube-backend-zdni.onrender.com/Users",
          { headers: { authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Update cache
        cachedUsers = result;
        cachedError = null;
        cachedLoading = false;

        // Update all components
        const newState = { users: result, loading: false, error: null };
        setState(newState);
        listeners.forEach((listener) => listener(newState));
        listeners.clear();
      } catch (err) {
        // Update cache
        cachedUsers = [];
        cachedError = err.message;
        cachedLoading = false;

        // Update all components
        const newState = { users: [], loading: false, error: err.message };
        setState(newState);
        listeners.forEach((listener) => listener(newState));
        listeners.clear();
      } finally {
        isFetching = false;
      }
    }

    fetchUsers();

    // Cleanup function
    return () => listeners.delete(setState);
  }, []);

  return { users: state.users, loading: state.loading, error: state.error };
}

// Optional: Function to clear cache (useful for logout or refresh)
export function clearUsersCache() {
  cachedUsers = null;
  cachedError = null;
  cachedLoading = null;
  isFetching = false;
  listeners.clear();
}
