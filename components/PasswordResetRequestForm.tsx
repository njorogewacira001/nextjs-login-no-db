"use client";

import { useState } from "react";

export default function PasswordResetRequestForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send the email to the backend endpoint
      const response = await fetch('/api/password-reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setMessage("Error sending password reset link.");
      }
    } catch (error) {
      setMessage("Error sending password reset link.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Password Reset</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Send Reset Link
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
