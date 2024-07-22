// app/supabase-provider.tsx
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/auth-helpers-nextjs";

const Context = createContext<{ user: User | null }>({ user: null });

export default function SupabaseProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialSession);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return <Context.Provider value={{ user }}>{children}</Context.Provider>;
}

export const useSupabaseUser = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabaseUser must be used inside SupabaseProvider");
  }
  return context.user;
};
