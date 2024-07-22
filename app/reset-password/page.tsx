// app/reset-password/page.tsx
import ResetPasswordForm from "./ResetPasswordForm";
import AuthNavbar from "@/components/AuthNavbar";

export default function ResetPasswordPage() {
  return (
    <>
      <AuthNavbar user={null} disableMenuItems={true} />
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
