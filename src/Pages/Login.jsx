import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import login from "../assets/login.jpeg";
import logo from "../assets/image.png";
import Loading from "../Components/Loading";
import {
  Droplet,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setLoading(true);

    signIn(email, password)
      .then(() => {
        toast.success("Login successfully");
        form.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setError("No account found with this email.");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email format.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={login}
            alt="Blood Donation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-blue-900/90" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-center max-w-md"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
              >
                <img src={logo} alt="Logo" className="w-16 h-16" />
              </motion.div>
            </div>

            <h1 className="font-black text-6xl mb-4">VitalFlow</h1>
            <HeartPulse size={32} className="mx-auto animate-pulse" />
            <p className="mt-6 text-xl opacity-90">
              Save lives through blood donation
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50"
      >
        <div className="w-full max-w-md">
          <h1 className="text-5xl font-black text-center mb-2">Welcome Back</h1>
          <p className="text-center text-gray-600 mb-8">Login to continue</p>

          <motion.form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={() => setError("")}
                  className="w-full pl-12 py-4 rounded-xl border-2"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={() => setError("")}
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold flex justify-center gap-2"
            >
              LOGIN <ArrowRight />
            </button>
          </motion.form>

          <p className="text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/auth/register" className="text-red-600 font-bold">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
