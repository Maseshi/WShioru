import { useEffect, useState, useCallback } from "react";

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
        const res = await fetch(`/api/guilds/${guildId}/${path}`, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guildId, path]);

  const save = useCallback(
    async (body: Partial<T>, subPath?: string) => {
      setSaving(true);
      setError(null);

      const url = subPath
        ? `/api/guilds/${guildId}/${path}/${subPath}`
        : `/api/guilds/${guildId}/${path}`;

      try {
        const res = await fetch(url, {
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
