import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  Heart,
  Calendar,
  User,
  TrendingUp,
  Award,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [fundings, setFundings] = useState([]);
  const [stats, setStats] = useState({ totalAmount: 0, totalDonations: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isDonating, setIsDonating] = useState(false);


  useEffect(() => {
    fetchFundings();
    fetchStats();
  }, []);

  const fetchFundings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosSecure.get("/all-funding");
      setFundings(data);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    const { data } = await axiosSecure.get("/total-funding");
    setStats(data);
  };

  const handleDonate = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }

    const amount = selectedAmount || donateAmount;

    if (!amount || amount <= 0) {
      toast.error("Please select or enter a valid donation amount");
      return;
    }

    try {
      setIsDonating(true);

      const res = await axiosSecure.post("/create-payment-checkout", {
        donateAmount: amount,
        donorEmail: user.email,
      });

      // Redirect to Stripe
      window.location.href = res.data.url;
    } catch (error) {
      setIsDonating(false);
      toast.error("Failed to initiate payment. Please try again.");
    }
  };



  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <section>
      <navbar>
        <Navbar />
      </navbar>
      <main>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-300/30 to-pink-300/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-300/30 to-rose-300/30 rounded-full blur-3xl"
          />

          <div className="relative max-w-7xl mx-auto py-12 px-4">
            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block mb-6 relative"
              >
                <Heart size={80} className="text-red-500" fill="currentColor" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-red-500 rounded-full blur-2xl"
                />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Funding & Donations
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your generosity powers our mission to save lives through blood
                donation
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="p-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl"
                    >
                      <DollarSign className="text-white" size={40} />
                    </motion.div>
                    <TrendingUp className="text-green-600" size={32} />
                  </div>
                  <p className="text-5xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                    ${stats.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-gray-600 font-semibold text-lg">
                    Total Funds Raised
                  </p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-4 bg-gradient-to-br from-red-400 to-rose-600 rounded-2xl"
                    >
                      <Heart
                        className="text-white"
                        size={40}
                        fill="currentColor"
                      />
                    </motion.div>
                    <Award className="text-red-600" size={32} />
                  </div>
                  <p className="text-5xl font-black bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-2">
                    {stats.totalDonations.toLocaleString()}
                  </p>
                  <p className="text-gray-600 font-semibold text-lg">
                    Total Donations Made
                  </p>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-400 to-rose-600"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDonateModal(true)}
                className="relative group px-12 py-6 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white text-xl font-bold rounded-2xl shadow-2xl overflow-hidden"
              >
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
                <span className="relative flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Give Fund & Make Impact
                  <Heart className="w-6 h-6" fill="currentColor" />
                </span>
              </motion.button>
            </motion.div>

            {/* Donations Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
            >
              <div className="bg-gradient-to-r from-red-500 to-rose-500 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Award className="w-7 h-7" />
                  Recent Donations
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Donor
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {fundings.map((fund, index) => (
                        <motion.tr
                          key={fund._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-t border-gray-100 hover:bg-red-50/50 transition-colors"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="p-2 bg-gradient-to-br from-red-100 to-rose-100 rounded-full"
                              >
                                <User size={20} className="text-red-600" />
                              </motion.div>
                              <span className="font-semibold text-gray-900">
                                {fund.donorName || "Anonymous"}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-5 text-gray-600">
                            {fund.donorEmail}
                          </td>
                          <td className="px-8 py-5">
                            <span className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                              <DollarSign
                                size={18}
                                className="text-green-700"
                              />
                              <span className="font-bold text-green-700">
                                {fund.amount}
                              </span>
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar size={16} className="text-red-500" />
                              {formatDate(fund.paidAt)}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Donate Modal */}
          <AnimatePresence>
            {showDonateModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setShowDonateModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 50 }}
                  transition={{ type: "spring", damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 p-8 text-white relative overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"
                    />
                    <div className="relative flex justify-between items-start">
                      <div>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mb-3"
                        >
                          <Heart size={48} fill="currentColor" />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-2">
                          Make a Donation
                        </h2>
                        <p className="text-red-100">
                          Every contribution saves lives
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDonateModal(false)}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-6 space-y-4">
                    {/* Quick Amount Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        Quick Select Amount
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {quickAmounts.map((amount) => (
                          <motion.button
                            key={amount}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setDonateAmount("");
                            }}
                            className={`py-2 rounded-xl font-bold transition-all ${
                              selectedAmount === amount
                                ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            ${amount}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Amount */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Or Enter Custom Amount
                      </label>
                      <div className="relative">
                        <DollarSign
                          size={20}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                          type="number"
                          min="1"
                          step="0.01"
                          value={donateAmount}
                          onChange={(e) => {
                            setDonateAmount(e.target.value);
                            setSelectedAmount(null);
                          }}
                          className="w-full pl-12 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors text-lg font-semibold"
                          placeholder="Enter custom amount"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDonateModal(false)}
                        className="flex-1 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={!isDonating ? { scale: 1.02 } : {}}
                        whileTap={!isDonating ? { scale: 0.98 } : {}}
                        onClick={handleDonate}
                        disabled={
                          isDonating || (!selectedAmount && !donateAmount)
                        }
                        className="flex-1 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-xl shadow-lg
             disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isDonating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Redirecting...
                          </>
                        ) : (
                          <>
                            <Heart size={20} fill="currentColor" />
                            Donate Now
                            <ArrowRight size={20} />
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
      </main>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default FundingPage;
