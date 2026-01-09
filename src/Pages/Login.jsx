import React, { useContext, useEffect, useState, useRef } from "react";
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
  const { signIn, user, loading, roleLoading, handleGoogleSignIn } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const formRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) return;

    setError("");
    setFormLoading(true);

    signIn(email, password)
      .then(() => {
        toast.success("Login successful!");

        form.reset();

        const redirectPath = location.state || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        let message = "Login failed. Please try again.";

        if (error.code === "auth/wrong-password") {
          message = "Incorrect password. Please try again.";
        } else if (error.code === "auth/user-not-found") {
          message = "No account found with this email.";
        } else if (error.code === "auth/invalid-email") {
          message = "Invalid email format.";
        } else if (error.code === "auth/too-many-requests") {
          message = "Too many attempts. Try again later.";
        } else if (error.code === "auth/invalid-credential") {
          message = "Invalid email or password.";
        }

        setError(message);
        toast.error(message);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  // Demo login handler - auto-fills and submits
  const handleDemoLogin = () => {
    if (formRef.current) {
      formRef.current.email.value = "demo@vitalflow.com";
      formRef.current.password.value = "Demo123";
      // Trigger form submission
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(submitEvent);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    setFormLoading(true);
    setError("");
    
    try {
      await handleGoogleSignIn();
      toast.success("Google login successful!");
      const redirectPath = location.state || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      let message = "Google sign-in failed.";
      
      if (error.code === "auth/popup-closed-by-user") {
        message = "Sign-in cancelled.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        message = "Account exists with different sign-in method.";
      }
      
      setError(message);
      toast.error(message);
    } finally {
      setFormLoading(false);
    }
  };
  
  useEffect(() => {
    if (user) {
      const redirectPath = location.state || "/";
      navigate(redirectPath, { replace: true });
    }
  }, [user, location.state, navigate]);


 if (loading || roleLoading) {
   return (
     <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
       <Loading />
     </div>
   );
 }

 if (user) {
   return null;
 }



  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
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
          <div className="absolute inset-0 bg-premium-gradient opacity-90" />
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
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--background-main)]"
      >
        <div className="w-full max-w-md">
          <h1 className="text-5xl font-black text-center mb-2 text-gradient-crimson">Welcome Back</h1>
          <p className="text-center text-[var(--text-secondary)] mb-8">Login to continue your lifesaving journey</p>

          <motion.form ref={formRef} onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)]" />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={() => setError("")}
                  className="w-full pl-12 py-4 rounded-xl border-2 border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all placeholder:text-[var(--text-muted)]"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)]" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={() => setError("")}
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all placeholder:text-[var(--text-muted)]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={formLoading}
              className={`btn-premium w-full !py-4 shadow-[var(--primary-red)]/20 ${
                formLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {formLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Logging in...
                </>
              ) : (
                <>
                  LOGIN <ArrowRight />
                </>
              )}
            </button>
          </motion.form>

          {/* Demo Login Button */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "var(--primary-red)", color: "white" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleDemoLogin}
            disabled={formLoading}
            className="w-full mt-4 py-4 rounded-xl border-2 border-[var(--primary-red)] text-[var(--primary-red)] font-bold transition-all flex items-center justify-center gap-2"
          >
            <Droplet className="w-5 h-5" fill="currentColor" />
            Try Demo Account
          </motion.button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[var(--background-main)] text-[var(--text-muted)] font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary-red-rgb), 0.05)" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleLogin}
            disabled={formLoading}
            className="w-full py-4 rounded-xl border-2 border-[var(--border-light)] bg-transparent transition-all flex items-center justify-center gap-3 font-semibold text-[var(--text-primary)] shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </motion.button>

          <p className="text-center mt-6 text-[var(--text-secondary)]">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-[var(--primary-red)] font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
