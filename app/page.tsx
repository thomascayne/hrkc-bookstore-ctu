// app/page.tsx

import { createClient } from "@/utils/supabase/server";
import { featuredCategories } from "@/utils/featuredCategories";
import AuthNavbar from "../components/AuthNavbar";
import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";

export default async function Index() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <div className="main-page-container flex-1 w-full flex flex-col gap-20 items-center overflow-hidden">
      <AuthNavbar user={data.user} />

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
