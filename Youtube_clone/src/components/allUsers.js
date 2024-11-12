/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

function allUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    async function fetchUsers() {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://youtube-backend-zdni.onrender.com/Users", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Fetched users:", result);
        setUsers(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [token]);

  return { users, loading, error };
}

export default allUsers;
