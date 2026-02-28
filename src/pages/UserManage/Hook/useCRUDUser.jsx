import { useState, useCallback, useEffect } from "react";
import api from "../../../api/axios";
import { useAuth } from "../../../context/AuthProvider";

const useCRUDUser = () => {
  const { userInfor } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true);
      setError(null);
      try {
        const response = await api.get("/user");
        // Filter out the current user by email
        const allUsers = response.data;
        const otherUsers = userInfor?.email
          ? allUsers.filter((user) => user.email !== userInfor.email)
          : allUsers;
        setUsers(otherUsers);
        return otherUsers;
      } catch (err) {
        setError(err);
        console.error("Error fetching users:", err);
        throw err;
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [userInfor?.email],
  );

  const registerUser = useCallback(
    async (userData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post("/auth/register", {
          email: userData.email,
          username: userData.username,
          password: userData.password,
        });
        await fetchUsers(false);
        return response;
      } catch (err) {
        setError(err);
        console.error("Error registering user:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers],
  );

  const changeUserRole = useCallback(
    async (email, role) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.put("/user/change-role", {
          email,
          role,
        });
        await fetchUsers(false);
        return response;
      } catch (err) {
        setError(err);
        console.error("Error changing user role:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchUsers],
  );

  useEffect(() => {
    if (userInfor?.email) {
      fetchUsers();
    }
  }, [fetchUsers, userInfor?.email]);

  return {
    users,
    loading,
    error,
    fetchUsers,
    registerUser,
    changeUserRole,
  };
};

export default useCRUDUser;
