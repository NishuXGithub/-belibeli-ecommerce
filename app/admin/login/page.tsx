"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Username or email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/admin/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid admin login credentials.");
        return;
      }

      const accessToken = result.data.tokens.access;
      const refreshToken = result.data.tokens.refresh;

      localStorage.setItem("borrowfind_admin_access_token", accessToken);
      localStorage.setItem("borrowfind_admin_refresh_token", refreshToken);

      const maxAge = rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24;

      document.cookie = `borrowfind_admin_token=${accessToken}; path=/; max-age=${maxAge}`;

      router.push("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please check backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F3F4F6] px-4">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-[#004D1A] via-[#008A2E] to-[#00A63E] p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ShieldCheck size={30} />
            </div>

            <h1 className="mt-8 text-4xl font-extrabold leading-tight">
              BorrowFind Admin Panel
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-green-50">
              Secure admin access for managing borrower leads, loan enquiries,
              follow-ups, verification and conversions.
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
            <p className="text-sm text-green-50">
              Admin-only login protected with backend authentication.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDFBE9] text-[#008A2E] md:hidden">
                <ShieldCheck size={26} />
              </div>

              <h2 className="text-3xl font-extrabold text-[#172033]">
                Admin Login
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                Login to continue to BorrowFind admin dashboard.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Username or Email
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#DDE8E1] bg-[#F8FAFC] px-4 py-3 focus-within:border-[#00A63E] focus-within:ring-2 focus-within:ring-green-100">
                  <Mail size={18} className="text-[#64748B]" />

                  <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="admin"
                    className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94A3B8]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#334155]">
                  Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#DDE8E1] bg-[#F8FAFC] px-4 py-3 focus-within:border-[#00A63E] focus-within:ring-2 focus-within:ring-green-100">
                  <Lock size={18} className="text-[#64748B]" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-transparent text-sm text-[#172033] outline-none placeholder:text-[#94A3B8]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-[#64748B] hover:text-[#00A63E]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#64748B]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-[#CBD5E1]"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="font-semibold text-[#008A2E] hover:text-[#006B24]"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#008A2E] to-[#00A63E] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:scale-[1.01] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-[#94A3B8]">
              © 2026 BorrowFind. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}