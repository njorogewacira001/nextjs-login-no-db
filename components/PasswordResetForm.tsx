"use client";

import { useState } from "react";
import { useRouter } from 'next/router';

export default function PasswordResetForm() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send the new password and token to the backend endpoint
      const response = await fetch('/api/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setMessage("Password has been reset successfully.");
      } else {
        setMessage("Error resetting password.");
      }
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Reset Password</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Reset Password
          </button>
          {message && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
