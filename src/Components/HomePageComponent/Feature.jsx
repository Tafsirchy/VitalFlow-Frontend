// import React, { useState } from "react";
// import {
//   Droplets,
//   MapPin,
//   Clock,
//   Phone,
//   AlertCircle,
//   Heart,
//   ArrowRight,
//   Filter,
//   Zap,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// const Feature = () => {
//   const [selectedBloodType, setSelectedBloodType] = useState("ALL");

//   const bloodTypes = ["ALL", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

//   const urgentRequests = [
//     {
//       id: 1,
//       patientName: "Mohammad Rahman",
//       bloodType: "O-",
//       hospital: "Chittagong Medical College Hospital",
//       location: "Agrabad, Chittagong",
//       urgency: "CRITICAL",
//       timePosted: "15 mins ago",
//       unitsNeeded: 3,
//       contact: "+880 1712-345678",
//       distance: "2.3 km",
//       deadline: "6 hours",
//     },
//     {
//       id: 2,
//       patientName: "Ayesha Begum",
//       bloodType: "AB+",
//       hospital: "Max Hospital",
//       location: "Nasirabad, Chittagong",
//       urgency: "URGENT",
//       timePosted: "45 mins ago",
//       unitsNeeded: 2,
//       contact: "+880 1823-456789",
//       distance: "4.1 km",
//       deadline: "12 hours",
//     },
//     {
//       id: 3,
//       patientName: "Karim Ahmed",
//       bloodType: "B+",
//       hospital: "Imperial Hospital",
//       location: "Khulshi, Chittagong",
//       urgency: "MODERATE",
//       timePosted: "2 hours ago",
//       unitsNeeded: 1,
//       contact: "+880 1934-567890",
//       distance: "5.8 km",
//       deadline: "24 hours",
//     },
//     {
//       id: 4,
//       patientName: "Fatima Khan",
//       bloodType: "A+",
//       hospital: "Chevron Clinical Lab",
//       location: "GEC Circle, Chittagong",
//       urgency: "URGENT",
//       timePosted: "1 hour ago",
//       unitsNeeded: 2,
//       contact: "+880 1645-678901",
//       distance: "3.5 km",
//       deadline: "8 hours",
//     },
//   ];

//   const filteredRequests =
//     selectedBloodType === "ALL"
//       ? urgentRequests
//       : urgentRequests.filter((req) => req.bloodType === selectedBloodType);

//   const getUrgencyColor = (urgency) => {
//     switch (urgency) {
//       case "CRITICAL":
//         return "from-[#C62828] to-[#B71C1C]";
//       case "URGENT":
//         return "from-[#D84315] to-[#BF360C]";
//       case "MODERATE":
//         return "from-[#F57C00] to-[#E65100]";
//       default:
//         return "from-[#616161] to-[#424242]";
//     }
//   };

//   const getUrgencyBorder = (urgency) => {
//     switch (urgency) {
//       case "CRITICAL":
//         return "border-[#C62828]";
//       case "URGENT":
//         return "border-[#D84315]";
//       case "MODERATE":
//         return "border-[#F57C00]";
//       default:
//         return "border-[#616161]";
//     }
//   };

//   return (
//     <div>
//       <section className="py-20 bg-[#FAFAFA] relative overflow-hidden">
//         {/* Background Decorations */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFEBEE] rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E3F2FD] rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2" />

//         <div className="container mx-auto px-6 lg:px-12 relative z-10">
//           {/* Section Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-12"
//           >
//             <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C62828] to-[#B71C1C] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
//               <Zap size={20} className="animate-pulse" />
//               <span className="font-bold text-sm uppercase tracking-wide">
//                 Live Updates
//               </span>
//             </div>

//             <h2 className="text-4xl lg:text-5xl font-bold text-[#212121] mb-4">
//               Urgent Blood <span className="text-[#C62828]">Requests</span>
//             </h2>
//             <p className="text-lg text-[#616161] max-w-2xl mx-auto">
//               Every second counts. Help save lives by responding to critical
//               blood requirements near you.
//             </p>
//           </motion.div>

//           {/* Blood Type Filter */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mb-8"
//           >
//             <div className="bg-white rounded-2xl shadow-lg p-4 max-w-4xl mx-auto">
//               <div className="flex items-center gap-3 mb-3">
//                 <Filter className="text-[#0D47A1]" size={20} />
//                 <span className="font-semibold text-[#212121]">
//                   Filter by Blood Type
//                 </span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {bloodTypes.map((type) => (
//                   <motion.button
//                     key={type}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setSelectedBloodType(type)}
//                     className={`px-6 py-2 rounded-full font-semibold transition-all ${
//                       selectedBloodType === type
//                         ? "bg-gradient-to-r from-[#C62828] to-[#B71C1C] text-white shadow-lg"
//                         : "bg-[#FAFAFA] text-[#616161] hover:bg-[#FFEBEE]"
//                     }`}
//                   >
//                     {type}
//                   </motion.button>
//                 ))}
//               </div>
//             </div>
//           </motion.div>

