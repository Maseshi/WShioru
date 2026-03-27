import { createContext, useContext } from "react";

export interface User {
  id: string;
  username: string;
  avatar: string;
  globalName: string;
}

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  permissions: string;
}

export interface AuthContextType {
  user: User | null;
  guilds: Guild[];
  loading: boolean;
  error: boolean;
  login: () => void;
  logout: () => Promise<void>;
  retry: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  guilds: [],
  loading: true,
  error: false,
  login: () => {},
  logout: async () => {},
  retry: () => {},
});

export const useAuth = () => useContext(AuthContext);
