// app/layout.tsx
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import SidePanel from "@/components/SidePanel";

import { SidePanelProvider } from "./contexts/SidePanelContext";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SupabaseProvider from "./supabase-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HRKC Bookstore Management System",
  description:
    "CTU Project Group B by Thomas Cayne, Taylor Hardy, Ricky Holder, and Javon Kelley",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              } else {
                document.documentElement.classList.remove('dark')
              }
        `,
          }}
        />
      </head>
      <body className="bg-background text-foreground pt-20">
        <SupabaseProvider initialSession={user}>
          <SidePanelProvider>
            <main className="min-h-screen flex flex-col items-center">
              {children}
            </main>
            <SidePanel />
          </SidePanelProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
