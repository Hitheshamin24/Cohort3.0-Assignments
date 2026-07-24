import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Zap } from "lucide-react";
import { useAuth } from "../hooks/UseAuthHooks";

const RegisterPage = () => {
  const {
    navigate,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    watch,
    registerFormSubmit,
    registerFormError,
  } = useAuth();
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-lime-400 flex items-center justify-center">
          <Zap className="w-5 h-5 text-black fill-black" strokeWidth={2} />
        </div>
        <span className="text-xl font-bold">
          <span className="text-white">Sky</span>
          <span className="text-lime-400">Mart</span>
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-2xl p-8">
        <h1 className="text-white text-2xl font-bold mb-1">Create account</h1>
        <p className="text-neutral-500 text-sm mb-6">
          Join SkyMart and start shopping
        </p>

        <form
          onSubmit={handleSubmit(registerFormSubmit, registerFormError)}
          className="flex flex-col gap-3"
          id="registerForm"
        >
          {/* Full name */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5">
            <User className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              type="text"
              placeholder="Full name"
              className="bg-transparent outline-none text-white placeholder-neutral-500 text-sm w-full"
            />
          </div>

          {/* Email */}

          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5">
            <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Email address"
              className="bg-transparent outline-none text-white placeholder-neutral-500 text-sm w-full"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5">
            <Lock className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain 6 or more characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 chars)"
              className="bg-transparent outline-none text-white placeholder-neutral-500 text-sm w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 text-neutral-500 shrink-0" />
              ) : (
                <Eye className="w-4 h-4 text-neutral-500 shrink-0" />
              )}
            </button>
          </div>

          {/* Confirm password */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5">
            <Lock className="w-4 h-4 text-neutral-500 shrink-0" />
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Password do not match",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="bg-transparent outline-none text-white placeholder-neutral-500 text-sm w-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4 text-neutral-500 shrink-0" />
              ) : (
                <Eye className="w-4 h-4 text-neutral-500 shrink-0" />
              )}
            </button>
          </div>
        </form>
        {/* Submit */}
        <button
          type="submit"
          form="registerForm"
          className="w-full mt-5 bg-lime-400 hover:bg-lime-300 transition-colors text-black font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2"
        >
          Create Account
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-neutral-500 text-sm mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="text-lime-400 font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
