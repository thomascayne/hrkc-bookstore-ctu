// app/update-password/UpdatePasswordForm.tsx
"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SubmitButton } from "../login/submit-button";
import { useRouter } from "next/navigation";

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleUpdatePassword = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setMessage("Error: Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Password updated successfully. Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <form className="flex flex-col gap-4">
      {message && (
        <div
          className={`p-4 rounded ${
            message.startsWith("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          New Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md px-4 py-2 bg-inherit border"
          required
        />
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-md px-4 py-2 bg-inherit border"
          required
        />
      </div>
      <SubmitButton
        formAction={handleUpdatePassword}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        pendingText="Updating Password..."
      >
        Update Password
      </SubmitButton>
    </form>
  );
}
