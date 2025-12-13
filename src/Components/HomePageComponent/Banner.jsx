// import React from "react";
// import { Droplets, Search, Heart, Users, Activity } from "lucide-react";
// import { motion } from "framer-motion";

// const Banner = () => {
//   return (
//     <div>
//       <div className="relative overflow-hidden bg-gradient-to-br from-[#FFEBEE] via-white to-[#E3F2FD] min-h-[600px] flex items-center">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.1, 0.15, 0.1],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="absolute -top-20 -right-20 w-96 h-96 bg-[#C62828] rounded-full blur-3xl"
//           />
//           <motion.div
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.08, 0.12, 0.08],
//             }}
//             transition={{
//               duration: 10,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: 1,
//             }}
//             className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-[#0D47A1] rounded-full blur-3xl"
//           />

//           {/* Floating Blood Drops */}
//           {[...Array(6)].map((_, i) => (
//             <motion.div
//               key={i}
//               animate={{
//                 y: [0, -30, 0],
//                 opacity: [0.2, 0.4, 0.2],
//               }}
//               transition={{
//                 duration: 4 + i,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: i * 0.7,
//               }}
//               className="absolute"
//               style={{
//                 left: `${15 + i * 15}%`,
//                 top: `${20 + i * 10}%`,
//               }}
//             >
//               <Droplets
//                 className="text-[#C62828] opacity-20"
//                 size={24 + i * 4}
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="container mx-auto px-6 lg:px-12 relative z-10">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               {/* Badge */}
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-[#E0E0E0]"
//               >
//                 <Heart className="text-[#C62828] fill-[#C62828]" size={18} />
//                 <span className="text-sm font-semibold text-[#212121]">
//                   Saving Lives Together
//                 </span>
//               </motion.div>

//               {/* Main Heading */}
//               <div className="space-y-4">
//                 <motion.h1
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
//                 >
//                   <span className="text-[#212121]">Every </span>
//                   <span className="text-[#C62828] relative inline-block">
//                     Drop
//                     <motion.div
//                       animate={{
//                         scaleX: [0, 1],
//                       }}
//                       transition={{
//                         delay: 1,
//                         duration: 0.6,
//                       }}
//                       className="absolute bottom-2 left-0 right-0 h-3 bg-[#FFEBEE] -z-10"
//                     />
//                   </span>
//                   <br />
//                   <span className="text-[#0D47A1]">Counts</span>
//                 </motion.h1>

//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="text-lg lg:text-xl text-[#616161] max-w-xl leading-relaxed"
//                 >
//                   Join our community of heroes. Whether you're ready to donate
//                   or searching for a lifesaver, VitalFlow connects compassion
//                   with need.
//                 </motion.p>
//               </div>

//               {/* CTA Buttons */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//                 className="flex flex-wrap gap-4"
//               >
//                 <motion.button
//                   whileHover={{
//                     scale: 1.05,
//                     boxShadow: "0 20px 40px rgba(198, 40, 40, 0.3)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 //   onClick={onJoinClick}
//                   className="btn bg-[#C62828] hover:bg-[#B71C1C] text-white border-none px-8 py-4 text-lg rounded-full shadow-xl flex items-center gap-3 group"
//                 >
//                   <Droplets size={24} className="group-hover:animate-bounce" />
//                   Join as a Donor
//                 </motion.button>

//                 <motion.button
//                   whileHover={{
//                     scale: 1.05,
//                     boxShadow: "0 20px 40px rgba(13, 71, 161, 0.3)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 //   onClick={onSearchClick}
//                   className="btn bg-[#0D47A1] hover:bg-[#08306B] text-white border-none px-8 py-4 text-lg rounded-full shadow-xl flex items-center gap-3 group"
//                 >
//                   <Search
//                     size={24}
//                     className="group-hover:rotate-12 transition-transform"
//                   />
//                   Search Donors
//                 </motion.button>
//               </motion.div>

//               {/* Stats */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.9 }}
//                 className="grid grid-cols-3 gap-6 pt-8"
//               >
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-[#C62828]">15K+</div>
//                   <div className="text-sm text-[#616161]">Active Donors</div>
//                 </div>
//                 <div className="text-center border-x border-[#E0E0E0]">
//                   <div className="text-3xl font-bold text-[#0D47A1]">3K+</div>
//                   <div className="text-sm text-[#616161]">Lives Saved</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-3xl font-bold text-[#2E7D32]">50+</div>
//                   <div className="text-sm text-[#616161]">Cities</div>
//                 </div>
//               </motion.div>
//             </motion.div>

//             {/* Right Visual */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="relative hidden lg:block"
//             >
//               <div className="relative">
//                 {/* Main Card */}
//                 <motion.div
//                   animate={{
//                     y: [0, -20, 0],
//                   }}
//                   transition={{
//                     duration: 6,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                   }}
//                   className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 relative z-10"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="w-16 h-16 bg-gradient-to-br from-[#C62828] to-[#B71C1C] rounded-2xl flex items-center justify-center">
//                       <Activity className="text-white" size={32} />
//                     </div>
//                     <div>
//                       <div className="text-2xl font-bold text-[#212121]">
//                         Blood Drive
//                       </div>
//                       <div className="text-[#616161]">Save lives today</div>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     {["A+", "B+", "O+", "AB+"].map((type, i) => (
//                       <motion.div
//                         key={type}
//                         initial={{ width: 0 }}
//                         animate={{ width: "100%" }}
//                         transition={{ delay: 1 + i * 0.2, duration: 0.6 }}
//                         className="flex items-center gap-3"
//                       >
//                         <div className="text-lg font-semibold text-[#C62828] w-12">
//                           {type}
//                         </div>
//                         <div className="flex-1 bg-[#FFEBEE] h-3 rounded-full overflow-hidden">
//                           <motion.div
//                             initial={{ width: 0 }}
//                             animate={{ width: `${70 + i * 8}%` }}
//                             transition={{
//                               delay: 1.3 + i * 0.2,
//                               duration: 0.8,
//                             }}
//                             className="h-full bg-gradient-to-r from-[#C62828] to-[#EF5350] rounded-full"
//                           />
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>

//                   <div className="flex items-center gap-2 pt-4 border-t border-[#E0E0E0]">
//                     <Users className="text-[#0D47A1]" size={20} />
//                     <span className="text-[#616161]">
//                       124 donors available nearby
//                     </span>
//                   </div>
//                 </motion.div>

//                 {/* Floating Badge */}
//                 <motion.div
//                   animate={{
//                     y: [0, -15, 0],
//                     rotate: [0, 5, 0],
//                   }}
//                   transition={{
//                     duration: 5,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: 1,
//                   }}
//                   className="absolute -right-6 top-12 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] text-white px-6 py-4 rounded-2xl shadow-xl"
//                 >
//                   <div className="text-3xl font-bold">24/7</div>
//                   <div className="text-sm opacity-90">Available</div>
//                 </motion.div>

//                 {/* Decorative Elements */}
//                 <motion.div
//                   animate={{
//                     rotate: [0, 360],
//                   }}
//                   transition={{
//                     duration: 20,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   className="absolute -left-12 bottom-12 w-24 h-24 border-4 border-[#C62828] border-dashed rounded-full opacity-30"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Bottom Wave */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 120" className="w-full h-auto">
//             <path
//               fill="white"
//               fillOpacity="0.3"
//               d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
//             />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
