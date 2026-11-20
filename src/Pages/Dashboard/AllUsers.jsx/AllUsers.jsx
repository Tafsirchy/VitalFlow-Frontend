import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  MoreVertical,
  ShieldCheck,
  UserCheck,
  Ban,
  CheckCircle,
  Crown,
  Heart,
  Search,
  Filter,
  Users,
  ShieldAlert,
} from "lucide-react";
import { toast } from "react-toastify";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    axiosSecure.get("/donor").then((res) => {
      setUsers(res.data || []);
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
        toast.success(`User status updated to ${status}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
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
        toast.success(`User role updated to ${role}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user role");
    }
  };

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

  const getRoleConfig = (role) => {
    const configs = {
      Admin: {
        icon: <Crown size={15} />,
        label: "Administrator",
        border: "border-amber-500/30",
        bg: "bg-amber-500/10",
        text: "text-amber-600",
      },
      Volunteer: {
        icon: <UserCheck size={15} />,
        label: "Volunteer Coordinator",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        text: "text-blue-600",
      },
      Donor: {
        icon: <Heart size={15} />,
        label: "Volunteer Donor",
        border: "border-red-500/30",
        bg: "bg-red-500/10",
        text: "text-red-600",
      },
    };
    return configs[role] || configs.Donor;
  };

  const stats = [
    {
      label: "Total Registered Members",
      value: users.length,
      icon: Users,
      color: "text-red-600",
      bg: "bg-red-500/10",
    },
    {
      label: "System Administrators",
      value: users.filter((u) => u.role === "Admin").length,
      icon: Crown,
      color: "text-amber-600",
      bg: "bg-amber-500/10",
    },
    {
      label: "Active Volunteers",
      value: users.filter((u) => u.role === "Volunteer").length,
      icon: UserCheck,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      label: "Volunteer Donors",
      value: users.filter((u) => !u.role || u.role === "Donor").length,
      icon: Heart,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="py-3 sm:py-5 lg:py-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        {/* Symmetrical Header */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md shadow-red-500/20 mb-3">
            <Users size={24} />
          </div>
          <span className="section-eyebrow block">USER GOVERNANCE & ACCESS</span>
          <h1 className="section-title">Community Members Directory</h1>
          <p className="section-subtitle">
            Manage member accounts, assign volunteer and administrative permissions, and safeguard community standards.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--background-card)] rounded-xl p-3.5 border border-[var(--border-light)] shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {stat.label}
                </span>
                <div className={`p-1.5 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon size={14} />
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] p-3.5 sm:p-4 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search member by full name or email address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl text-xs sm:text-sm font-medium text-[var(--text-primary)] focus:border-red-500 focus:ring-2 focus:ring-red-500/10 outline-none transition-all placeholder:text-[var(--text-muted)]"
              />
            </div>

            <div className="md:col-span-4 relative">
              <Filter
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500"
                size={15}
              />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full pl-10 pr-6 py-2.5 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] cursor-pointer outline-none focus:border-blue-500 transition-all"
              >
                <option value="All">All Member Roles</option>
                <option value="Admin">Administrators</option>
                <option value="Volunteer">Volunteer Coordinators</option>
                <option value="Donor">Volunteer Donors</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Table */}
        <div className="bg-[var(--background-card)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--background-main)] border-b border-[var(--border-light)] text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  <th className="py-2.5 px-3.5">Member Details</th>
                  <th className="py-2.5 px-3.5">Account Status</th>
                  <th className="py-2.5 px-3.5">Role Classification</th>
                  <th className="py-2.5 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-light)] text-xs sm:text-sm">
                {filteredUsers.map((u) => {
                  const roleConfig = getRoleConfig(u.role || "Donor");
                  const isActive = (u.status || "Active") === "Active";

                  return (
                    <tr
                      key={u.email}
                      className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-2.5 px-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.mainPhotoUrl || "/default-avatar.png"}
                            alt={u.name}
                            className="w-9 h-9 rounded-lg object-cover border border-[var(--border-light)] shadow-sm"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120";
                            }}
                          />
                          <div>
                            <div className="font-bold text-[var(--text-primary)] text-xs sm:text-sm">
                              {u.name}
                            </div>
                            <div className="text-[11px] text-[var(--text-muted)]">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                          />
                          {u.status || "Active"}
                        </span>
                      </td>

                      <td className="py-2.5 px-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${roleConfig.bg} ${roleConfig.border} ${roleConfig.text}`}
                        >
                          {roleConfig.icon}
                          {roleConfig.label}
                        </span>
                      </td>

                      <td className="py-2.5 px-3.5 text-right relative">
                        <div className="inline-block text-left">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdown(
                                openDropdown === u.email ? null : u.email
                              )
                            }
                            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {openDropdown === u.email && (
                            <>
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setOpenDropdown(null)}
                              />
                              <div className="absolute right-0 mt-1 w-52 bg-[var(--background-card)] rounded-2xl shadow-xl border border-[var(--border-light)] py-2 z-40 text-left text-xs font-medium">
                                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-light)] mb-1">
                                  Role Assignment
                                </div>

                                {[
                                  { label: "Volunteer Donor", role: "Donor", icon: Heart },
                                  { label: "Volunteer Coordinator", role: "Volunteer", icon: UserCheck },
                                  { label: "Administrator", role: "Admin", icon: Crown },
                                ].map(
                                  (opt) =>
                                    u.role !== opt.role && (
                                      <button
                                        key={opt.role}
                                        onClick={() => {
                                          handleRoleChange(u.email, opt.role);
                                          setOpenDropdown(null);
                                        }}
                                        className="w-full px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2.5 text-[var(--text-secondary)]"
                                      >
                                        <opt.icon size={14} />
                                        Make {opt.label}
                                      </button>
                                    )
                                )}

                                <div className="my-1 border-t border-[var(--border-light)]" />

                                <button
                                  onClick={() => {
                                    handleStatusChange(
                                      u.email,
                                      isActive ? "Blocked" : "Active"
                                    );
                                    setOpenDropdown(null);
                                  }}
                                  className={`w-full px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2.5 ${
                                    isActive ? "text-rose-600" : "text-emerald-600"
                                  }`}
                                >
                                  {isActive ? (
                                    <>
                                      <Ban size={14} />
                                      Suspend Account
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle size={14} />
                                      Activate Account
                                    </>
                                  )}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-10 text-center">
              <ShieldAlert
                size={36}
                className="text-[var(--text-muted)] mx-auto mb-2"
              />
              <p className="text-sm font-bold text-[var(--text-primary)]">
                No matching members found
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Try searching with a different name, email, or role filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
