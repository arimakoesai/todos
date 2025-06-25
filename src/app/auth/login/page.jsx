"use client";
import { useState } from "react";
import { login } from "@/app/auth/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await login(formData);

    if (result.success) {
      setSuccessMessage("Login berhasil! Mengalihkan...");
      setTimeout(() => router.push("/todos"), 3000);
    } else if (result.error) {
      setErrorMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            name="password"
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Masuk"}
        </button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </form>

      <p className="text-center mt-4">
        Belum punya akun?{" "}
        <Link href="/auth/register" className="text-red-500 hover:underline">
          Daftar
        </Link>
      </p>
    </>
  );
}
