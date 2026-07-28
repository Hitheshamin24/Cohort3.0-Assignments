import { Zap, Mail, Lock, Eye, ArrowRight, EyeOff } from "lucide-react";
import { useAuth } from "../hooks/UseAuthHooks";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const {
    navigate,
    loginFormSubmit,
    loginFormError,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  return (
    <div className="min-h-screen w-full bg-black flex items-stretch">
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-center w-1/2 px-16 lg:px-24 border-r border-white/10 relative overflow-hidden">
        {/* subtle glow */}
        <div className="pointer-events-none absolute -left-20 top-1/3 w-96 h-96 bg-lime-400/10 blur-3xl rounded-full" />

        {/* Logo */}
        <div className="absolute top-10 left-16 lg:left-24 flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-lime-400 flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" fill="black" />
          </div>
          <span className="text-white font-bold text-lg">
            Sky<span className="text-lime-400">Mart</span>
          </span>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-lime-400 text-xs font-semibold tracking-widest mb-4">
            WELCOME BACK
          </p>
          <h1 className="text-5xl  text-white leading-tight font-bold">
            Shop the future.
          </h1>
          <h1 className="text-5xl font-bold text-lime-400 leading-tight mb-6">
            Today.
          </h1>
          <p className="text-neutral-400 text-base font-dm-sans leading-relaxed mb-10">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>

          {/* Stats */}
          <div className="flex gap-4">
            {[
              { value: "20K+", label: "Products" },
              { value: "50K+", label: "Users" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/15 rounded-xl px-6 py-4 text-center flex-1"
              >
                <div className="text-lime-400 font-bold text-lg">
                  {stat.value}
                </div>
                <div className="text-neutral-500 font-dm-sans text-xs mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md bg-neutral-900/60 border border-white/10 rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
          <p className="text-neutral-400 text-sm mb-8">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={handleSubmit(loginFormSubmit, loginFormError)}
            className="space-y-4"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Email address"
                className="w-full bg-neutral-800/70 border border-white/10 rounded-lg py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 outline-none focus:border-lime-400/60 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "Password must contain 6 or more characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-neutral-800/70 border border-white/10 rounded-lg py-3 pl-11 pr-11 text-sm text-white placeholder-neutral-500 outline-none focus:border-lime-400/60 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 hover:bg-lime-300 text-black font-semibold rounded-lg py-3 flex items-center justify-center gap-2 transition-colors mt-2 cursor-pointer"
            >
              Sign in
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-neutral-400 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-lime-400 font-semibold cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
