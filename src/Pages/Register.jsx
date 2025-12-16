import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import register from "../assets/Register.jpeg"
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
  const { createUser, updateUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const navigate = useNavigate();

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

    const mainPhotoUrl = res.data.data.display_url;

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
        .then((result) => {
          console.log(result);
          return updateUser({
            displayName: name,
            photoURL: mainPhotoUrl,
          });
        })
        .then(() => {
          axios
            .post("http://localhost:5000/donor", formData)
            .then((res) => {
              console.log(res.data);
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-red-900/90"></div>
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
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Join VitalFlow
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white rounded-full"></div>
              <HeartPulse size={24} className="animate-pulse" />
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
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-blue-50/20 overflow-y-auto"
      >
        <div className="w-full max-w-md py-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
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
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <Droplet
                size={32}
                className="text-blue-600"
                fill="currentColor"
              />
              <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-red-600 rounded-full"></div>
            </motion.div>
            <h2 className="text-5xl font-black text-gray-900 mb-2">Sign Up</h2>
            <p className="text-gray-600">Create your donor account</p>
          </div>

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
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                  <User className="w-5 h-5" />
                </div>
                <input
                  name="name"
                  type="text"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
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
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all cursor-pointer bg-white group"
                >
                  <Upload className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                    {fileName || "Choose a file..."}
                  </span>
                </label>
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Blood Group
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10">
                  <Droplet className="w-5 h-5" fill="currentColor" />
                </div>
                <select
                  name="blood"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all bg-white appearance-none cursor-pointer"
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
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all bg-white appearance-none cursor-pointer text-sm"
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
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Upazila
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500 z-10">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all bg-white appearance-none cursor-pointer text-sm"
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
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all bg-white"
                  placeholder="••••••••••••"
                  onChange={() => setError("")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
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
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 mt-6 flex items-center justify-center gap-2"
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
            </motion.button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-bold hover:underline inline-flex items-center gap-1"
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
