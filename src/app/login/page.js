"use client";

import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success(`Login successful 🎉`);
      reset();
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login("demo@gmail.com", "123456");
      toast.success("Demo login successful 🚀");
      reset();
      router.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {/* email  */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format.",
            },
          })}
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}
        {/* password  */}
        <input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}
        {/* button  */}
        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 cursor-pointer disabled:opacity-50"
          type="submit"
        >
          {isSubmitting ? "Loggin in..." : "Login"}
        </button>
        {/* switch to signup  */}
        <p
          className="mt-3 text-sm text-center cursor-pointer text-blue-500"
          onClick={() => router.push("/signup")}
        >
          New user? Signup
        </p>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full mt-3 border py-2 rounded-lg hover:bg-gray-100 transition font-medium"
        >
          Login as Demo User
        </button>
        <p className="text-[.8rem] text-gray-500 mt-2 text-center font-semibold">
          Use demo account for quick access
        </p>
      </form>
    </div>
  );
}
