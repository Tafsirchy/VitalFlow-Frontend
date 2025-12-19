import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  User,
  Mail,
  MapPin,
  Hospital,
  Calendar,
  Clock,
  MessageSquare,
  Droplet,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";


const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
    });
  }, [id, axiosSecure]);

 const handleConfirmDonation = async () => {
   try {
     setLoading(true);

     await axiosSecure.patch(`/update-donation-status/${id}`, {
       status: "inprogress",
     });

     setRequest((prev) => ({
       ...prev,
       donation_status: "inprogress",
     }));

     toast.success("Donation confirmed successfully ❤️");
     setOpen(false);
   } catch (error) {
     console.error("Donation confirmation failed:", error);

   
   } finally {
     setLoading(false);
   }
 };


  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Droplet className="w-12 h-12 text-red-500" />
        </motion.div>
      </div>
    );
  }

  const isOwnRequest = user?.email === request.requester_email;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "inprogress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "done":
        return "bg-green-100 text-green-700 border-green-300";
      case "canceled":
        return "bg-gray-100 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with animated blood drop */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <Droplet className="w-16 h-16 text-red-500 fill-red-500" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-red-500 rounded-full opacity-20 blur-xl"
              />
            </div>
          </motion.div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Donation Request Details
          </h2>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <span
            className={`px-6 py-2 rounded-full border-2 font-semibold text-sm uppercase tracking-wide ${getStatusColor(
              request.donation_status
            )}`}
          >
            {request.donation_status}
          </span>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Blood Group Hero */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-8 text-white relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -left-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"
            />
            <div className="relative z-10 text-center">
              <p className="text-red-100 text-sm uppercase tracking-wider mb-2">
                Blood Group Needed
              </p>
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="text-6xl font-bold"
              >
                {request.bloodGroup}
              </motion.h3>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Requester Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-red-500" />
                  Requester Information
                </h4>
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Name"
                  value={request.requester_name}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                  value={request.requester_email}
                />
              </motion.div>

              {/* Recipient Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-red-500" />
                  Recipient Information
                </h4>
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Patient Name"
                  value={request.recipient_name}
                />
              </motion.div>
            </div>

            {/* Location & Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 pt-6 border-t"
            >
              <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-red-500" />
                Location & Schedule
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem
                  icon={<Hospital className="w-4 h-4" />}
                  label="Hospital"
                  value={request.hospital}
                />
                <InfoItem
                  icon={<MapPin className="w-4 h-4" />}
                  label="Address"
                  value={request.address}
                />
                <InfoItem
                  icon={<Calendar className="w-4 h-4" />}
                  label="Date"
                  value={request.date}
                />
                <InfoItem
                  icon={<Clock className="w-4 h-4" />}
                  label="Time"
                  value={request.time}
                />
              </div>
            </motion.div>

            {/* Message */}
            {request.message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-6 border-t"
              >
                <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-red-500" />
                  Additional Message
                </h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
                  {request.message}
                </p>
              </motion.div>
            )}
          </div>

          {/* Action Button */}
          <div className="p-8 bg-gray-50 border-t">
            {request.donation_status === "pending" && !isOwnRequest && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(true)}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Donate Blood - Save a Life
              </motion.button>
            )}

            {isOwnRequest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-xl border border-amber-200"
              >
                <AlertCircle className="w-5 h-5" />
                <p className="font-medium">
                  You cannot donate to your own request
                </p>
              </motion.div>
            )}

            {request.donation_status !== "pending" && !isOwnRequest && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-2 text-blue-600 bg-blue-50 p-4 rounded-xl border border-blue-200"
              >
                <CheckCircle className="w-5 h-5" />
                <p className="font-medium">
                  This donation request is already being processed
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !loading && setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white relative overflow-hidden">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-10 -top-10 w-32 h-32 bg-white opacity-10 rounded-full"
                />
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Heart className="w-8 h-8 fill-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">Confirm Donation</h3>
                  </div>
                  <button
                    onClick={() => !loading && setOpen(false)}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                    disabled={loading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-red-100 mt-2 relative z-10">
                  You're about to save a life!
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 text-red-500" />
                      Donor Name
                    </label>
                    <input
                      value={user?.displayName || "Anonymous"}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-red-500" />
                      Donor Email
                    </label>
                    <input
                      value={user?.email}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">
                    By confirming, you agree to donate blood for this request.
                    Please ensure you're available at the specified time and
                    location.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => !loading && setOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="button"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={loading}
                    onClick={handleConfirmDonation}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Droplet className="w-4 h-4" />
                        </motion.div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Confirm Donation
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <motion.div whileHover={{ x: 4 }} className="flex items-start gap-3 group">
    <div className="p-2 bg-red-50 rounded-lg text-red-500 group-hover:bg-red-100 transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-gray-800 font-medium truncate">{value}</p>
    </div>
  </motion.div>
);

export default DonationDetails;
