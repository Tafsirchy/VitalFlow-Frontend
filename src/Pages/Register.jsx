import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import register from "../assets/Register.jpeg";
import logo from "../assets/image.png";
import {
  Eye,
  EyeOff,
  Droplet,
  User,
  Mail,
  Lock,
  MapPin,
  Upload,
  ArrowRight,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, handleGoogleSignIn } = useContext(AuthContext);

  // Default avatar URL for users without profile photo
  const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&size=200&background=C62828&color=fff";

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [upazila, setUpazila] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      const sortedUpazilas = [...res.data.upazilas].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      setUpazilas(sortedUpazilas);
    });

    axios.get("/districts.json").then((res) => {
      const sortedDistricts = [...res.data.districts].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      setDistricts(sortedDistricts);
    });
  }, []);

  const navigate = useNavigate();

  // Google Sign Up handler
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await handleGoogleSignIn();
      toast.success("Google sign-up successful!");
      navigate("/");
    } catch (error) {
      let message = "Google sign-up failed.";
      if (error.code === "auth/popup-closed-by-user") {
        message = "Sign-up cancelled.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        message = "Account exists. Try signing in instead.";
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo;
    const email = form.email.value;
    const password = form.password.value;
    const file = photo.files[0];
    const blood = form.blood.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) {
      setError("Password must be 6 characters long");
      return;
    }
    if (!uppercase.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!lowercase.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    setLoading(true);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=0e9b758a4b670cd200c15b853076e20f`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const mainPhotoUrl = res.data.data.display_url || DEFAULT_AVATAR;

    const formData = {
      name,
      email,
      password,
      mainPhotoUrl,
      blood,
      district,
      upazila,
    };

    if (res.data.success == true) {
      createUser(email, password)
        .then(() => {
          // console.log(result);
          return updateUser({
            displayName: name,
            photoURL: mainPhotoUrl,
          });
        })
        .then(() => {
          axios
            .post("https://vital-flow-backend-khaki.vercel.app/donor", formData)
            .then(() => {
              // console.log(res.data);
              setLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
          toast.success("Sign Up Successful");
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);

          if (err.code === "auth/email-already-in-use") {
            toast.error("Email already in Use");
          } else {
            setError(err.message);
          }
        });
    }
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
            src={register}
            className="w-full h-full object-cover"
            alt="Blood Donation"
          />
          <div className="absolute inset-0 bg-premium-gradient opacity-90"></div>
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
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-white text-center"
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
            <h1 className="text-6xl font-black mb-4 text-white">
              Join VitalFlow
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white rounded-full"></div>
              <HeartPulse size={24} className="animate-pulse text-white" />
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white rounded-full"></div>
            </div>
            <p className="text-xl opacity-90">
              Become a life-saver. Register as a blood donor today.
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

      {/* Right Side - Register Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--background-main)] overflow-y-auto"
      >
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-premium-gradient mb-4">
              <img
                src={logo}
                alt="VitalFlow Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gradient-crimson">
              VitalFlow
            </h1>
          </div>

          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Droplet
                size={32}
                className="text-[var(--primary-red)]"
                fill="currentColor"
              />
              <div className="h-1 w-16 bg-premium-gradient rounded-full"></div>
            </motion.div>
            <h2 className="text-5xl font-black text-[var(--text-primary)] mb-2">Sign Up</h2>
            <p className="text-[var(--text-secondary)]">Create your donor account and start saving lives</p>
          </div>

          {/* Login Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--primary-red)]/5 border-2 border-[var(--primary-red)]/20 rounded-xl p-4 mb-6 glass-morphism !bg-transparent"
          >
            <div className="flex items-start gap-3">
              <Droplet className="w-5 h-5 text-[var(--primary-red)] flex-shrink-0 mt-0.5" fill="currentColor" />
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">Demo Account Available</h4>
                <p className="text-xs text-[var(--text-secondary)]">
                  Want to try the platform? Use <span className="font-mono bg-[var(--primary-red)]/10 px-1 rounded">demo@vitalflow.com</span> on the login page
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleRegister}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)]">
                  <User className="w-5 h-5" />
                </div>
                <input
                  name="name"
                  type="text"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--border-light)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all bg-[var(--background-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)]">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--border-light)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all bg-[var(--background-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                Profile Photo
              </label>
              <div className="relative">
                <input
                  name="photo"
                  type="file"
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  className="hidden"
                  id="photo-upload"
                  required
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-[var(--border-light)] hover:border-[var(--primary-red)] transition-all cursor-pointer bg-[var(--background-card)] group"
                >
                  <Upload className="w-5 h-5 text-[var(--primary-red)]" />
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--primary-red)] transition-colors">
                    {fileName || "Choose a file..."}
                  </span>
                </label>
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                Blood Group
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)] z-10">
                  <Droplet className="w-5 h-5" fill="currentColor" />
                </div>
                <select
                  name="blood"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--border-light)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all bg-[var(--background-card)] text-[var(--text-primary)] appearance-none cursor-pointer"
                >
                  <option value="" disabled selected>
                    Select your blood group
                  </option>
                  <option value="A+">🅰️ A+</option>
                  <option value="A-">🅰️ A-</option>
                  <option value="B+">🅱️ B+</option>
                  <option value="B-">🅱️ B-</option>
                  <option value="AB+">🆎 AB+</option>
                  <option value="AB-">🆎 AB-</option>
                  <option value="O+">🅾️ O+</option>
                  <option value="O-">🅾️ O-</option>
                </select>
              </div>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                  District
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary-red)] z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[var(--border-light)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all bg-[var(--background-card)] text-[var(--text-primary)] appearance-none cursor-pointer text-sm"
                    required
                  >
                    <option disabled selected value="">
                      District
                    </option>
                    {districts.map((d) => (
                      <option key={d?.name} value={d?.name}>
                        {d?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                  Upazila
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--primary-red)] z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-[var(--border-light)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all bg-[var(--background-card)] text-[var(--text-primary)] appearance-none cursor-pointer text-sm"
                    required
                  >
                    <option disabled selected value="">
                      Upazila
                    </option>
                    {upazilas.map((u) => (
                      <option key={u?.name} value={u?.name}>
                        {u?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)]">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-[var(--border-light)] focus:border-[var(--primary-red)] focus:ring-4 focus:ring-[var(--primary-red)]/10 outline-none transition-all bg-[var(--background-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  placeholder="••••••••••••"
                  onChange={() => setError("")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--primary-red)] transition-colors"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[var(--primary-red)]/5 border-2 border-[var(--primary-red)]/20 text-[var(--primary-red)] px-4 py-3 rounded-xl text-sm font-medium"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn-premium w-full !py-4 shadow-[var(--primary-red)]/20 mt-6 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <>
                  <span>Sign Up</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[var(--background-main)] text-[var(--text-muted)] font-medium">
                  Or sign up with
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--primary-red-rgb), 0.05)" }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full py-4 rounded-xl border-2 border-[var(--border-light)] bg-transparent transition-all flex items-center justify-center gap-3 font-semibold text-[var(--text-primary)] shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </motion.button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-700 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-[var(--primary-red)] font-bold hover:underline inline-flex items-center gap-1"
                >
                  Sign in
                  <ArrowRight size={16} />
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
