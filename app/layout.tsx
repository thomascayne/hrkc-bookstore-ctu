// app/layout.tsx
import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { SidePanelProvider } from "./contexts/SidePanelContext";
import SidePanel from "@/components/SidePanel";

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
        <SidePanelProvider>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
          <SidePanel />
        </SidePanelProvider>
      </body>
    </html>
  );
}
