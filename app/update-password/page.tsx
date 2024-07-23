// app/update-password/page.tsx
import { createClient } from "@/utils/supabase/server";
import AuthNavbar from "@/components/AuthNavbar";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default async function UpdatePasswordPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <AuthNavbar user={data.user} disableMenuItems={true} />

      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="update-password-form-wrapper w-full max-w-md px-8 mt-[-6rem]">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Update Your Password
          </h1>
          <UpdatePasswordForm />
        </div>
      </div>
    </>
  );
}
