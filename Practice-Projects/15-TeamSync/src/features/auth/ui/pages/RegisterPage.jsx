import React from "react";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { register, errors, handleSubmit, onRegisterSubmit, watch } = useAuth();
  const password = watch("password");

  return (
    <div className="min-h-screen bg-[#0d0b10] text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT SECTION
        ====================================================== */}
        <section className="relative hidden overflow-hidden border-r border-white/5 lg:flex">
          {/* Background */}
          <div className="absolute inset-0 bg-[#090d18]" />

          {/* Glow effects */}
          <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

          {/* Artificial neural network */}
          <div className="absolute inset-0 opacity-70">
            <div className="network-line line-1" />
            <div className="network-line line-2" />
            <div className="network-line line-3" />
            <div className="network-line line-4" />
            <div className="network-line line-5" />

            <div className="network-dot dot-1" />
            <div className="network-dot dot-2" />
            <div className="network-dot dot-3" />
            <div className="network-dot dot-4" />
            <div className="network-dot dot-5" />
            <div className="network-dot dot-6" />
            <div className="network-dot dot-7" />
            <div className="network-dot dot-8" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex min-h-screen w-full flex-col p-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
                <span className="text-sm font-black">S</span>
              </div>

              <span className="text-lg font-bold tracking-tight">
                Synthetix
                <span className="text-violet-400"> AI</span>
              </span>
            </div>

            {/* Hero content */}
            <div className="mt-auto max-w-xl pb-20">
              <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-violet-400">
                <span className="h-px w-8 bg-violet-500" />
                Intelligent. Powerful. Yours.
              </div>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight xl:text-5xl">
                Accelerate your
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                  AI journey.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
                Build smarter applications, automate workflows, and unlock the
                power of artificial intelligence with Synthetix AI.
              </p>

              {/* Small stats */}
              <div className="mt-8 flex gap-10">
                <div>
                  <p className="text-xl font-bold">10K+</p>
                  <p className="mt-1 text-xs text-gray-500">AI Builders</p>
                </div>

                <div>
                  <p className="text-xl font-bold">99.9%</p>
                  <p className="mt-1 text-xs text-gray-500">Platform uptime</p>
                </div>

                <div>
                  <p className="text-xl font-bold">24/7</p>
                  <p className="mt-1 text-xs text-gray-500">AI assistance</p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between text-[10px] text-gray-600">
              <span>© 2026 Synthetix AI</span>

              <div className="flex gap-5">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Security</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SECTION
        ====================================================== */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-12 flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <span className="text-sm font-black">S</span>
              </div>

              <span className="font-bold">
                Synthetix <span className="text-violet-400">AI</span>
              </span>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Join Synthetix AI and start building smarter.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className={`h-11 w-full rounded-lg border bg-[#151319] pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-700 transition ${
                      errors.name
                        ? "border-red-500/60"
                        : "border-white/10 focus:border-violet-500/60"
                    }`}
                  />
                </div>

                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    className={`h-11 w-full rounded-lg border bg-[#151319] pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-700 transition ${
                      errors.email
                        ? "border-red-500/60"
                        : "border-white/10 focus:border-violet-500/60"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`h-11 w-full rounded-lg border bg-[#151319] pl-10 pr-11 text-sm text-white outline-none placeholder:text-gray-700 transition ${
                      errors.password
                        ? "border-red-500/60"
                        : "border-white/10 focus:border-violet-500/60"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}

                {/* Password requirements */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  <PasswordRule
                    valid={password?.length >= 8}
                    text="8+ characters"
                  />

                  <PasswordRule
                    valid={/[A-Z]/.test(password || "")}
                    text="Uppercase"
                  />

                  <PasswordRule
                    valid={/[0-9]/.test(password || "")}
                    text="Number"
                  />
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-300">
                  Confirm password
                </label>

                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={`h-11 w-full rounded-lg border bg-[#151319] pl-10 pr-11 text-sm text-white outline-none placeholder:text-gray-700 transition ${
                      errors.confirmPassword
                        ? "border-red-500/60"
                        : "border-white/10 focus:border-violet-500/60"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                  className="mt-0.5 h-4 w-4 rounded border-white/10 bg-[#151319] accent-violet-500"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-gray-500"
                >
                  I agree to the{" "}
                  <span className="cursor-pointer text-violet-400 hover:text-violet-300">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="cursor-pointer text-violet-400 hover:text-violet-300">
                    Privacy Policy
                  </span>
                  .
                </label>
              </div>

              {errors.terms && (
                <p className="-mt-3 text-xs text-red-400">
                  {errors.terms.message}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-sm font-semibold shadow-lg shadow-violet-500/20 transition hover:brightness-110 active:scale-[0.99]"
              >
                Create account
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />

              <span className="text-[10px] uppercase tracking-widest text-gray-700">
                or continue with
              </span>

              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <SocialButton>
                <GoogleIcon />
                Google
              </SocialButton>

              <SocialButton>
                <GithubIcon />
                GitHub
              </SocialButton>
            </div>

            {/* Login */}
            <p className="mt-7 text-center text-xs text-gray-600">
              Already have an account?{" "}
              <NavLink
                to={"/login"}
                href="/login"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign in
              </NavLink>
            </p>
          </div>
        </section>
      </div>

      {/* Network styles */}
      <style>{`
        .network-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(100, 130, 255, 0.35),
            transparent
          );
          transform-origin: left;
        }

        .line-1 {
          width: 600px;
          left: 10%;
          top: 45%;
          transform: rotate(-25deg);
        }

        .line-2 {
          width: 500px;
          left: 5%;
          top: 55%;
          transform: rotate(20deg);
        }

        .line-3 {
          width: 450px;
          left: 20%;
          top: 35%;
          transform: rotate(55deg);
        }

        .line-4 {
          width: 600px;
          left: 15%;
          top: 65%;
          transform: rotate(-45deg);
        }

        .line-5 {
          width: 450px;
          left: 30%;
          top: 25%;
          transform: rotate(80deg);
        }

        .network-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: #8b7cff;
          box-shadow:
            0 0 10px #8b7cff,
            0 0 25px rgba(139, 124, 255, 0.6);
        }

        .dot-1 { left: 22%; top: 35%; }
        .dot-2 { left: 35%; top: 47%; }
        .dot-3 { left: 15%; top: 58%; }
        .dot-4 { left: 48%; top: 32%; }
        .dot-5 { left: 60%; top: 50%; }
        .dot-6 { left: 40%; top: 68%; }
        .dot-7 { left: 68%; top: 30%; }
        .dot-8 { left: 28%; top: 72%; }
      `}</style>
    </div>
  );
};

/* ============================================================
   PASSWORD RULE
============================================================ */

const PasswordRule = ({ valid, text }) => {
  return (
    <div
      className={`flex items-center gap-1.5 text-[10px] ${
        valid ? "text-emerald-400" : "text-gray-600"
      }`}
    >
      <Check size={11} />
      {text}
    </div>
  );
};

/* ============================================================
   SOCIAL BUTTON
============================================================ */

const SocialButton = ({ children }) => {
  return (
    <button
      type="button"
      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#151319] text-xs font-medium text-gray-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
    >
      {children}
    </button>
  );
};

/* ============================================================
   GOOGLE ICON
============================================================ */

const GoogleIcon = () => {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.91.57.1.78-.25.78-.55v-2.13c-3.19.69-3.86-1.54-3.86-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .3.2.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
};

export default RegisterPage;
