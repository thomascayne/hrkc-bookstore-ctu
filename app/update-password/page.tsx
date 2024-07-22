// app/update-password/page.tsx
import AuthNavbar from "@/components/AuthNavbar";
import UpdatePasswordForm from "./UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <>
      <AuthNavbar user={null} disableMenuItems={true} />
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
