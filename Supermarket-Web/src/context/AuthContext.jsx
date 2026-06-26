import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext();

const TOKEN_KEY = "customerToken";
const CUSTOMER_KEY = "customerData";

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  // On load, restore session from localStorage and verify it's still valid.
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const cached = localStorage.getItem(CUSTOMER_KEY);

    if (!token || !cached) {
      setLoading(false);
      return;
    }

    // Show cached customer immediately (fast perceived load),
    // then confirm with the server in the background.
    try {
      setCustomer(JSON.parse(cached));
    } catch {
      // ignore corrupt cache
    }

    api
      .get("/api/web-auth/me", { auth: true })
      .then((data) => {
        setCustomer(data.customer);
        localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data.customer));
      })
      .catch(() => {
        // token invalid/expired - clear session
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CUSTOMER_KEY);
        setCustomer(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (phone, password) => {
    const data = await api.post("/api/web-auth/login", { phone, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data.customer));
    setCustomer(data.customer);
    return data.customer;
  };

  const register = async ({ name, phone, password, address }) => {
    const data = await api.post("/api/web-auth/register", {
      name,
      phone,
      password,
      address,
    });
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(data.customer));
    setCustomer(data.customer);
    return data.customer;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_KEY);
    setCustomer(null);
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isLoggedIn: !!customer,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