//           {/* Request Cards Grid */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selectedBloodType}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto"
//             >
//               {filteredRequests.map((request, index) => (
//                 <motion.div
//                   key={request.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   whileHover={{
//                     y: -8,
//                     boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                   }}
//                   className={`bg-white rounded-2xl overflow-hidden border-l-4 ${getUrgencyBorder(
//                     request.urgency
//                   )} shadow-lg hover:shadow-2xl transition-all`}
//                 >
//                   {/* Card Header */}
//                   <div className="p-6 space-y-4">
//                     {/* Top Row - Urgency Badge & Time */}
//                     <div className="flex items-center justify-between">
//                       <motion.div
//                         animate={{ scale: [1, 1.05, 1] }}
//                         transition={{ duration: 2, repeat: Infinity }}
//                         className={`bg-gradient-to-r ${getUrgencyColor(
//                           request.urgency
//                         )} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-2`}
//                       >
//                         <AlertCircle size={14} />
//                         {request.urgency}
//                       </motion.div>

//                       <div className="flex items-center gap-1.5 text-[#9E9E9E] text-sm">
//                         <Clock size={14} />
//                         <span>{request.timePosted}</span>
//                       </div>
//                     </div>

//                     {/* Blood Type & Patient Info */}
//                     <div className="flex items-start gap-4">
//                       <motion.div
//                         animate={{ rotate: [0, -5, 5, 0] }}
//                         transition={{
//                           duration: 3,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                         }}
//                         className="w-20 h-20 bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-2xl flex flex-col items-center justify-center text-white shadow-xl flex-shrink-0"
//                       >
//                         <Droplets size={24} className="mb-1" />
//                         <span className="text-xl font-bold">
//                           {request.bloodType}
//                         </span>
//                       </motion.div>

//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-xl font-bold text-[#212121] mb-1 truncate">
//                           {request.patientName}
//                         </h3>
//                         <p className="text-[#0D47A1] font-semibold mb-2">
//                           {request.hospital}
//                         </p>
//                         <div className="flex items-center gap-1.5 text-[#616161] text-sm">
//                           <MapPin size={14} className="flex-shrink-0" />
//                           <span className="truncate">{request.location}</span>
//                           <span className="text-[#9E9E9E] ml-1">
//                             • {request.distance}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Details Grid */}
//                     <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E0E0E0]">
//                       <div className="bg-[#FFEBEE] rounded-xl p-3">
//                         <div className="text-xs text-[#616161] mb-1">
//                           Units Needed
//                         </div>
//                         <div className="text-2xl font-bold text-[#C62828]">
//                           {request.unitsNeeded}
//                         </div>
//                       </div>
//                       <div className="bg-[#E3F2FD] rounded-xl p-3">
//                         <div className="text-xs text-[#616161] mb-1">
//                           Deadline
//                         </div>
//                         <div className="text-lg font-bold text-[#0D47A1]">
//                           {request.deadline}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-3 pt-2">
//                       <motion.a
//                         href={`tel:${request.contact}`}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="flex-1 bg-gradient-to-r from-[#C62828] to-[#B71C1C] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
//                       >
//                         <Phone size={18} />
//                         Call Now
//                       </motion.a>

//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         className="flex-1 bg-[#0D47A1] hover:bg-[#08306B] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
//                       >
//                         <Heart size={18} />
//                         Respond
//                       </motion.button>
//                     </div>
//                   </div>

//                   {/* Pulse Animation */}
//                   {request.urgency === "CRITICAL" && (
//                     <motion.div
//                       animate={{ opacity: [0.5, 1, 0.5] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                       className="h-1 bg-gradient-to-r from-[#C62828] to-[#B71C1C]"
//                     />
//                   )}
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>

//           {/* View All Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="text-center mt-12"
//           >
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 10px 30px rgba(13, 71, 161, 0.3)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="btn bg-[#0D47A1] hover:bg-[#08306B] text-white border-none px-10 py-4 rounded-full text-lg shadow-xl inline-flex items-center gap-3 group"
//             >
//               View All Requests
//               <ArrowRight
//                 size={20}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </motion.button>
//           </motion.div>

//           {/* Stats Bar */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.5 }}
//             className="mt-16 bg-white rounded-2xl shadow-xl p-8"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
//               <div>
//                 <div className="text-4xl font-bold text-[#C62828] mb-2">24</div>
//                 <div className="text-[#616161]">Active Requests</div>
//               </div>
//               <div className="md:border-l border-[#E0E0E0]">
//                 <div className="text-4xl font-bold text-[#D84315] mb-2">8</div>
//                 <div className="text-[#616161]">Critical Cases</div>
//               </div>
//               <div className="md:border-l border-[#E0E0E0]">
//                 <div className="text-4xl font-bold text-[#2E7D32] mb-2">
//                   156
//                 </div>
//                 <div className="text-[#616161]">Lives Saved Today</div>
//               </div>
//               <div className="md:border-l border-[#E0E0E0]">
//                 <div className="text-4xl font-bold text-[#0D47A1] mb-2">
//                   3.2m
//                 </div>
//                 <div className="text-[#616161]">Avg Response Time</div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Feature;
