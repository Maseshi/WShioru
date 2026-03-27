import { useEffect, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function useGuildSettings<T>(guildId: string, path: string, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/api/guilds/${guildId}/${path}`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setData(json.data ?? fallback);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [guildId, path]);

  const save = useCallback(
    async (body: Partial<T>) => {
      setSaving(true);
      setError(null);

      try {
        const res = await fetch(`${API_URL}/api/guilds/${guildId}/${path}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        setData((prev) => ({ ...prev, ...body }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      } finally {
        setSaving(false);
      }
    },
    [guildId, path]
  );

  return { data, loading, saving, error, save, setData };
}
