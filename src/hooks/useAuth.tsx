
import { createContext, useContext, useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  hasDemoAccess: () => boolean;
  setDemoAccess: (granted: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Secret key for browser-based token - in a real app, this would be more secure
const DEMO_TOKEN_KEY = "demo-access-token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Create a browser-friendly token with expiration
  const createToken = (expiryInSeconds: number): string => {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + expiryInSeconds
    };
    return btoa(JSON.stringify(payload));
  };

  // Verify if token is valid and not expired
  const verifyToken = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  // Check if the user has valid demo access
  const hasDemoAccess = (): boolean => {
    const token = localStorage.getItem(DEMO_TOKEN_KEY);
    
    if (!token) return false;
    
    try {
      const isValid = verifyToken(token);
      if (!isValid) {
        localStorage.removeItem(DEMO_TOKEN_KEY);
      }
      return isValid;
    } catch (error) {
      // Token is invalid or expired
      localStorage.removeItem(DEMO_TOKEN_KEY);
      return false;
    }
  };
  
  // Set demo access by creating a token with 7200 seconds (2 hour) expiration
  const setDemoAccess = (granted: boolean): void => {
    if (granted) {
      const token = createToken(7200); // 2 hours
      localStorage.setItem(DEMO_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(DEMO_TOKEN_KEY);
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signOut,
    hasDemoAccess,
    setDemoAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
