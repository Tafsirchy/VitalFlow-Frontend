import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreVertical,
  UserCog,
  ShieldCheck,
  UserCheck,
  Ban,
  CheckCircle,
  Crown,
  Heart,
  Search,
  Filter,
  Sparkles,
  Users,
} from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    axiosSecure.get("/donor").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  const handleStatusChange = async (email, status) => {
    try {
      const res = await axiosSecure.patch("/update/donor/status", {
        email,
        status,
      });
      if (res.data.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, status } : u))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = async (email, role) => {
    try {
      const res = await axiosSecure.patch("/update/donor/role", {
        email,
        role,
      });
      if (res.data.modifiedCount > 0) {
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, role } : u))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Filter users based on search and role filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      filterRole === "All" ||
      user?.role === filterRole ||
      (!user?.role && filterRole === "Donor");
    return matchesSearch && matchesRole;
  });

  // Dropdown animation variants
  const menuVariants = {
    closed: {
      scale: 0.85,
      y: -10,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
    open: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const getRoleConfig = (role) => {
    const configs = {
      Admin: {
        icon: <Crown size={16} className="text-yellow-500" />,
        bgColor: "#FEF3C7",
        textColor: "#92400E",
        iconColor: "#F59E0B",
      },
      Volunteer: {
        icon: (
          <UserCheck size={16} style={{ color: "var(--secondary-blue)" }} />
        ),
        bgColor: "#DBEAFE",
        textColor: "#1E40AF",
        iconColor: "var(--secondary-blue)",
      },
      Donor: {
        icon: <Heart size={16} className="text-red-500" />,
        bgColor: "#FEE2E2",
        textColor: "#991B1B",
        iconColor: "#EF4444",
      },
    };
    return configs[role] || configs.Donor;
  };

  return (
    <div
      className="p-4 md:p-6 min-h-screen"
      style={{ backgroundColor: "var(--background-main)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 text-center relative"
        >
          {/* Floating sparkles animation */}
          <motion.div
            className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [-5, 5, -5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles
              size={24}
              style={{ color: "var(--primary-red)" }}
              className="opacity-70"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <Users
                  size={40}
                  style={{ color: "var(--primary-red)" }}
                  strokeWidth={2.5}
                />
              </motion.div>
              <h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                User Management
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              Empower your community • Manage roles • Build the future of
              VitalFlow
            </motion.p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="mt-4 h-1 mx-auto rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--primary-red), transparent)",
              width: "200px",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          {/* Search Input */}
          <motion.div
            className="relative flex-1"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2"
                style={{ color: "var(--text-muted)" }}
              />
            </motion.div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "var(--background-card)",
                borderColor: "var(--border-light)",
                color: "var(--text-primary)",
              }}
            />
          </motion.div>

          {/* Role Filter */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Filter
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--text-muted)" }}
            />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 appearance-none cursor-pointer min-w-[180px]"
              style={{
                backgroundColor: "var(--background-card)",
                borderColor: "var(--border-light)",
                color: "var(--text-primary)",
              }}
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Donor">Donor</option>
            </select>
          </motion.div>
        </motion.div>

        {/* Animated Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          {[
            {
              label: "Total Users",
              value: users.length,
              color: "#6366F1",
              icon: Users,
            },
            {
              label: "Admins",
              value: users.filter((u) => u.role === "Admin").length,
              color: "#F59E0B",
              icon: Crown,
            },
            {
              label: "Volunteers",
              value: users.filter((u) => u.role === "Volunteer").length,
              color: "#3B82F6",
              icon: UserCheck,
            },
            {
              label: "Donors",
              value: users.filter((u) => !u.role || u.role === "Donor").length,
              color: "#EF4444",
              icon: Heart,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="p-5 rounded-xl border-2 cursor-pointer"
              style={{
                backgroundColor: "var(--background-card)",
                borderColor: "var(--border-light)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </p>
                  <motion.p
                    className="text-3xl font-bold"
                    style={{ color: stat.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <stat.icon size={24} style={{ color: stat.color }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="overflow-hidden rounded-2xl shadow-2xl border-2"
          style={{ borderColor: "var(--border-light)" }}
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead style={{ backgroundColor: "var(--background-card)" }}>
                <motion.tr
                  className="border-b-2"
                  style={{ borderColor: "var(--border-light)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <th
                    className="text-left py-4 px-6 font-bold text-sm uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    User Information
                  </th>
                  <th
                    className="text-left py-4 px-6 font-bold text-sm uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Role
                  </th>
                  <th
                    className="text-left py-4 px-6 font-bold text-sm uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-right py-4 px-6 font-bold text-sm uppercase tracking-wider"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Actions
                  </th>
                </motion.tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filteredUsers?.map((user, index) => {
                    const roleConfig = getRoleConfig(user?.role || "Donor");
                    return (
                      <motion.tr
                        key={user.email}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, height: 0 }}
                        transition={{
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 80,
                        }}
                        className="border-b transition-all duration-300 group"
                        style={{
                          backgroundColor: "var(--background-card)",
                          borderColor: "var(--border-light)",
                        }}
                        whileHover={{
                          backgroundColor: "rgba(239, 68, 68, 0.03)",
                          transition: { duration: 0.2 },
                        }}
                      >
                        {/* User Info */}
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <motion.div
                              className="relative"
                              whileHover={{ scale: 1.15 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div
                                className="mask mask-squircle w-14 h-14 ring-2 ring-offset-2 ring-offset-transparent"
                                style={{ ringColor: roleConfig.iconColor }}
                              >
                                <img
                                  src={
                                    user?.mainPhotoUrl || "/default-avatar.png"
                                  }
                                  alt={user?.name}
                                  className="object-cover"
                                />
                              </div>
                              <motion.div
                                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2"
                                style={{
                                  backgroundColor: roleConfig.bgColor,
                                  borderColor: "var(--background-card)",
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.7 + index * 0.05 }}
                                whileHover={{ scale: 1.3, rotate: 360 }}
                              >
                                {roleConfig.icon}
                              </motion.div>
                            </motion.div>
                            <div>
                              <div
                                className="font-bold text-base mb-1"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {user?.name}
                              </div>
                              <div
                                className="text-sm flex items-center gap-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {user?.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role Badge */}
                        <td className="py-5 px-6">
                          <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              {roleConfig.icon}
                            </motion.div>
                            <span
                              className="text-sm font-bold capitalize"
                              style={{ color: roleConfig.textColor }}
                            >
                              {user?.role || "Donor"}
                            </span>
                          </motion.div>
                        </td>

                        {/* Status Indicator */}
                        <td className="py-5 px-6">
                          <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2"
                            style={{
                              borderColor:
                                user?.status === "Active"
                                  ? "var(--success-green)"
                                  : "var(--primary-red)",
                              backgroundColor:
                                user?.status === "Active"
                                  ? "#10B98120"
                                  : "#EF444420",
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <motion.div
                              animate={{
                                scale:
                                  user?.status === "Active" ? [1, 1.4, 1] : 1,
                                opacity:
                                  user?.status === "Active" ? [1, 0.5, 1] : 1,
                              }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <div
                                className="w-2.5 h-2.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    user?.status === "Active"
                                      ? "var(--success-green)"
                                      : "var(--primary-red)",
                                }}
                              />
                            </motion.div>
                            <span
                              className="font-bold text-sm"
                              style={{
                                color:
                                  user?.status === "Active"
                                    ? "var(--success-green)"
                                    : "var(--primary-red)",
                              }}
                            >
                              {user?.status || "Active"}
                            </span>
                          </motion.div>
                        </td>

                        {/* Actions Dropdown */}
                        <td className="py-5 px-6 text-right relative">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(
                                openDropdown === user.email ? null : user.email
                              );
                            }}
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              setOpenDropdown(
                                openDropdown === user.email ? null : user.email
                              )
                            }
                            className="btn btn-ghost btn-circle hover:bg-red-50 transition-all inline-flex items-center justify-center"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            <MoreVertical size={20} />
                          </motion.div>

                          <AnimatePresence>
                            {openDropdown === user.email && (
                              <motion.ul
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="absolute right-0 mt-2 p-3 shadow-2xl rounded-xl w-64 border-2 backdrop-blur-md z-50"
                                style={{
                                  backgroundColor: "var(--background-card)",
                                  borderColor: "var(--border-light)",
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Change Role Section */}
                                <motion.li
                                  variants={itemVariants}
                                  className="text-xs font-bold uppercase tracking-wide mb-2 px-3"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  Change Role
                                </motion.li>

                                {user?.role !== "Donor" && (
                                  <motion.li variants={itemVariants}>
                                    <motion.button
                                      onClick={() => {
                                        handleRoleChange(user?.email, "Donor");
                                        setOpenDropdown(null);
                                      }}
                                      className="flex items-center gap-3 hover:bg-red-50 rounded-lg w-full text-left py-2.5 px-3 transition-all duration-200"
                                      whileHover={{ x: 5 }}
                                    >
                                      <Heart
                                        size={16}
                                        className="text-red-500"
                                      />
                                      <span className="font-medium">
                                        Make Donor
                                      </span>
                                    </motion.button>
                                  </motion.li>
                                )}

                                {user?.role !== "Volunteer" && (
                                  <motion.li variants={itemVariants}>
                                    <motion.button
                                      onClick={() => {
                                        handleRoleChange(
                                          user?.email,
                                          "Volunteer"
                                        );
                                        setOpenDropdown(null);
                                      }}
                                      className="flex items-center gap-3 hover:bg-blue-50 rounded-lg w-full text-left py-2.5 px-3 transition-all duration-200"
                                      whileHover={{ x: 5 }}
                                    >
                                      <UserCheck
                                        size={16}
                                        style={{
                                          color: "var(--secondary-blue)",
                                        }}
                                      />
                                      <span className="font-medium">
                                        Make Volunteer
                                      </span>
                                    </motion.button>
                                  </motion.li>
                                )}

                                {user?.role !== "Admin" && (
                                  <motion.li variants={itemVariants}>
                                    <motion.button
                                      onClick={() => {
                                        handleRoleChange(user?.email, "Admin");
                                        setOpenDropdown(null);
                                      }}
                                      className="flex items-center gap-3 hover:bg-yellow-50 rounded-lg w-full text-left py-2.5 px-3 font-semibold transition-all duration-200"
                                      style={{ color: "#F59E0B" }}
                                      whileHover={{ x: 5 }}
                                    >
                                      <Crown size={16} />
                                      <span>Make Admin</span>
                                    </motion.button>
                                  </motion.li>
                                )}

                                {/* Status Section - Hidden for Admins */}
                                {user?.role !== "Admin" && (
                                  <>
                                    <motion.div
                                      variants={itemVariants}
                                      className="divider my-2"
                                    ></motion.div>
                                    <motion.li
                                      variants={itemVariants}
                                      className="text-xs font-bold uppercase tracking-wide mb-2 px-3"
                                      style={{ color: "var(--text-muted)" }}
                                    >
                                      Account Status
                                    </motion.li>
                                    <motion.li variants={itemVariants}>
                                      {user?.status === "Active" ? (
                                        <motion.button
                                          onClick={() => {
                                            handleStatusChange(
                                              user?.email,
                                              "Blocked"
                                            );
                                            setOpenDropdown(null);
                                          }}
                                          className="flex items-center gap-3 text-error hover:bg-red-50 rounded-lg w-full text-left py-2.5 px-3 transition-all duration-200 font-medium"
                                          whileHover={{ x: 5 }}
                                        >
                                          <Ban size={16} />
                                          <span>Block User</span>
                                        </motion.button>
                                      ) : (
                                        <motion.button
                                          onClick={() => {
                                            handleStatusChange(
                                              user?.email,
                                              "Active"
                                            );
                                            setOpenDropdown(null);
                                          }}
                                          className="flex items-center gap-3 hover:bg-green-50 rounded-lg w-full text-left py-2.5 px-3 transition-all duration-200 font-medium"
                                          style={{
                                            color: "var(--success-green)",
                                          }}
                                          whileHover={{ x: 5 }}
                                        >
                                          <CheckCircle size={16} />
                                          <span>Activate User</span>
                                        </motion.button>
                                      )}
                                    </motion.li>
                                  </>
                                )}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Search
                  size={64}
                  style={{ color: "var(--text-muted)" }}
                  className="mx-auto mb-4 opacity-50"
                />
              </motion.div>
              <p
                className="text-lg font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                No users found matching your criteria
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Try adjusting your search or filter settings
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <motion.p
            className="text-sm inline-block px-4 py-2 rounded-full"
            style={{
              color: "var(--text-secondary)",
              backgroundColor: "var(--background-card)",
              border: "2px solid var(--border-light)",
            }}
            whileHover={{ scale: 1.05 }}
          >
            Showing{" "}
            <span
              className="font-bold text-lg"
              style={{ color: "var(--primary-red)" }}
            >
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span
              className="font-bold text-lg"
              style={{ color: "var(--primary-red)" }}
            >
              {users.length}
            </span>{" "}
            users
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default AllUsers;
