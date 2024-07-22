// app/page.tsx
"use client";

import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";

import { featuredCategories } from "@/utils/featuredCategories";
import { useSupabaseUser } from "./supabase-provider";

import AuthNavbar from "../components/AuthNavbar";
import { useEffect } from "react";

export default function Index() {
  const user = useSupabaseUser();

  return (
    <div className="main-page-container flex-1 w-full flex flex-col gap-20 items-center overflow-hidden">
      <AuthNavbar user={user} />

      <div className="main-container animate-in flex-1 flex flex-col opacity-0 px-3">
        <main className="flex-1 flex flex-col gap-6 overflow-hidden w-screen">
          <div className="featured-categories-container flex flex-col gap-0 w-full overflow-hidden">
            {featuredCategories.map((category) => (
              <CategorySection key={category.key} category={category} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
