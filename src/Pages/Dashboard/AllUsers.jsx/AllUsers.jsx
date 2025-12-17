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
} from "lucide-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

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
      console.error(error);
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
      console.error(error);
    }
  };

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

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: "var(--background-main)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1
            className="text-4xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Manage Users
          </h1>
          <p
            className="text-lg mt-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Control roles and access across VitalFlow
          </p>
        </motion.div>

        {/* Table Container */}
        <div
          className="overflow-hidden rounded-2xl shadow-2xl border"
          style={{ borderColor: "var(--border-light)" }}
        >
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead style={{ backgroundColor: "var(--background-card)" }}>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--border-light)" }}
                >
                  <th
                    className="text-left py-5 px-6 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    User
                  </th>
                  <th
                    className="text-left py-5 px-6 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Role
                  </th>
                  <th
                    className="text-left py-5 px-6 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-right py-5 px-6 font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users?.map((user, index) => (
                    <motion.tr
                      key={user.email}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b transition-all duration-300 hover:shadow-lg"
                      style={{
                        backgroundColor: "var(--background-card)",
                        borderColor: "var(--border-light)", // Fixed syntax error here
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      {/* User Info */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div
                              className="mask mask-squircle w-12 h-12 ring-2 ring-offset-2 ring-offset-transparent"
                              style={{ ringColor: "var(--primary-red)" }}
                            >
                              <img
                                src={
                                  user?.mainPhotoUrl || "/default-avatar.png"
                                }
                                alt={user?.name}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <div
                              className="font-bold"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {user?.name}
                            </div>
                            <div
                              className="text-sm opacity-70"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          {user?.role === "Admin" && (
                            <Crown size={16} style={{ color: "#FFD700" }} />
                          )}
                          {user?.role === "Volunteer" && (
                            <UserCheck
                              size={16}
                              style={{ color: "var(--secondary-blue)" }}
                            />
                          )}
                          <span
                            className="px-3 py-1.5 rounded-full text-xs font-bold capitalize"
                            style={{
                              backgroundColor:
                                user?.role === "Admin"
                                  ? "#FFD70020"
                                  : user?.role === "Volunteer"
                                  ? "var(--secondary-blue-light)"
                                  : "#F5F5F520",
                              color:
                                user?.role === "Admin"
                                  ? "#B8860B"
                                  : user?.role === "Volunteer"
                                  ? "var(--secondary-blue)"
                                  : "var(--text-muted)",
                            }}
                          >
                            {user?.role || "Donor"}
                          </span>
                        </div>
                      </td>

                      {/* Status Indicator */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{
                              scale:
                                user?.status === "Active" ? [1, 1.2, 1] : 1,
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <div
                              className="w-3 h-3 rounded-full shadow-lg"
                              style={{
                                backgroundColor:
                                  user?.status === "Active"
                                    ? "var(--success-green)"
                                    : "var(--primary-red)",
                                boxShadow:
                                  user?.status === "Active"
                                    ? "0 0 12px var(--success-green)"
                                    : "0 0 12px var(--primary-red)",
                              }}
                            />
                          </motion.div>
                          <span
                            className="font-semibold"
                            style={{
                              color:
                                user?.status === "Active"
                                  ? "var(--success-green)"
                                  : "var(--primary-red)",
                            }}
                          >
                            {user?.status || "Active"}
                          </span>
                        </div>
                      </td>

                      {/* Actions Dropdown */}
                      <td className="py-5 px-6 text-right relative">
                        <div
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
                        </div>

                        <AnimatePresence>
                          {openDropdown === user.email && (
                            <motion.ul
                              variants={menuVariants}
                              initial="closed"
                              animate="open"
                              exit="closed"
                              className="absolute right-0 mt-2 p-3 shadow-2xl rounded-xl w-64 border backdrop-blur-md z-50"
                              style={{
                                backgroundColor: "var(--background-card)",
                                borderColor: "var(--border-light)",
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Change Role Section */}
                              <motion.li
                                variants={itemVariants}
                                className="text-xs opacity-70 mb-1 px-3"
                              >
                                <span>Change Role</span>
                              </motion.li>

                              {user?.role !== "Donor" && (
                                <motion.li variants={itemVariants}>
                                  <button
                                    onClick={() => {
                                      handleRoleChange(user?.email, "Donor");
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 hover:bg-gray-100 rounded-lg w-full text-left py-2 px-3 transition-colors"
                                  >
                                    <UserCog
                                      size={16}
                                      style={{ color: "var(--text-muted)" }}
                                    />
                                    <span>Make Donor</span>
                                  </button>
                                </motion.li>
                              )}

                              {user?.role !== "Volunteer" && (
                                <motion.li variants={itemVariants}>
                                  <button
                                    onClick={() => {
                                      handleRoleChange(
                                        user?.email,
                                        "Volunteer"
                                      );
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 hover:bg-blue-50 rounded-lg w-full text-left py-2 px-3 transition-colors"
                                  >
                                    <UserCheck
                                      size={16}
                                      style={{ color: "var(--secondary-blue)" }}
                                    />
                                    <span>Make Volunteer</span>
                                  </button>
                                </motion.li>
                              )}

                              {user?.role !== "Admin" && (
                                <motion.li variants={itemVariants}>
                                  <button
                                    onClick={() => {
                                      handleRoleChange(user?.email, "Admin");
                                      setOpenDropdown(null);
                                    }}
                                    className="flex items-center gap-3 hover:bg-red-50 rounded-lg w-full text-left py-2 px-3 font-semibold transition-colors"
                                    style={{ color: "var(--primary-red)" }}
                                  >
                                    <ShieldCheck size={16} />
                                    <span>Make Admin</span>
                                  </button>
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
                                    className="text-xs opacity-70 mb-1 px-3"
                                  >
                                    <span>Account Status</span>
                                  </motion.li>
                                  <motion.li variants={itemVariants}>
                                    {user?.status === "Active" ? (
                                      <button
                                        onClick={() => {
                                          handleStatusChange(
                                            user?.email,
                                            "Blocked"
                                          );
                                          setOpenDropdown(null);
                                        }}
                                        className="flex items-center gap-3 text-error hover:bg-red-50 rounded-lg w-full text-left py-2 px-3 transition-colors"
                                      >
                                        <Ban size={16} />
                                        <span>Block User</span>
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          handleStatusChange(
                                            user?.email,
                                            "Active"
                                          );
                                          setOpenDropdown(null);
                                        }}
                                        className="flex items-center gap-3 hover:bg-green-50 rounded-lg w-full text-left py-2 px-3 transition-colors"
                                        style={{
                                          color: "var(--success-green)",
                                        }}
                                      >
                                        <CheckCircle size={16} />
                                        <span>Activate User</span>
                                      </button>
                                    )}
                                  </motion.li>
                                </>
                              )}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
