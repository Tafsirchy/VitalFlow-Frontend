import React, { useContext, useEffect, useState } from "react";
import {
  User,
  Mail,
  Droplet,
  MapPin,
  Edit,
  Save,
  X,
  Camera,
  ShieldCheck,
  CheckCircle2,
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
      } catch {
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
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <div className="w-10 h-10 rounded-full border-3 border-[var(--primary-red)]/20 border-t-[var(--primary-red)] animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          Loading Member Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Profile Card Header */}
      <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-5 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[var(--border-light)]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-red-500/20 shadow-md shrink-0">
              {formData.mainPhotoUrl ? (
                <img
                  src={formData.mainPhotoUrl}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--primary-red)] text-white flex items-center justify-center font-bold text-xl">
                  {formData.name?.charAt(0) || "M"}
                </div>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-[var(--primary-red)] text-[11px] font-bold uppercase tracking-wider mb-0.5">
                <ShieldCheck size={12} />
                <span>{profileData.role || "Voluntary Donor"}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {profileData.name}
              </h1>
              <p className="text-xs text-[var(--text-muted)] font-medium">
                {profileData.email} • Status: <span className="text-emerald-600 font-bold">{profileData.status || "Active"}</span>
              </p>
            </div>
          </div>

          <div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="btn-premium !px-4 !py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Edit size={14} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Save size={14} />
                  <span>{saving ? "Saving..." : "Save"}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-3 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)] text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Form Details */}
        <div className="pt-8 grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-12 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-70 focus:outline-none focus:border-[var(--primary-red)] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Blood Group
            </label>
            <select
              name="blood"
              value={formData.blood}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-12 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-70 focus:outline-none focus:border-[var(--primary-red)] transition-all cursor-pointer"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((b) => (
                <option key={b} value={b}>
                  Blood Group {b}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-12 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-70 focus:outline-none focus:border-[var(--primary-red)] transition-all cursor-pointer"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Upazila
            </label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full h-12 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-70 focus:outline-none focus:border-[var(--primary-red)] transition-all cursor-pointer"
            >
              <option value="">Select Upazila</option>
              {upazilas
                .filter((u) => u.district_name === formData.district || isEditing)
                .map((u) => (
                  <option key={u.name} value={u.name}>
                    {u.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Avatar Image URL
            </label>
            <input
              type="url"
              name="mainPhotoUrl"
              value={formData.mainPhotoUrl}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="https://example.com/photo.jpg"
              className="w-full h-12 px-4 rounded-xl border border-[var(--border-light)] bg-[var(--background-main)] text-sm font-semibold text-[var(--text-primary)] disabled:opacity-70 focus:outline-none focus:border-[var(--primary-red)] transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
