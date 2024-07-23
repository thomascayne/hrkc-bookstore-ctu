// app/category/[key]/page.tsx

import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import AuthNavbar from "@/components/AuthNavbar";
import CategoryContent from "./CategoryContent";
import Loading from "@/components/Loading";

export default async function CategoryPage({
  params,
}: {
  params: { key: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <AuthNavbar user={data.user} />

      <div className="CategoryPage flex-1 w-full flex flex-col items-center min-h-[100%]">
        <Suspense fallback={<Loading />}>
          <CategoryContent params={params} />
        </Suspense>
      </div>
    </>
  );
}
