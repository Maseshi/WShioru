import { useCallback } from "react";

type CookieOptions = {
  path?: string;
  expires?: Date | string | number;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

function setCookie(name: string, value: string, options: CookieOptions = {}) {
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

function getCookie(name: string): string | null {
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)"),
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function removeCookie(name: string, options: CookieOptions = {}) {
  setCookie(name, "", { ...options, expires: new Date(0) });
}

export function useCookie() {
  const get = useCallback(getCookie, []);
  const set = useCallback(setCookie, []);
  const remove = useCallback(removeCookie, []);

  return { get, set, remove };
}
