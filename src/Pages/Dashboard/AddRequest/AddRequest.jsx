import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxios from "../../../Hooks/useAxios";

const AddRequest = () => {
  const { user } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const axiosInstance = useAxios();

  useEffect(() => {
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const requester_name = form.requesterName.value;
    const requester_email = form.requesterEmail.value;
    const recipient_name = form.recipientName.value;
    const recipient_district = form.district.value;
    const recipient_upazila = form.upazila.value;
    const address = form.address.value;
    const bloodGroup = form.bloodGroup.value;
    const hospital = form.hospital.value;
    const message = form.message.value;

    const reqFormData = {
      requester_name,
      requester_email,
      recipient_name,
      recipient_district,
      recipient_upazila,
      address,
      bloodGroup,
      hospital,
      message,
      donation_status: "pending",
    }

    axiosInstance.post("/requests", reqFormData)
    .then((res) => {
      alert(res.data.insertedId)
    })
    .catch((err) => console.log(err))

  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        Create Donation Request
      </h2>

      {/* ✅ onSubmit added */}
      <form
        onSubmit={handleRequest}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Requester Name */}
        <div>
          <label className="label font-semibold">Requester Name</label>
          <input
            name="requesterName"
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label font-semibold">Requester Email</label>
          <input
            name="requesterEmail"
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label font-semibold">Recipient Name</label>
          <input
            name="recipientName"
            type="text"
            placeholder="Recipient full name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label font-semibold">Blood Group</label>
          <select
            name="bloodGroup"
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label font-semibold">Recipient District</label>
          <select
            name="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label font-semibold">Recipient Upazila</label>
          <select
            name="upazila"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.name} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital */}
        <div className="md:col-span-2">
          <label className="label font-semibold">Hospital Name</label>
          <input
            name="hospital"
            type="text"
            className="input input-bordered w-full"
            placeholder="Dhaka Medical College Hospital"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="label font-semibold">Full Address</label>
          <input
            name="address"
            type="text"
            className="input input-bordered w-full"
            placeholder="Zahir Raihan Rd, Dhaka"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="label font-semibold">Donation Date</label>
          <input
            name="date"
            type="date"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Time */}
        <div>
          <label className="label font-semibold">Donation Time</label>
          <input
            name="time"
            type="time"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="label font-semibold">Request Message</label>
          <textarea
            name="message"
            rows="4"
            className="textarea textarea-bordered w-full"
            placeholder="Explain why blood is needed..."
            required
          ></textarea>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center mt-6">
          <button className="btn btn-error px-12 text-white text-lg">
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequest;
