import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import Loading from "../Components/Loading";
import register from "../assets/register.jpg";
import { Eye, EyeOff } from "lucide-react";
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

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/districts.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  // console.log(upazilah, districts);

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
      upazila
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
          // toast.success("Sign Up Successful");
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

    // return;
  };

  {
    loading && (
      <div className="min-h-screen flex justify-center items-center">
        <Loading></Loading>
      </div>
    );
  }

  const renderLoadingSpinner = (
    <div className="flex justify-center items-center">
      <Loading></Loading>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-700 to-blue-900">
          <img
            src={register}
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">Build Better Habits</h1>
            <p className="text-xl opacity-90">
              Track your progress, achieve your goals
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-5xl font-bold text-[#A3B18A]  mb-2">Sign Up</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="Name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="Email address..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Photo URL
              </label>
              <input
                name="photo"
                type="file"
                className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="Photo URL..."
                required
              />
            </div>

            <label
              // for="bloodGroup"
              class="block mb-2 text-sm font-medium text-gray-600"
            >
              Blood Group
            </label>
            <select name="blood" required className="select w-full">
              <option value="" disabled selected>
                Select your blood group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <label
              // for="bloodGroup"
              class="block mb-2 text-sm font-medium text-gray-600"
            >
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="select w-full"
            >
              <option disabled selected value="">
                Select Your District
              </option>
              {districts.map((d) => (
                <option value={d?.name}>{d?.name}</option>
              ))}
            </select>

            <label
              // for="bloodGroup"
              class="block mb-2 text-sm font-medium text-gray-600"
            >
              Upazila
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="select w-full"
            >
              <option disabled selected value="">
                Select Your Upazila
              </option>
              {upazilas.map((u) => (
                <option value={u?.name}>{u?.name}</option>
              ))}
            </select>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 border-b-2 border-gray-200 focus:border-purple-500 outline-none transition-colors bg-transparent"
                placeholder="************"
                onChange={() => setError("")}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full  bg-gradient-to-r from-[#234C6A] to-[#1B3C53] text-white font-semibold hover:from-[]#1B3C53 hover:to-[#1B3C5390] transition-all shadow-lg mt-6"
              disabled={loading}
            >
              {loading ? renderLoadingSpinner : "Sign Up"}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Already Have an Account?{" "}
                <Link
                  to="/auth/login"
                  className="text-purple-600 font-semibold hover:underline"
                >
                  Sign in →
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
