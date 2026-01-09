import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Heart, Award, TrendingUp, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "15,000+", label: "Active Donors" },
    { icon: Heart, value: "3,200+", label: "Lives Saved" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Shield, value: "24/7", label: "Support" },
  ];

  const team = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Founder & CEO",
      image: "https://i.pravatar.cc/300?img=45",
      bio: "Medical professional with 15+ years in healthcare",
    },
    {
      name: "Michael Chen",
      role: "Medical Director",
      image: "https://i.pravatar.cc/300?img=12",
      bio: "Specialist in blood transfusion medicine",
    },
    {
      name: "Priya Patel",
      role: "Community Manager",
      image: "https://i.pravatar.cc/300?img=32",
      bio: "Connecting donors with those in need",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-red-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400">
                VitalFlow
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connecting donors with those in need, saving lives one donation at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 border-2 border-red-200 dark:border-red-900"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                To create a seamless bridge between blood donors and recipients, ensuring that no life is lost due to lack of blood availability. We leverage technology to make blood donation accessible, efficient, and impactful.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-900"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                A world where every person in need of blood has immediate access to safe, compatible donors. We envision a community-driven ecosystem where saving lives is just a click away.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-blue-600 dark:from-red-500 dark:to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={28} />
                  </div>
                  <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 dark:from-red-400 dark:to-blue-400">
                Team
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dedicated professionals working tirelessly to save lives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 ring-4 ring-red-500 dark:ring-red-400 ring-offset-4 ring-offset-white dark:ring-offset-gray-800">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-red-600 dark:text-red-400 font-semibold text-center mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="w-11/12 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Why Choose VitalFlow?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Donors",
                description: "All donors are verified with proper documentation and health screening",
              },
              {
                title: "24/7 Availability",
                description: "Emergency support available round the clock for urgent requests",
              },
              {
                title: "Fast Matching",
                description: "Advanced algorithm matches donors with recipients in seconds",
              },
              {
                title: "Secure Platform",
                description: "Your data is protected with enterprise-grade security",
              },
              {
                title: "Community Driven",
                description: "Built by the community, for the community",
              },
              {
                title: "Free Service",
                description: "Completely free platform with no hidden charges",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
