"use client";

import { useState } from "react";
import { signup } from "@/app/auth/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const result = await signup(formData);

    if (result.success) {
      setSuccessMessage(result.message);
      setTimeout(() => router.push("/auth/login"), 3000);
    } else if (result.error) {
      setErrorMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 mt-10 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Daftar Akun</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </form>
      <p className="text-center mt-4">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-red-500 hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
