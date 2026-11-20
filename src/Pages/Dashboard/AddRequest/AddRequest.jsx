import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import {
  Droplet,
  Users,
  MessageSquare,
  MapPin,
  Building2,
  Calendar,
  Clock,
  Send,
  HeartPulse,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { motion as Motion } from "framer-motion";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const axiosSecure = useAxiosSecure();

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

    axiosSecure
      .post("/requests", reqFormData)
      .then(() => {
        setIsSubmitting(false);
        document.getElementById("success_modal").showModal();
        form.reset();
        setDistrict("");
        setUpazila("");
      })
      .catch((err) => {
        console.error("Failed to submit request:", err);
        setIsSubmitting(false);
        alert("Failed to submit blood request. Please check all required fields and try again.");
      });
  };

  return (
    <div className="py-3 sm:py-5 lg:py-6">
      <div className="max-w-4xl mx-auto px-3 sm:px-5">
        {/* Symmetrical Section Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md shadow-red-500/20 mb-3">
            <Droplet size={24} fill="currentColor" />
          </div>
          <span className="section-eyebrow block">EMERGENCY COORDINATION</span>
          <h1 className="section-title">Create Donation Request</h1>
          <p className="section-subtitle">
            Initiate a verified emergency blood dispatch. Your request will immediately notify compatible, verified donors in the hospital district.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] shadow-sm p-4 sm:p-6 lg:p-8 transition-smooth">
          <form onSubmit={handleRequest} className="space-y-5">
            {/* Requester Information */}
            <div className="bg-[var(--background-main)] rounded-xl p-4 border border-[var(--border-light)]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--border-light)]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-[var(--text-primary)]">Requester Identity</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">Verified contact details from your session</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle size={11} />
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Requester Full Name
                  </label>
                  <input
                    name="requesterName"
                    type="text"
                    defaultValue={user?.displayName || ""}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-xs sm:text-sm font-medium opacity-90 cursor-not-allowed outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                    Requester Email Address
                  </label>
                  <input
                    name="requesterEmail"
                    type="email"
                    defaultValue={user?.email || ""}
                    readOnly
                    className="w-full px-3 py-2 rounded-lg bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-xs sm:text-sm font-medium opacity-90 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Patient & Blood Group */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse size={18} className="text-red-600" />
                <h3 className="font-bold text-base text-[var(--text-primary)]">Patient & Blood Specification</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Patient Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="recipientName"
                    type="text"
                    placeholder="e.g., Sarah Rahman"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all placeholder:text-[var(--text-muted)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Required Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm font-semibold focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hospital & Location */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={18} className="text-red-600" />
                <h3 className="font-bold text-base text-[var(--text-primary)]">Hospital & Location</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Upazila / Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="upazila"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    required
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map((u) => (
                      <option key={u.name} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Hospital / Medical Center Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="hospital"
                    type="text"
                    placeholder="e.g., National Institute of Cardiovascular Diseases"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all placeholder:text-[var(--text-muted)]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Hospital Ward, Bed or Full Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="address"
                    type="text"
                    placeholder="e.g., Sher-e-Bangla Nagar, Ward 4, Bed 12"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all placeholder:text-[var(--text-muted)]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="text-red-600" />
                <h3 className="font-bold text-base text-[var(--text-primary)]">Transfusion Schedule</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Required Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="date"
                    type="date"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                    Required Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="time"
                    type="time"
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Clinical Message */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={18} className="text-red-600" />
                <h3 className="font-bold text-base text-[var(--text-primary)]">Clinical Note & Urgency Details</h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                  Emergency Details & Instructions <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--background-card)] text-[var(--text-primary)] border border-[var(--border-light)] text-sm focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all placeholder:text-[var(--text-muted)] resize-none"
                  placeholder="Provide clinical context (e.g., planned surgery, thalassemia transfusion, emergency trauma) and any specific donor criteria or directions..."
                  required
                ></textarea>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border-light)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <AlertCircle size={15} className="text-amber-500 shrink-0" />
                <span>All requests are broadcast to verified local donors immediately upon submission.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-500/20 disabled:opacity-50 transition-smooth"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing Request...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Publish Emergency Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Symmetrical Success Modal */}
      <dialog id="success_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[var(--background-card)] border border-[var(--border-light)] rounded-3xl p-8 sm:p-10 text-center max-w-md shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-500/20">
            <CheckCircle size={36} />
          </div>
          <span className="section-eyebrow text-emerald-600">SUBMISSION CONFIRMED</span>
          <h3 className="text-2xl font-black text-[var(--text-primary)] mt-1 mb-3">
            Request Published
          </h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Your emergency blood donation request has been verified and registered on the VitalFlow donor dispatch network. Compatible donors in your district will be notified immediately.
          </p>
          <div className="modal-action justify-center m-0">
            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-smooth"
              onClick={() => document.getElementById("success_modal").close()}
            >
              Done & Return
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddRequest;
