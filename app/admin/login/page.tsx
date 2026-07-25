"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Password salah");
      return;
    }

    router.push("/admin/orders");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8"
      >

        <h1 className="mb-8 text-center text-4xl font-black">
          ADMIN LOGIN
        </h1>

        <input
          type="password"
          placeholder="Password Admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 p-4 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-white py-4 font-bold text-black transition hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Masuk..." : "MASUK"}
        </button>

      </form>

    </main>
  );
}