import axios from "axios";
import {
  Search,
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  User,
  Mail,
  Heart,
  Activity,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  RotateCcw,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";

const SearchPage = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("donors"); // "donors" | "requests"
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [hasFiltered, setHasFiltered] = useState(false);

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  // Load districts and upazilas
  useEffect(() => {
    axios.get("/districts.json").then((res) => {
      const sorted = [...res.data.districts].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      setDistricts(sorted);
    });

    axios.get("/upazilas.json").then((res) => {
      const sorted = [...res.data.upazilas].sort((a, b) =>
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
      );
      setUpazilas(sorted);
      setFilteredUpazilas(sorted);
    });
  }, []);

  // Filter upazilas when district changes
  useEffect(() => {
    if (!district) {
      setFilteredUpazilas(upazilas);
      return;
    }

    const selectedDistrictObj = districts.find(
      (d) => d.name.toLowerCase() === district.toLowerCase()
    );

    if (selectedDistrictObj && selectedDistrictObj.id) {
      const matched = upazilas.filter(
        (u) => u.district_id === selectedDistrictObj.id
      );
      setFilteredUpazilas(matched.length > 0 ? matched : upazilas);
    } else {
      setFilteredUpazilas(upazilas);
    }
  }, [district, districts, upazilas]);

  // Initial load: By default, fetch all donors and requests
  const fetchInitialData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [donorsRes, requestsRes] = await Promise.all([
        axiosInstance.get("/search-donors"),
        axiosInstance.get("/search-requests"),
      ]);

      setDonors(donorsRes.data || []);
      setRequests(requestsRes.data || []);
    } catch (err) {
      console.error("Failed to load initial directory data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [axiosInstance]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Handle Search Submission
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    setHasFiltered(true);

    try {
      const encodedBlood = bloodGroup ? encodeURIComponent(bloodGroup) : "";
      const queryParams = `bloodGroup=${encodedBlood}&district=${encodeURIComponent(
        district
      )}&upazila=${encodeURIComponent(upazila)}`;

      const [donorsRes, requestsRes] = await Promise.all([
        axiosInstance.get(`/search-donors?${queryParams}`),
        axiosInstance.get(`/search-requests?${queryParams}`),
      ]);

      setDonors(donorsRes.data || []);
      setRequests(requestsRes.data || []);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Reset Search Filters
  const handleReset = async () => {
    setBloodGroup("");
    setDistrict("");
    setUpazila("");
    setHasFiltered(false);
    await fetchInitialData();
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      inprogress:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      completed:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      done:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      pending:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      canceled:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
          statusStyles[status] || "bg-zinc-100 text-zinc-700 border-zinc-200"
        }`}
      >
        {status === "inprogress"
          ? "In Progress"
          : status === "done"
          ? "Completed"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-[var(--background-main)] min-h-screen text-[var(--text-primary)]">
      <main className="py-8 sm:py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Symmetrical Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <span className="section-eyebrow block">NATIONAL LIFELINE DIRECTORY</span>
            <h1 className="section-title">
              Find Verified Donors & <br />
              <span className="text-gradient-crimson italic">Emergency Blood Requests</span>
            </h1>
            <p className="section-subtitle">
              Browse verified voluntary blood donors and open transfusion requests across all 64 districts in Bangladesh. Filter instantly by blood group and locality.
            </p>
          </div>

          {/* Search Filter Box */}
          <form
            onSubmit={handleSearch}
            className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm mb-6 transition-all"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end">
              {/* Blood Group */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <Droplet size={13} className="text-[var(--primary-red)]" />
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] focus:ring-2 focus:ring-red-500/10 transition-all cursor-pointer"
                >
                  <option value="">All Blood Groups</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        Blood Group {group}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <MapPin size={13} className="text-[var(--primary-red)]" />
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila("");
                  }}
                  className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] focus:ring-2 focus:ring-red-500/10 transition-all cursor-pointer"
                >
                  <option value="">All Districts</option>
                  {districts.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
                  <MapPin size={13} className="text-[var(--primary-red)]" />
                  Upazila / Area
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full h-11 bg-[var(--background-main)] border border-[var(--border-light)] rounded-xl px-3 text-sm font-semibold text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-red)] focus:ring-2 focus:ring-red-500/10 transition-all cursor-pointer"
                >
                  <option value="">All Upazilas</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id || u.name} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search & Reset CTAs */}
              <div className="flex items-center gap-2.5">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs uppercase tracking-wider font-bold shadow-md shadow-red-600/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-smooth"
                >
                  {isSearching ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Filtering...</span>
                    </>
                  ) : (
                    <>
                      <Search size={15} />
                      <span>Search Donors</span>
                    </>
                  )}
                </button>

                {hasFiltered && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="h-11 px-3.5 rounded-xl border border-[var(--border-light)] bg-[var(--background-main)] hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-secondary)] transition-smooth"
                    title="Reset all filters"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Directory Tabs: Donors (Default) & Blood Requests */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-6 border-b border-[var(--border-light)]">
            <div className="flex items-center gap-2 p-1 bg-[var(--background-card)] border border-[var(--border-light)] rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("donors")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "donors"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Users size={14} />
                <span>Volunteer Donors</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === "donors"
                      ? "bg-white/20 text-white"
                      : "bg-[var(--background-main)] text-[var(--text-muted)]"
                  }`}
                >
                  {donors.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("requests")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "requests"
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Droplet size={14} />
                <span>Emergency Requests</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    activeTab === "requests"
                      ? "bg-white/20 text-white"
                      : "bg-[var(--background-main)] text-[var(--text-muted)]"
                  }`}
                >
                  {requests.length}
                </span>
              </button>
            </div>

            <div className="text-xs text-[var(--text-muted)] font-medium">
              {hasFiltered ? (
                <span>
                  Filtered for{" "}
                  <strong className="text-[var(--text-primary)]">
                    {bloodGroup || "all blood"}
                  </strong>{" "}
                  in{" "}
                  <strong className="text-[var(--text-primary)]">
                    {district || "all districts"}
                  </strong>
                </span>
              ) : (
                <span>Showing all verified records by default</span>
              )}
            </div>
          </div>

          {/* Tab 1: Donors Grid (Default Visible on Load) */}
          {activeTab === "donors" && (
            <div>
              {isLoading ? (
                <div className="text-center py-16">
                  <div className="w-10 h-10 rounded-full border-3 border-red-500/20 border-t-red-600 animate-spin mx-auto mb-3" />
                  <p className="text-xs font-semibold text-[var(--text-secondary)]">
                    Loading verified volunteer donors...
                  </p>
                </div>
              ) : donors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {donors.map((donor) => {
                    const blood = donor.blood || donor.bloodGroup || "O+";
                    return (
                      <div
                        key={donor._id || donor.email}
                        className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 hover:border-red-500/40 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group"
                      >
                        <div>
                          {/* Top: Avatar & Blood Badge */}
                          <div className="flex items-start justify-between gap-3 mb-3.5">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <img
                                  src={donor.mainPhotoUrl || "/default-avatar.png"}
                                  alt={donor.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-[var(--border-light)] shadow-sm"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120";
                                  }}
                                />
                                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[var(--background-card)] rounded-full" />
                              </div>

                              <div>
                                <h3 className="font-bold text-sm sm:text-base text-[var(--text-primary)] group-hover:text-red-600 transition-colors">
                                  {donor.name}
                                </h3>
                                <span className="text-xs text-[var(--text-muted)] font-medium">
                                  {donor.role === "Volunteer"
                                    ? "Volunteer Coordinator"
                                    : "Volunteer Blood Donor"}
                                </span>
                              </div>
                            </div>

                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-sm flex items-center justify-center shadow-md shadow-red-500/20 shrink-0">
                              {blood}
                            </div>
                          </div>

                          {/* Location & Status Card */}
                          <div className="space-y-1.5 p-3 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)] text-xs mb-3.5">
                            <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                              <MapPin size={13} className="text-red-600 shrink-0" />
                              <span className="font-semibold text-[var(--text-primary)]">
                                {donor.district || "Bangladesh"}
                                {donor.upazila ? `, ${donor.upazila}` : ""}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1.5 border-t border-[var(--border-light)] text-[11px]">
                              <span className="text-[var(--text-muted)] font-medium">Availability</span>
                              <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Ready to Donate
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Bottom CTA */}
                        <div className="pt-3 border-t border-[var(--border-light)] flex items-center justify-between gap-2.5">
                          <span className="text-xs text-[var(--text-muted)] font-medium truncate">
                            {donor.email}
                          </span>

                          <a
                            href={`mailto:${donor.email}?subject=Emergency%20Blood%20Donation%20Inquiry%20via%20VitalFlow&body=Hello%20${encodeURIComponent(
                              donor.name
                            )},%0A%0AWe%20found%20your%20verified%20donor%20profile%20on%20VitalFlow%20and%20are%20reaching%20out%20regarding%20a%20blood%20donation%20inquiry.`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-smooth shrink-0"
                          >
                            <Mail size={12} />
                            <span>Contact</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center mx-auto mb-4">
                    <Users size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                    No Donors Match Your Filter
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    No volunteer donors were found for blood group "{bloodGroup || "all"}" in "{district || "all districts"}". Try selecting a different blood group or reset filters to see all available donors.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-smooth"
                  >
                    <RotateCcw size={15} />
                    View All Donors
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Emergency Requests Grid */}
          {activeTab === "requests" && (
            <div>
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="w-10 h-10 rounded-full border-3 border-red-500/20 border-t-red-600 animate-spin mx-auto mb-3" />
                  <p className="text-xs font-semibold text-[var(--text-secondary)]">
                    Loading emergency transfusion requests...
                  </p>
                </div>
              ) : requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {requests.map((request) => (
                    <div
                      key={request._id}
                      className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-4 sm:p-5 hover:border-red-500/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Top */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white font-black text-base flex items-center justify-center shadow-md shadow-red-600/20 shrink-0">
                              {request.bloodGroup}
                            </div>
                            <div>
                              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-red-600 transition-colors leading-snug">
                                {request.recipient_name}
                              </h3>
                              <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium mt-0.5">
                                <Hospital size={12} className="text-red-600 shrink-0" />
                                <span className="truncate max-w-[170px]">
                                  {request.hospital || "Central Medical Facility"}
                                </span>
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(request.donation_status)}
                        </div>

                        {/* Location & Time */}
                        <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[var(--background-main)] border border-[var(--border-light)] text-xs mb-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                              Location
                            </span>
                            <span className="font-semibold text-[var(--text-primary)] truncate block">
                              {request.recipient_district}, {request.recipient_upazila}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-0.5">
                              Schedule
                            </span>
                            <span className="font-semibold text-[var(--text-primary)] truncate block">
                              {request.date} ({request.time})
                            </span>
                          </div>
                        </div>

                        {/* Message Quote */}
                        {request.message && (
                          <p className="text-xs text-[var(--text-secondary)] italic bg-[var(--background-main)]/60 p-2.5 rounded-xl border border-[var(--border-light)]/60 mb-3 line-clamp-2">
                            "{request.message}"
                          </p>
                        )}
                      </div>

                      {/* Footer & CTA */}
                      <div className="pt-3 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
                        <div className="text-xs text-[var(--text-muted)]">
                          Requested by{" "}
                          <span className="font-bold text-[var(--text-primary)]">
                            {request.requester_name?.split(" ")[0]}
                          </span>
                        </div>
                        <button
                          onClick={() => navigate(`/donation-details/${request._id}`)}
                          className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 shrink-0"
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[var(--background-card)] border border-[var(--border-light)] rounded-2xl p-6 sm:p-8 text-center max-w-xl mx-auto shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center mx-auto mb-3">
                    <Droplet size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1.5">
                    No Blood Requests Found
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    No active emergency donation requests matched your selected filter.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-smooth"
                  >
                    <RotateCcw size={14} />
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
