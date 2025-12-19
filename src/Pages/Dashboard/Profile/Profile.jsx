import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Droplet,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mainPhotoUrl: "",
    blood: "",
    district: "",
    upazila: "",
    role: "",
    status: "",
  });
  const [formData, setFormData] = useState({ ...profileData });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      setDistricts(
        res.data.districts.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        )
      );
    });
    axios.get("/upazilas.json").then((res) => {
      setUpazilas(
        res.data.upazilas.sort((a, b) =>
          a.name.localeCompare(b.name, "en", { sensitivity: "base" })
        )
      );
    });
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/donor/role/${user.email}`);
        setProfileData(res.data);
        setFormData(res.data);
      } catch (err) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, axiosSecure]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profileData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (
      !formData.name ||
      !formData.blood ||
      !formData.district ||
      !formData.upazila
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      setSaving(true);
      const updatePayload = {
        name: formData.name,
        blood: formData.blood,
        district: formData.district,
        upazila: formData.upazila,
        mainPhotoUrl: formData.mainPhotoUrl,
      };
      await axiosSecure.patch(`/donor/update/${user.email}`, updatePayload);
      setProfileData(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const roleGradient = {
    Admin: "from-purple-500 to-indigo-600",
    Volunteer: "from-orange-500 to-red-500",
    Donor: "from-red-500 to-pink-600",
  };

  const statusConfig = {
    active: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
    blocked: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-6 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header - Solid Red Gradient */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 pt-12 pb-32 relative">
            <div className="px-10 flex justify-between items-start">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  My Profile
                </motion.h1>
                <p className="text-white/90">Manage your donor information</p>
              </div>

              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <motion.button
                    key="edit"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={handleEdit}
                    className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 hover:bg-white/30 transition"
                  >
                    <Edit size={20} />
                    Edit Profile
                  </motion.button>
                ) : (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-3"
                  >
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-green-500 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 hover:bg-green-600 transition shadow-lg"
                    >
                      {saving ? (
                        "Saving..."
                      ) : (
                        <>
                          <Save size={20} />
                          Save
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 hover:bg-white/30 transition"
                    >
                      <X size={20} />
                      Cancel
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar - Perfect Overlap */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2"
            >
              <div className="relative group">
                <div className="w-48 h-48 rounded-full overflow-hidden border-10 border-white shadow-2xl">
                  {formData.mainPhotoUrl ? (
                    <img
                      src={formData.mainPhotoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-500 to-pink-600 text-white">
                      <User size={80} />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={40} className="text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Content Area */}
          <div className="pt-32 pb-16 px-10">
            {/* Role Badge - Centered Below Avatar */}
            <div className="flex justify-center mb-12">
              <div
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold shadow-xl bg-gradient-to-r ${
                  roleGradient[profileData.role] || "from-red-500 to-pink-600"
                } text-xl`}
              >
                <Shield size={28} />
                {profileData.role || "Donor"}
              </div>
            </div>

            {/* Optional Status Badge */}
            {profileData.status && statusConfig[profileData.status] && (
              <div className="flex justify-center mb-12">
                <div
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium ${
                    statusConfig[profileData.status].bg
                  } ${statusConfig[profileData.status].color}`}
                >
                  {statusConfig[profileData.status].icon &&
                    (() => {
                      const StatusIcon = statusConfig[profileData.status].icon;
                      return <StatusIcon size={18} />;
                    })()}
                  <span className="capitalize">{profileData.status}</span>
                </div>
              </div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Name */}
              <div className="relative">
                <User
                  className="absolute left-4 top-5 text-red-500"
                  size={20}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-5 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  className="absolute left-4 top-5 text-gray-500"
                  size={20}
                />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-12 pr-5 py-5 bg-gray-100 border border-gray-300 rounded-2xl text-lg cursor-not-allowed"
                />
              </div>

              {/* Blood Group */}
              <div className="relative">
                <Droplet
                  className="absolute left-4 top-5 text-red-600"
                  size={20}
                />
                <select
                  name="blood"
                  value={formData.blood}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-5 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-lg appearance-none"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-5 text-red-500"
                  size={20}
                />
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-5 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-lg appearance-none"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id || d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-5 text-red-500"
                  size={20}
                />
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-12 pr-5 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-lg appearance-none"
                >
                  <option value="">Select Upazila</option>
                  {upazilas
                    .filter(
                      (u) => u.district_name === formData.district || isEditing
                    )
                    .map((u) => (
                      <option key={u.id || u.name} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Photo URL */}
              <div className="relative md:col-span-2">
                <Camera
                  className="absolute left-4 top-5 text-red-500"
                  size={20}
                />
                <input
                  type="url"
                  name="mainPhotoUrl"
                  value={formData.mainPhotoUrl}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Profile Photo URL (optional)"
                  className="w-full pl-12 pr-5 py-5 bg-gray-50/70 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-red-400 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
