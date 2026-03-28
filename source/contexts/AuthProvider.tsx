import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User, type Guild } from "@/contexts/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) return;

    const fetchMe = async () => {
      try {
        setError(false);
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          setGuilds([]);
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setGuilds(data.guilds);
      } catch (err) {
        console.error("[Auth] Failed to fetch /api/me:", err);
        setUser(null);
        setGuilds([]);
        setError(true);
      } finally {
        setLoading(false);
        setChecked(true);
      }
    };

    fetchMe();
  }, [checked]);

  const retry = () => {
    setLoading(true);
    setChecked(false);
  };

  const login = () => {
    window.location.href = "/auth/login";
  };

  const logout = async () => {
    await fetch("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setGuilds([]);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, guilds, loading, error, login, logout, retry }}>
      {children}
    </AuthContext.Provider>
  );
}
