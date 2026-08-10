import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { authService } from "../services/cmsService";
import type { AdminUser } from "../types/cms";

type AuthContextValue = {
  admin: AdminUser | null;
  loading: boolean;
  login: (payload: { email: string; password: string; rememberMe: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setAdmin: (admin: AdminUser | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    try {
      const profile = await authService.profile();
      setAdmin(profile);
    } catch (_error) {
      window.localStorage.removeItem("adminToken");
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshProfile();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin,
      loading,
      setAdmin,
      refreshProfile,
      login: async (payload) => {
        const response = await authService.login(payload);
        window.localStorage.setItem("adminToken", response.token);
        setAdmin(response.admin);
      },
      logout: async () => {
        await authService.logout();
        window.localStorage.removeItem("adminToken");
        setAdmin(null);
      },
    }),
    [admin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
