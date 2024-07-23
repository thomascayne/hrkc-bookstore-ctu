// app/reset-password/page.tsx

import { createClient } from "@/utils/supabase/server";
import AuthNavbar from "@/components/AuthNavbar";
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <AuthNavbar user={data.user} disableMenuItems={true} />

      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="reset-password-form-wrapper w-full max-w-md px-8 mt-[-6rem]">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Reset Your Password
          </h1>
          <ResetPasswordForm />
        </div>
      </div>
    </>
  );
}
