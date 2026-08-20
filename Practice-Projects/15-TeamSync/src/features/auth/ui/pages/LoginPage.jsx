import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, onLoginSubmit, errors, handleSubmit } = useAuth();
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09080d] px-4 text-white">
      {/* ================= BACKGROUND ================= */}

      {/* Purple glow on right */}
      <div className="pointer-events-none absolute -right-40 top-1/2 h-150 w-150 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      {/* Small glow behind card */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.03] blur-[100px]" />

      {/* Background network */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="login-line login-line-1" />
        <div className="login-line login-line-2" />
        <div className="login-line login-line-3" />
        <div className="login-line login-line-4" />

        <div className="login-node node-1" />
        <div className="login-node node-2" />
        <div className="login-node node-3" />
        <div className="login-node node-4" />
        <div className="login-node node-5" />
      </div>

      {/* ================= LOGIN CARD ================= */}

      <div className="relative z-10 w-full max-w-[380px]">
        <div className="rounded-xl border border-white/[0.08] bg-[#121016]/95 p-7 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* ================= LOGO ================= */}

          <div className="mb-7 flex flex-col items-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
              <span className="text-base font-black">S</span>
            </div>

            <h1 className="text-lg font-bold tracking-tight">
              TeamSync
              <span className="text-violet-400"> AI</span>
            </h1>

            <p className="mt-1.5 text-center text-xs text-gray-500">
              Welcome back. Sign in to continue.
            </p>
          </div>

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
            {/* EMAIL */}

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-gray-400">
                User name
              </label>

              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type="text"
                  placeholder="you@example.com"
                  {...register("username", {
                    required: "username is required",
                  })}
                  className={`h-10 w-full rounded-md border bg-[#0d0c11] pl-9 pr-3 text-xs text-white outline-none placeholder:text-gray-700 transition ${
                    errors.username
                      ? "border-red-500/60"
                      : "border-white/8 focus:border-violet-500/60"
                  }`}
                />
              </div>

              {errors.username && (
                <p className="mt-1 text-[10px] text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[11px] font-medium text-gray-400">
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-[10px] text-violet-400 transition hover:text-violet-300"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`h-10 w-full rounded-md border bg-[#0d0c11] pl-9 pr-9 text-xs text-white outline-none placeholder:text-gray-700 transition ${
                    errors.password
                      ? "border-red-500/60"
                      : "border-white/8 focus:border-violet-500/60"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-[10px] text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* REMEMBER ME */}

            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                {...register("remember")}
                className="h-3.5 w-3.5 cursor-pointer rounded border-white/10 bg-[#0d0c11] accent-violet-500"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-[10px] text-gray-500"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="group mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-violet-500 to-purple-500 text-xs font-semibold shadow-lg shadow-violet-500/20 transition hover:brightness-110 active:scale-[0.99]"
            >
              Sign in
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/6" />

            <span className="text-[9px] uppercase tracking-widest text-gray-700">
              or continue with
            </span>

            <div className="h-px flex-1 bg-white/6" />
          </div>

          {/* ================= SOCIAL LOGIN ================= */}

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              className="flex h-9 items-center justify-center gap-2 rounded-md border border-white/8 bg-[#0d0c11] text-[10px] font-medium text-gray-400 transition hover:border-white/[0.15] hover:bg-white/[0.03] hover:text-white"
            >
              <GoogleIcon />
              Google
            </button>

            <button
              type="button"
              className="flex h-9 items-center justify-center gap-2 rounded-md border border-white/8 bg-[#0d0c11] text-[10px] font-medium text-gray-400 transition hover:border-white/15 hover:bg-white/3 hover:text-white"
            >
              <GithubIcon />
              GitHub
            </button>
          </div>

          {/* ================= REGISTER ================= */}

          <p className="mt-6 text-center text-[10px] text-gray-600">
            Don't have an account?{" "}
            <NavLink
              to={"/register"}
              href="/register"
              className="font-medium text-violet-400 transition hover:text-violet-300"
            >
              Create account
            </NavLink>
          </p>
        </div>

        {/* Bottom security text */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[9px] text-gray-700">
          <Lock size={10} />
          Your data is encrypted and secure
        </div>
      </div>

      {/* ================= BACKGROUND STYLES ================= */}

      <style>{`
        .login-line {
          position: absolute;
          height: 1px;
          transform-origin: left;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(139, 92, 246, 0.35),
            transparent
          );
        }

        .login-line-1 {
          width: 400px;
          right: 5%;
          top: 20%;
          transform: rotate(35deg);
        }

        .login-line-2 {
          width: 500px;
          right: -5%;
          top: 45%;
          transform: rotate(-25deg);
        }

        .login-line-3 {
          width: 350px;
          right: 10%;
          top: 70%;
          transform: rotate(45deg);
        }

        .login-line-4 {
          width: 300px;
          left: 5%;
          top: 75%;
          transform: rotate(-20deg);
        }

        .login-node {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #8b5cf6;
          box-shadow:
            0 0 8px #8b5cf6,
            0 0 18px rgba(139, 92, 246, 0.5);
        }

        .node-1 {
          right: 18%;
          top: 18%;
        }

        .node-2 {
          right: 8%;
          top: 42%;
        }

        .node-3 {
          right: 25%;
          top: 60%;
        }

        .node-4 {
          left: 12%;
          top: 25%;
        }

        .node-5 {
          left: 20%;
          top: 75%;
        }
      `}</style>
    </div>
  );
};

/* ============================================================
   GOOGLE ICON
============================================================ */

const GoogleIcon = () => {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.35 12.27c0-.68-.06-1.34-.18-1.97H12v3.73h5.22a4.46 4.46 0 0 1-1.94 2.92v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.11Z"
        fill="#4285F4"
      />

      <path
        d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.7Z"
        fill="#34A853"
      />

      <path
        d="M6.54 13.81a5.85 5.85 0 0 1 0-3.62V7.68H3.3a9.75 9.75 0 0 0 0 8.64l3.24-2.51Z"
        fill="#FBBC05"
      />

      <path
        d="M12 6.16c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.28 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.51C7.31 7.88 9.46 6.16 12 6.16Z"
        fill="#EA4335"
      />
    </svg>
  );
};

/* ============================================================
   GITHUB ICON
============================================================ */

const GithubIcon = () => {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.25.78-.55v-2.13c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
};

export default LoginPage;
