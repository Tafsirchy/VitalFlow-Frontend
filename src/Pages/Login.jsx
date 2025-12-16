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
  const [email, setEmail] = useState("");
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

  const handleForgetPass = () => {
    navigate(`/forgetPass/${email}`);
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
      {/* Left Side - Image & Branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={login}
            alt="Blood Donation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-blue-900/90"></div>
        </div>

        {/* Animated Droplets Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 1,
              }}
              style={{
                left: `${10 + i * 12}%`,
              }}
            >
              <Droplet
                size={30 + i * 5}
                className="text-white/20"
                fill="currentColor"
              />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-center max-w-md"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="VitalFlow Logo"
                  className="w-16 h-16 object-contain"
                />
              </motion.div>
            </div>

            <h1 className="font-black text-6xl mb-4 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
              VitalFlow
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white rounded-full"></div>
              <HeartPulse size={24} className="animate-pulse" />
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white rounded-full"></div>
            </div>
            <p className="text-xl leading-relaxed opacity-90">
              Save lives through blood donation. Every drop counts, every donor
              matters.
            </p>
          </motion.div>
        </div>

        {/* Decorative Droplets */}
        <div className="absolute bottom-8 left-0 right-0 flex items-end justify-around px-8">
          {[24, 32, 20, 28, 24].map((size, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Droplet
                size={size}
                className="text-white/30"
                fill="currentColor"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50/20 p-8"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 mb-4">
              <img
                src={logo}
                alt="VitalFlow Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              VitalFlow
            </h1>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Droplet size={32} className="text-red-600" fill="currentColor" />
              <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-full"></div>
            </motion.div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Login to continue saving lives</p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  name="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all bg-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all bg-white"
                  placeholder="••••••••••••"
                  onChange={() => setError("")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPass}
                className="text-sm text-red-600 hover:text-red-700 transition-colors font-semibold inline-flex items-center gap-1"
              >
                Forgot password?
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 flex items-center justify-center gap-2"
            >
              <span>LOGIN</span>
              <ArrowRight size={20} />
            </motion.button>
          </motion.form>

          {/* Divider */}
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-4 text-sm font-semibold text-gray-500">
                OR
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-red-600 hover:text-red-700 font-bold hover:underline inline-flex items-center gap-1"
              >
                Register Now
                <ArrowRight size={16} />
              </Link>
            </p>
          </div>

          {/* Mobile Decorative Droplets */}
          <div className="lg:hidden mt-8 flex justify-center gap-4 opacity-20">
            <Droplet size={24} className="text-red-600" fill="currentColor" />
            <Droplet size={32} className="text-red-600" fill="currentColor" />
            <Droplet size={24} className="text-red-600" fill="currentColor" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
