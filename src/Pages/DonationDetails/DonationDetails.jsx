import { useContext, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
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
  ChevronLeft,
  ChevronRight,
  Star,
  ThumbsUp,
  Share2,
  Phone,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [relatedRequests, setRelatedRequests] = useState([]);

  const reviews = useMemo(() => [
    {
      id: 1,
      reviewer_name: "Dr. Rahman",
      reviewer_type: "hospital_staff",
      rating: 5,
      comment: "Verified successful donation. The donor was punctual and the process went smoothly.",
      date: "2 days ago",
      verified: true,
      helpful_count: 12,
    },
    {
      id: 2,
      reviewer_name: "Ahmed Hassan",
      reviewer_type: "donor",
      rating: 5,
      comment: "Glad I could help. The requester was very grateful and the hospital staff was professional.",
      date: "3 days ago",
      verified: true,
      helpful_count: 8,
    },
  ], []);

  useEffect(() => {
    axiosSecure.get(`/requests/${id}`).then((res) => {
      setRequest(res.data);
    });

    // Fetch related requests
    axiosSecure.get(`/requests?limit=4`).then((res) => {
      setRelatedRequests(res.data.slice(0, 4));
    });
  }, [id, axiosSecure]);

  const handleConfirmDonation = async () => {
    if (!user) {
      toast.info("Please login to donate");
      navigate("/auth/login", { state: { from: `/donation-details/${id}` } });
      return;
    }

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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Droplet className="w-12 h-12 text-red-500 dark:text-red-400" />
        </motion.div>
      </div>
    );
  }

  const isOwnRequest = user?.email === request.requester_email;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700";
      case "inprogress":
        return "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700";
      case "done":
        return "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700";
      case "canceled":
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-4"
          >
            <Droplet className="w-16 h-16 text-red-500 dark:text-red-400 fill-red-500 dark:fill-red-400 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
            Donation Request Details
          </h1>
          <div className="flex justify-center mb-4">
            <span className={`px-6 py-2 rounded-full border-2 font-semibold text-sm uppercase tracking-wide ${getStatusColor(request.donation_status)}`}>
              {request.donation_status}
            </span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Enhanced Blood Group Hero with Visual Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 dark:from-red-600 dark:via-rose-600 dark:to-pink-700 p-12 rounded-3xl text-white shadow-2xl overflow-hidden"
            >
              {/* Animated Background Patterns */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"
              />
              
              {/* Decorative Droplets */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className="absolute"
                    style={{
                      left: `${10 + i * 12}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                  >
                    <Droplet className="w-8 h-8 fill-white" />
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="mb-6"
                >
                  <Droplet className="w-20 h-20 mx-auto fill-white/20 stroke-white stroke-2" />
                </motion.div>
                
                <p className="text-white/80 text-sm uppercase tracking-wider mb-3 font-bold">
                  Blood Group Needed
                </p>
                
                <motion.h2
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="text-8xl font-black mb-6"
                >
                  {request.bloodGroup}
                </motion.h2>

                {/* Quick Stats Bar */}
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                  {[
                    { icon: Clock, label: "Response Time", value: "<2 hours" },
                    { icon: MapPin, label: "Location", value: request.address.split(',')[0] },
                    { icon: Calendar, label: "Needed By", value: request.date },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-3"
                    >
                      <stat.icon className="w-5 h-5 mx-auto mb-2" />
                      <p className="text-xs text-white/80 mb-1">{stat.label}</p>
                      <p className="text-sm font-bold">{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Urgency Alert Banner */}
            {request.donation_status === "pending" && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-500 dark:border-amber-400 p-6 rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200 mb-2">
                      Urgent Request - Immediate Help Needed
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300">
                      This patient urgently needs {request.bloodGroup} blood. Your donation could save a life today. Please respond as soon as possible.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Overview/Description */}
            {request.message && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  Additional Information
                </h3>
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {request.message}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Key Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Request Specifications
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Requester Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <User className="w-5 h-5 text-red-500 dark:text-red-400" />
                    Requester Information
                  </h4>
                  <InfoItem icon={<User className="w-4 h-4" />} label="Name" value={request.requester_name} />
                  <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={request.requester_email} />
                </div>

                {/* Recipient Info */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 dark:text-red-400" />
                    Patient Information
                  </h4>
                  <InfoItem icon={<User className="w-4 h-4" />} label="Patient Name" value={request.recipient_name} />
                </div>
              </div>

              {/* Location & Schedule */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-red-500 dark:text-red-400" />
                  Location & Schedule
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <InfoItem icon={<Hospital className="w-4 h-4" />} label="Hospital" value={request.hospital} />
                  <InfoItem icon={<MapPin className="w-4 h-4" />} label="Address" value={request.address} />
                  <InfoItem icon={<Calendar className="w-4 h-4" />} label="Date" value={request.date} />
                  <InfoItem icon={<Clock className="w-4 h-4" />} label="Time" value={request.time} />
                </div>
              </div>
            </motion.div>

            {/* Reviews & Ratings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  Reviews & Ratings
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">{avgRating.toFixed(1)}</span>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.round(avgRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{reviews.length} reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    whileHover={{ x: 4 }}
                    className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">{review.reviewer_name}</h4>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                        {review.reviewer_type === "donor" ? "Donor" : "Hospital Staff"}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                    <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful ({review.helpful_count})</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Action Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sticky top-4"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Take Action</h3>
              
              {request.donation_status === "pending" && !isOwnRequest && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => user ? setOpen(true) : navigate("/auth/login", { state: { from: `/donation-details/${id}` } })}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 mb-4"
                >
                  <Heart className="w-5 h-5" />
                  {user ? "Donate Blood - Save a Life" : "Login to Donate"}
                </motion.button>
              )}

              {isOwnRequest && (
                <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700 mb-4">
                  <AlertCircle className="w-5 h-5" />
                  <p className="font-medium text-sm">You cannot donate to your own request</p>
                </div>
              )}

              {request.donation_status !== "pending" && !isOwnRequest && (
                <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700 mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium text-sm">This request is being processed</p>
                </div>
              )}

              <button className="w-full flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-xl transition-all mb-2">
                <Share2 className="w-4 h-4" />
                Share Request
              </button>

              <button className="w-full flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 py-3 rounded-xl transition-all">
                <Phone className="w-4 h-4" />
                Contact Requester
              </button>
            </motion.div>

            {/* Related Requests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Requests</h3>
              <div className="space-y-4">
                {relatedRequests.map((rel, idx) => (
                  <motion.div
                    key={rel._id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate(`/donation-details/${rel._id}`)}
                    className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-red-500 dark:hover:border-red-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-black text-red-600 dark:text-red-400">{rel.bloodGroup}</span>
                      <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full font-semibold">
                        {rel.donation_status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">{rel.hospital}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {rel.address}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Donation Confirmation Modal */}
      <AnimatePresence>
        {open && user && (
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
              className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Heart className="w-8 h-8 fill-white" />
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
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4 text-red-500 dark:text-red-400" />
                      Donor Name
                    </label>
                    <input
                      value={user?.displayName || "Anonymous"}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="w-4 h-4 text-red-500 dark:text-red-400" />
                      Donor Email
                    </label>
                    <input
                      value={user?.email}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-300">
                    By confirming, you agree to donate blood for this request. Please ensure you're available at the specified time and location.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => !loading && setOpen(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    disabled={loading}
                    onClick={handleConfirmDonation}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                  </button>
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
    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-gray-800 dark:text-gray-200 font-medium truncate">{value}</p>
    </div>
  </motion.div>
);

export default DonationDetails;
