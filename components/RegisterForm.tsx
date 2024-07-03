"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("user exists");
  

  
  const validateID = (id: string) => {
    
    const idRegex = /^[0-9]{7,8}$/;
    return idRegex.test(id);
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (e.target as HTMLFormElement).elements.namedItem("id") as HTMLInputElement;
    if (!validateID(id.value)) {
      setErrorMessage("Invalid ID Number. It must be 7 or 8 digits.");
      return;
    }
    
    setErrorMessage("");
    
    console.log("Name:", name);
  };
 
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="ID Number" name="id" />
          <input onChange={e=> setEmail(e.target.value)} type="text" placeholder="Email" />
          <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>
          {errorMessage && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <Link className="text-sm mt-3 text-right" href="/">
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
