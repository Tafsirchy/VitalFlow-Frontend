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
  ShieldCheck,
  Heart,
} from "lucide-react";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, handleGoogleSignIn } = useContext(AuthContext);

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
      setError("Password must be at least 6 characters long");
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

    try {
      let mainPhotoUrl = DEFAULT_AVATAR;

      if (file) {
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=0e9b758a4b670cd200c15b853076e20f`,
          { image: file },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (imgRes.data?.data?.display_url) {
          mainPhotoUrl = imgRes.data.data.display_url;
        }
      }

      const formData = {
        name,
        email,
        password,
        mainPhotoUrl,
        blood,
        district,
        upazila,
      };

      await createUser(email, password);
      await updateUser({ displayName: name, photoURL: mainPhotoUrl });

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      await axios.post(`${apiUrl}/donor`, formData);

      toast.success("Donor account created successfully!");
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email address is already registered.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[var(--background-main)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--background-main)] text-[var(--text-primary)]">
      {/* Left Side: Brand Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-950">
        <img
          src={register}
          alt="Blood Donation Hospital Registration"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

        <div className="relative z-10 flex flex-col justify-between p-8 sm:p-10 text-white w-full h-full">
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

          <div className="max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
              <Heart size={13} fill="currentColor" />
              <span>Join 15,800+ Volunteers</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Become a Registered <br />
              Life Saver Today.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              Your voluntary commitment ensures patients in trauma units, maternity wards, and cancer centers get the immediate support they need.
            </p>
          </div>

          <div className="pt-5 border-t border-white/10 flex items-center gap-2.5 text-xs text-zinc-400 font-medium">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Strict privacy: Your contact info is only used for verified emergency matches</span>
          </div>
        </div>
      </div>

      {/* Right Side: Symmetrical Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-5 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-4 py-3">
          <div className="text-center sm:text-left space-y-1.5">
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-600/10 flex items-center justify-center p-1.5 border border-red-600/20">
                <img src={logo} alt="VitalFlow Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-black text-gradient-crimson">VitalFlow</span>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
              Register as Donor
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Create your verified donor profile in under 2 minutes.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-sm font-semibold transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="donor@example.com"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-sm font-semibold transition-all"
                />
              </div>
            </div>

            {/* Blood Group */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Blood Group
              </label>
              <div className="relative">
                <Droplet size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary-red)]" />
                <select
                  name="blood"
                  required
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-sm font-semibold transition-all cursor-pointer"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                </select>
              </div>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  className="w-full h-12 px-3 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-xs font-semibold transition-all cursor-pointer"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  Upazila
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  required
                  className="w-full h-12 px-3 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-xs font-semibold transition-all cursor-pointer"
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((u) => (
                    <option key={u.name} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Profile Photo (Optional)
              </label>
              <div className="relative">
                <input
                  name="photo"
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  className="hidden"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center gap-3 w-full h-12 px-4 rounded-xl border border-dashed border-[var(--border-light)] hover:border-[var(--primary-red)] transition-all cursor-pointer bg-[var(--background-card)] text-xs text-[var(--text-muted)] font-medium"
                >
                  <Upload size={16} className="text-[var(--primary-red)] shrink-0" />
                  <span className="truncate">{fileName || "Click to choose image file..."}</span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Create Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={() => setError("")}
                  placeholder="Min. 6 chars with uppercase & lowercase"
                  className="w-full h-12 pl-12 pr-12 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] text-[var(--text-primary)] focus:border-[var(--primary-red)] focus:outline-none text-xs font-semibold transition-all"
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
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full !h-14 !rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Google Sign Up */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-light)]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-[var(--background-main)] text-[var(--text-muted)] font-medium">
                  Or register with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full h-12 rounded-xl border border-[var(--border-light)] bg-[var(--background-card)] hover:border-[var(--primary-red)]/40 transition-all flex items-center justify-center gap-3 text-xs font-bold text-[var(--text-primary)] shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign Up with Google</span>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-xs text-[var(--text-secondary)]">
            Already have a donor account?{" "}
            <Link to="/auth/login" className="text-[var(--primary-red)] font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
