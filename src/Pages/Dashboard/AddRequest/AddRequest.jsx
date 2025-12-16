import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxios from "../../../Hooks/useAxios";
import {
  Droplet,
  Users,
  MessageSquare,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Send,
  Sparkles,
  HeartPulse,
} from "lucide-react";
import { motion } from "framer-motion";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const requester_name = form.requesterName.value;
    const requester_email = form.requesterEmail.value;
    const recipient_name = form.recipientName.value;
    const recipient_district = form.district.value;
    const recipient_upazila = form.upazila.value;
    const address = form.address.value;
    const bloodGroup = form.bloodGroup.value;
    const hospital = form.hospital.value;
    const date = form.date.value;
    const time = form.time.value;
    const message = form.message.value;

    const reqFormData = {
      requester_name,
      requester_email,
      recipient_name,
      recipient_district,
      recipient_upazila,
      address,
      bloodGroup,
      hospital,
      date,
      time,
      message,
      donation_status: "pending",
    };

    axiosInstance
      .post("/requests", reqFormData)
      .then((res) => {
        setIsSubmitting(false);
        // Success Modal
        document.getElementById("success_modal").showModal();
        form.reset();
        setDistrict("");
        setUpazila("");
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        alert("Failed to submit request. Please try again.");
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Header with Floating Animation */}
      <motion.div variants={itemVariants} className="text-center mb-8 relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-red-200 to-pink-200 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-red-500 to-red-600 mb-4 shadow-2xl shadow-red-500/50 relative"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Droplet size={40} className="text-white" fill="currentColor" />
          <motion.div
            className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1.5 shadow-lg"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={16} className="text-yellow-700" />
          </motion.div>
        </motion.div>

        <h2 className="text-4xl lg:text-5xl font-black mb-2">
          <span className="bg-gradient-to-r from-red-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Create Donation Request
          </span>
        </h2>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <HeartPulse size={20} className="text-red-500 animate-pulse" />
          Your request could save a precious life
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div variants={itemVariants}>
        <div className="card bg-base-100 shadow-2xl border border-gray-100">
          <div className="card-body p-6 lg:p-10">
            <div className="space-y-8">
              {/* Requester Info Section */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100"
              >
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30"
                  animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="badge badge-lg badge-info gap-2">
                      <Users size={16} />
                      Requester
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Your Name" icon={<Users size={18} />}>
                      <input
                        name="requesterName"
                        type="text"
                        defaultValue={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full bg-blue-100/50 backdrop-blur-sm"
                      />
                    </FormField>

                    <FormField
                      label="Your Email"
                      icon={<MessageSquare size={18} />}
                    >
                      <input
                        name="requesterEmail"
                        type="email"
                        defaultValue={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-blue-100/50 backdrop-blur-sm"
                      />
                    </FormField>
                  </div>
                </div>
              </motion.div>

              {/* Recipient Info Section */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-pink-50 p-6 border border-red-100"
              >
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30"
                  animate={{ scale: [1.3, 1, 1.3], x: [20, 0, 20] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="badge badge-lg badge-error gap-2">
                      <Droplet size={16} fill="currentColor" />
                      Blood Details
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-red-300 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="Recipient Name" required>
                      <input
                        name="recipientName"
                        type="text"
                        placeholder="Enter full name"
                        className="input input-bordered input-error w-full bg-white/70 backdrop-blur-sm focus:scale-[1.02] transition-transform"
                        required
                      />
                    </FormField>

                    <FormField
                      label="Blood Group"
                      required
                      icon={<Droplet size={18} />}
                    >
                      <select
                        name="bloodGroup"
                        className="select select-bordered select-error w-full bg-white/70 backdrop-blur-sm focus:scale-[1.02] transition-transform"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="A+">🅰️ A+</option>
                        <option value="A-">🅰️ A-</option>
                        <option value="B+">🅱️ B+</option>
                        <option value="B-">🅱️ B-</option>
                        <option value="AB+">🆎 AB+</option>
                        <option value="AB-">🆎 AB-</option>
                        <option value="O+">🅾️ O+</option>
                        <option value="O-">🅾️ O-</option>
                      </select>
                    </FormField>
                  </div>
                </div>
              </motion.div>

              {/* Location Section */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100"
              >
                <motion.div
                  className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30"
                  animate={{ scale: [1, 1.3, 1], y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="badge badge-lg badge-success gap-2">
                      <MapPin size={16} />
                      Location
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-green-300 to-transparent"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="District"
                      required
                      icon={<MapPin size={18} />}
                    >
                      <select
                        name="district"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="select select-bordered select-success w-full bg-white/70 backdrop-blur-sm"
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                          <option key={d.name} value={d.name}>
                            📍 {d.name}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField
                      label="Upazila"
                      required
                      icon={<MapPin size={18} />}
                    >
                      <select
                        name="upazila"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        className="select select-bordered select-success w-full bg-white/70 backdrop-blur-sm"
                        required
                      >
                        <option value="">Select Upazila</option>
                        {upazilas.map((u) => (
                          <option key={u.name} value={u.name}>
                            📌 {u.name}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField
                      label="Hospital Name"
                      required
                      icon={<Building2 size={18} />}
                      className="md:col-span-2"
                    >
                      <input
                        name="hospital"
                        type="text"
                        placeholder="e.g., Dhaka Medical College Hospital"
                        className="input input-bordered input-success w-full bg-white/70 backdrop-blur-sm"
                        required
                      />
                    </FormField>

                    <FormField
                      label="Full Address"
                      required
                      icon={<MapPin size={18} />}
                      className="md:col-span-2"
                    >
                      <input
                        name="address"
                        type="text"
                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                        className="input input-bordered input-success w-full bg-white/70 backdrop-blur-sm"
                        required
                      />
                    </FormField>
                  </div>
                </div>
              </motion.div>

              {/* Schedule Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <FormField
                  label="Donation Date"
                  required
                  icon={<Calendar size={18} />}
                >
                  <input
                    name="date"
                    type="date"
                    className="input input-bordered input-primary w-full"
                    required
                  />
                </FormField>

                <FormField
                  label="Donation Time"
                  required
                  icon={<Clock size={18} />}
                >
                  <input
                    name="time"
                    type="time"
                    className="input input-bordered input-primary w-full"
                    required
                  />
                </FormField>
              </motion.div>

              {/* Message Section */}
              <motion.div variants={itemVariants}>
                <FormField
                  label="Request Message"
                  required
                  icon={<MessageSquare size={18} />}
                >
                  <textarea
                    name="message"
                    rows="4"
                    className="textarea textarea-bordered textarea-primary w-full resize-none"
                    placeholder="Explain why blood is urgently needed..."
                    required
                  ></textarea>
                </FormField>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center pt-6"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-error btn-lg gap-3 px-10 shadow-2xl shadow-red-500/50 hover:shadow-red-500/70"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span className="font-bold">Submit Request</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1 }}
            >
              <Droplet size={40} className="text-white" fill="currentColor" />
            </motion.div>
            <h3 className="font-bold text-2xl mb-2 text-green-800">Success!</h3>
            <p className="py-4 text-gray-700">
              Your blood donation request has been submitted successfully. We'll
              notify you soon!
            </p>
            <div className="modal-action justify-center">
              <button
                className="btn btn-success"
                onClick={() => document.getElementById("success_modal").close()}
              >
                Great!
              </button>
            </div>
          </motion.div>
        </div>
      </dialog>
    </motion.div>
  );
};

// FormField Component
const FormField = ({ label, icon, required, children, className = "" }) => (
  <div className={className}>
    <label className="label">
      <span className="label-text font-bold flex items-center gap-2 text-gray-700">
        {icon}
        {label}
        {required && <span className="text-error">*</span>}
      </span>
    </label>
    {children}
  </div>
);

export default AddRequest;
