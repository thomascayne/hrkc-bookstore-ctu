import CategorySection from "@/components/CategorySection";
import Footer from "@/components/Footer";
/**
 * app/page.tsx
 */

import Header from "@/components/Header";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import { featuredCategories } from "@/utils/featuredCategories";
import { createClient } from "@/utils/supabase/server";

import AuthNavbar from "../components/AuthNavbar";

export const canInitSupabaseClient = () => {
  // This function is just for the interactive tutorial.
  // Feel free to remove it once you have Supabase connected.
  try {
    createClient();
    return true;
  } catch (e) {
    return false;
  }
};

export default async function Index() {
  const isSupabaseConnected = canInitSupabaseClient();
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="main-page-container flex-1 w-full flex flex-col gap-20 items-center overflow-hidden">
      <AuthNavbar user={user} />

      <div className="main-container animate-in flex-1 flex flex-col opacity-0 px-3">
        <main className="flex-1 flex flex-col gap-6 overflow-hidden w-screen">
          {/* <h2 className="font-bold text-4xl mb-4">Next steps</h2>
          {isSupabaseConnected ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
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
