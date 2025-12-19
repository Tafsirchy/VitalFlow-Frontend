import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Download, Home } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = ({
  title = "Payment Successful",
  message = "Thank you! Your payment has been processed successfully.",
  amount,
  transactionId,
  showInvoice = true,
}) => {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const sessionId = searchParams.get("session_id");

 const axiosInstance = useAxios();

 useEffect(() => {
   if (!sessionId) return;

   axiosInstance
     .post(`/success-payment?session_id=${sessionId}`)
     .then((res) => {
      //  console.log(res.data);
     })
     .catch((err) => {
      console.log(err);
     });
 }, [axiosInstance, sessionId]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="flex justify-center"
          >
            <CheckCircle className="w-20 h-20 text-emerald-500" />
          </motion.div>

          {/* Title */}
          <h1 className="mt-6 text-2xl font-bold text-gray-800">{title}</h1>

          {/* Message */}
          <p className="mt-2 text-gray-600 text-sm">{message}</p>

          {/* Details */}
          {(amount || transactionId) && (
            <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-left space-y-2">
              {amount && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold text-gray-800">
                    ৳ {amount}
                  </span>
                </div>
              )}
              {transactionId && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transaction ID</span>
                  <span className="font-mono text-xs text-gray-800">
                    {transactionId}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
          </div>

          {showInvoice && (
            <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-100 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-200 transition">
              <Download className="w-4 h-4" />
              Download Invoice
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          If you have any issues, please contact support.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
