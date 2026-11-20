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
  Heart,
  ShieldCheck,
} from "lucide-react";
import { motion as Motion } from "framer-motion";

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
        toast.success("Welcome back! Login successful.");
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
          message = "Too many attempts. Please try again later.";
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

  const handleDemoLogin = () => {
    if (formRef.current) {
      formRef.current.email.value = "demo@vitalflow.com";
      formRef.current.password.value = "Demo123";
      const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
      formRef.current.dispatchEvent(submitEvent);
    }
  };

  const handleGoogleLogin = async () => {
    setFormLoading(true);
    setError("");

    try {
      await handleGoogleSignIn();
      toast.success("Google sign-in successful!");
      const redirectPath = location.state || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      let message = "Google sign-in failed.";

      if (error.code === "auth/popup-closed-by-user") {
        message = "Sign-in cancelled.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        message = "Account exists with a different sign-in method.";
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
      <div className="min-h-screen flex justify-center items-center bg-[var(--background-main)]">
        <Loading />
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-[var(--background-main)] text-[var(--text-primary)]">
      {/* Left Side: Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-950">
        <img
          src={login}
          alt="Blood Donation Hospital Care"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        <div className="relative z-10 flex flex-col justify-between p-8 sm:p-10 text-white w-full h-full">
          {/* Top Logo */}
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center p-1.5 border border-white/20">
              <img src={logo} alt="VitalFlow Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight">VitalFlow</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-red-400">
                National Donor Network
              </span>
            </div>
          </Link>

          {/* Center Content */}
          <div className="max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <Heart size={13} fill="currentColor" />
              <span>100% Voluntary Community</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              One Login, <br />
              Countless Lives Saved.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              Join thousands of verified voluntary donors and hospital coordinators across all 64 districts in Bangladesh.
            </p>
          </div>

          {/* Bottom Trust Badge */}
          <div className="pt-5 border-t border-white/10 flex items-center gap-2.5 text-xs text-zinc-400 font-medium">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Encrypted Member Portal with Multi-District Reach</span>
          </div>
        </div>
      </div>

      {/* Right Side: Symmetrical Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8 lg:p-10">
        <div className="w-full max-w-md space-y-5">
          {/* Header */}
          <div className="text-center sm:text-left space-y-1.5">
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-600/10 flex items-center justify-center p-1.5 border border-red-600/20">
                <img src={logo} alt="VitalFlow Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-black text-gradient-crimson">VitalFlow</span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Sign in to manage your blood requests or donor commitments.
            </p>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleLogin} className="space-y-3.5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={() => setError("")}
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-sm font-semibold transition-all"
                  placeholder="donor@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={() => setError("")}
                  className="w-full h-11 pl-10 pr-10 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-sm font-semibold transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={formLoading}
              className="btn-premium w-full !h-11 !rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
            >
              {formLoading ? (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={formLoading}
            className="w-full h-11 rounded-xl border border-[var(--primary-red)] text-[var(--primary-red)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--primary-red)] hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Droplet size={15} fill="currentColor" />
            <span>Try One-Click Demo Account</span>
          </button>

          {/* Divider */}
          <div className="relative my-2.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-light)]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-[var(--background-main)] text-[var(--text-muted)] font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={formLoading}
            className="w-full h-11 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] hover:border-[var(--primary-red)]/40 transition-all flex items-center justify-center gap-2.5 text-xs font-bold text-[var(--text-primary)] shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>Continue with Google</span>
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-[var(--text-secondary)]">
            Don't have an account yet?{" "}
            <Link to="/auth/register" className="text-[var(--primary-red)] font-bold hover:underline">
              Register as Donor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
