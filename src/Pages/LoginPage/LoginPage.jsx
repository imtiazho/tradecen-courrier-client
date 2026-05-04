import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingModal from "../../Components/LoadingModal/LoadingModal";

const LoginPage = () => {
  const { signInUser, googleSignIn, setLoading, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", error.message || "Invalid email or password", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res = await googleSignIn();

      const userInfo = {
        email: res.user.email,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire("Error", "Google Login Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <LoadingModal isLoading={loading}></LoadingModal>
      <div className="w-full max-w-md mx-auto md:mx-0">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-1.5 tracking-[-0.08rem]">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Login to your TradeCen account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#CAEB66]/50 focus:border-[#CAEB66] transition-all"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="text-right">
            <Link
              to="/auth/forget-password"
              className="inline-block text-sm font-medium text-gray-500 hover:underline decoration-1 underline-offset-4"
            >
              Forget Password?
            </Link>
          </div>

          {/* Main Login Button */}
          <button
            type="submit"
            className="w-full bg-[#D4ED71] hover:bg-[#c5df5e] text-[#02312A] font-bold py-3.5 rounded-lg transition-colors mt-2"
          >
            Login
          </button>
        </form>

        {/* Footer & Social */}
        <div className="mt-6 text-center space-y-6">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="font-semibold text-[#8EB31F] hover:underline"
            >
              Register
            </Link>
          </p>

          <div className="relative flex items-center justify-center">
            <span className="bg-white px-4 text-gray-400 text-sm z-10">Or</span>
            <div className="absolute w-full border-t border-gray-100"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#E9EDF2] hover:bg-[#dfe4ea] text-[#02312A] font-bold py-3.5 rounded-lg transition-colors"
          >
            <FcGoogle size={24} />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
