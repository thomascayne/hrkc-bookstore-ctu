// app/login/page.tsx
import LoginForm from "./LoginForm";
import AuthNavbar from "@/components/AuthNavbar";

export default function LoginPage() {
  return (
    <>
      <AuthNavbar user={null} disableMenuItems={true} />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="login-form-wrapper w-full max-w-md px-8 mt-[-6rem]">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Sign In or Create an Account
          </h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
