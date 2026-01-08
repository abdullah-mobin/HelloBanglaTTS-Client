import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(() => {
    return localStorage.getItem('refreshToken');
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const isLoggedIn = !!accessToken;

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BACKEND_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    setAccessToken(data.data.access_token);
    setRefreshTokenValue(data.data.refresh_token);
    localStorage.setItem('accessToken', data.data.access_token);
    localStorage.setItem('refreshToken', data.data.refresh_token);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${BACKEND_URL}auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    setAccessToken(data.data.access_token);
    setRefreshTokenValue(data.data.refresh_token);
    localStorage.setItem('accessToken', data.data.access_token);
    localStorage.setItem('refreshToken', data.data.refresh_token);
  };

  const googleLogin = async (googleToken: string) => {
    const res = await fetch(`${BACKEND_URL}auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken }),
    });
    if (!res.ok) throw new Error('Google login failed');
    const data = await res.json();
    setAccessToken(data.data.access_token);
    setRefreshTokenValue(data.data.refresh_token);
    localStorage.setItem('accessToken', data.data.access_token);
    localStorage.setItem('refreshToken', data.data.refresh_token);
  };

  const logout = async () => {
    if (accessToken) {
      await fetch(`${BACKEND_URL}auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    }
    setAccessToken(null);
    setRefreshTokenValue(null);
    setUserProfile(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const fetchUserProfile = async () => {
    if (!accessToken) throw new Error('No access token');
    const res = await fetch(`${BACKEND_URL}user/profile`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    const data = await res.json();
    setUserProfile(data.data);
  };

  const refreshToken = async () => {
    if (!refreshTokenValue) throw new Error('No refresh token');
    const res = await fetch(`${BACKEND_URL}auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshTokenValue }),
    });
    if (!res.ok) throw new Error('Refresh failed');
    const data = await res.json();
    setAccessToken(data.data.access_token);
    setRefreshTokenValue(data.data.refresh_token);
    localStorage.setItem('accessToken', data.data.access_token);
    localStorage.setItem('refreshToken', data.data.refresh_token);
  };

  // Auto refresh token if expired
  useEffect(() => {
    if (accessToken) {
      // Decode token to check expiry (simple check)
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expiry = payload.exp * 1000;
        const now = Date.now();
        if (expiry - now < 60000) { // Refresh if expires in 1 min
          refreshToken();
        }
      } catch (e) {
        console.error('Invalid token');
        logout();
      }
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      accessToken,
      userProfile,
      login,
      register,
      googleLogin,
      logout,
      refreshToken,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}