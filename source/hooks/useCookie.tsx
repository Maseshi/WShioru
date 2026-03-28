import { useCallback } from "react";

type CookieOptions = {
  path?: string;
  expires?: Date | string | number;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

function setCookieRaw(name: string, value: string, options: CookieOptions = {}) {
  let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    const expires =
      typeof options.expires === "number"
        ? new Date(Date.now() + options.expires * 1000)
        : new Date(options.expires);
    cookieStr += `; expires=${expires.toUTCString()}`;
  }
  if (options.maxAge) cookieStr += `; max-age=${options.maxAge}`;
  if (options.domain) cookieStr += `; domain=${options.domain}`;
  if (options.path) cookieStr += `; path=${options.path}`;
  if (options.secure) cookieStr += `; secure`;
  if (options.sameSite) cookieStr += `; samesite=${options.sameSite}`;

  document.cookie = cookieStr;
}

function getCookieRaw(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function useCookie() {
  const get = useCallback(
    (name: string) => getCookieRaw(name),
    [],
  );
  const set = useCallback(
    (name: string, value: string, options?: CookieOptions) =>
      setCookieRaw(name, value, options),
    [],
  );
  const remove = useCallback(
    (name: string, options?: CookieOptions) =>
      setCookieRaw(name, "", { ...options, expires: new Date(0) }),
    [],
  );

  return { get, set, remove };
}
