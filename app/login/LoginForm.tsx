// app/login/LoginForm.tsx
"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signIn = async (formData: FormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } else {
      setSuccessMessage("Signed in successfully. Redirecting...");
      setTimeout(() => router.push("/"), 2000);
    }
  };

  const signUp = async (formData: FormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage("Unable to create account. Please try again.");
    } else {
      setSuccessMessage(
        "Account created. Please check your email to verify your account."
      );
    }
  };

  return (
    <form className="login-form flex flex-col w-full justify-center gap-4 text-foreground">
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          className="w-full rounded-md px-4 py-2 bg-inherit border"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Password
        </label>
        <input
          className="w-full rounded-md px-4 py-2 bg-inherit border"
          id="password"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
      </div>
      <SubmitButton
        formAction={signIn}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        pendingText="Signing In..."
      >
        Sign In
      </SubmitButton>
      <SubmitButton
        formAction={signUp}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        pendingText="Creating Account..."
      >
        Create Account
      </SubmitButton>
      <div className="text-sm text-center mt-4">
        <Link
          href="/reset-password"
          className="text-blue-600 hover:text-blue-800"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
}
